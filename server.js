require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Session Setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'zoop_secret_default_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 Hours session
    secure: false // Set to true in HTTPS production
  }
}));

/* ==========================================
   MONGODB SCHEMA DEFINITIONS
   ========================================== */
const MenuItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  isVeg: { type: Boolean, default: true },
  image: { type: String, required: true }
});

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Guest' },
  rating: { type: Number, default: 5 },
  review: { type: String, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
});

const SelfieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 5 },
  likes: { type: Number, default: 0 },
  review: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
});

const GallerySchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true }
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
const Review = mongoose.model('Review', ReviewSchema);
const Selfie = mongoose.model('Selfie', SelfieSchema);
const GalleryItem = mongoose.model('GalleryItem', GallerySchema);

/* ==========================================
   DATABASE ACCESS LAYER (MONGO + JSON FALLBACK)
   ========================================== */
let isMongoConnected = false;

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Successfully connected to MongoDB Atlas.');
      isMongoConnected = true;
    })
    .catch(err => {
      console.warn('MongoDB Atlas connection failed. Falling back to local JSON database.', err.message);
      isMongoConnected = false;
    });
} else {
  console.log('MONGODB_URI not specified. Using local JSON database (data.json).');
  isMongoConnected = false;
}

// JSON Database helper
function readJSON() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return { menuItems: [], reviews: [], selfieWall: [], gallery: [] };
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (err) {
    return { menuItems: [], reviews: [], selfieWall: [], gallery: [] };
  }
}

function writeJSON(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

/* ==========================================
   MULTER IMAGE UPLOAD CONFIGURATION
   ========================================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only images (jpg, png, gif, webp) are allowed!'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB Limit
  fileFilter: fileFilter
});

/* ==========================================
   SECURITY AUTHENTICATION MIDDLEWARES
   ========================================== */
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.loggedIn) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden. Admin access required.' });
};

/* ==========================================
   ROUTING & PAGE PROTECTIONS
   ========================================== */

// Admin Redirects
app.get('/dashboard', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  if (!req.session || !req.session.loggedIn) {
    return res.redirect('/admin-login');
  }
  // Serve compiled dashboard in prod, Vite proxy handles dev
  res.sendFile(path.join(__dirname, 'dist', 'dashboard.html'));
});

app.get('/admin-login', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  if (req.session && req.session.loggedIn) {
    return res.redirect('/dashboard');
  }
  res.sendFile(path.join(__dirname, 'dist', 'admin-login.html'));
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

/* ==========================================
   API ENDPOINTS
   ========================================== */

// 1. Owner Auth Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const envUser = process.env.ADMIN_USERNAME || 'zoops';
  const envPass = process.env.ADMIN_PASSWORD || 'zoops@zoo';

  if (username === envUser && password === envPass) {
    req.session.loggedIn = true;
    req.session.adminUser = username;
    return res.json({ success: true, message: 'Logged in successfully' });
  }
  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

app.get('/api/auth/status', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  if (req.session && req.session.loggedIn) {
    return res.json({ loggedIn: true, user: req.session.adminUser });
  }
  res.json({ loggedIn: false });
});

// 2. Fetch Specials & Offers
app.get('/api/special', async (req, res) => {
  if (isMongoConnected) {
    // Mongo handles Today's Special / Offers using local config file fallback, or simple settings collection.
    // For simplicity, we can load Today's Special/Offers from data.json or simple keys.
    const db = readJSON();
    res.json({ todaySpecial: db.todaySpecial, specialOffers: db.specialOffers });
  } else {
    const db = readJSON();
    res.json({ todaySpecial: db.todaySpecial, specialOffers: db.specialOffers });
  }
});

// Update Specials & Offers (Protected)
app.post('/api/admin/special', requireAdmin, (req, res) => {
  const db = readJSON();
  db.todaySpecial = {
    name: req.body.name,
    price: parseFloat(req.body.price),
    image: req.body.image,
    description: req.body.description
  };
  writeJSON(db);
  res.json(db.todaySpecial);
});

app.post('/api/admin/special/offers', requireAdmin, (req, res) => {
  const db = readJSON();
  db.specialOffers = req.body;
  writeJSON(db);
  res.json(db.specialOffers);
});

// 3. Menu CRUD (Write Protected)
app.get('/api/menu', async (req, res) => {
  if (isMongoConnected) {
    const items = await MenuItem.find();
    res.json(items);
  } else {
    const db = readJSON();
    res.json(db.menuItems);
  }
});

app.post('/api/admin/menu', requireAdmin, async (req, res) => {
  const payload = {
    category: req.body.category,
    name: req.body.name,
    price: parseFloat(req.body.price),
    description: req.body.description,
    isVeg: req.body.isVeg !== undefined ? req.body.isVeg : true,
    image: req.body.image
  };

  if (isMongoConnected) {
    const item = new MenuItem(payload);
    await item.save();
    res.status(201).json(item);
  } else {
    const db = readJSON();
    const newItem = { id: 'item_' + Date.now(), ...payload };
    db.menuItems.push(newItem);
    writeJSON(db);
    res.status(201).json(newItem);
  }
});

app.put('/api/admin/menu/:id', requireAdmin, async (req, res) => {
  const payload = {
    category: req.body.category,
    name: req.body.name,
    price: parseFloat(req.body.price),
    description: req.body.description,
    isVeg: req.body.isVeg,
    image: req.body.image
  };

  if (isMongoConnected) {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, payload, { new: true });
    res.json(item);
  } else {
    const db = readJSON();
    const idx = db.menuItems.findIndex(item => item.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Item not found' });
    db.menuItems[idx] = { id: req.params.id, ...payload };
    writeJSON(db);
    res.json(db.menuItems[idx]);
  }
});

app.delete('/api/admin/menu/:id', requireAdmin, async (req, res) => {
  if (isMongoConnected) {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } else {
    const db = readJSON();
    db.menuItems = db.menuItems.filter(item => item.id !== req.params.id);
    writeJSON(db);
    res.json({ success: true });
  }
});

// 4. Food Gallery CRUD
app.get('/api/gallery/food', async (req, res) => {
  if (isMongoConnected) {
    const items = await GalleryItem.find({ category: { $ne: 'customers' } });
    res.json(items);
  } else {
    const db = readJSON();
    res.json(db.gallery.filter(item => item.category !== 'customers'));
  }
});

app.post('/api/admin/gallery/food', requireAdmin, async (req, res) => {
  const payload = {
    category: req.body.category || 'food',
    title: req.body.title || 'Food Highlight',
    image: req.body.image
  };

  if (isMongoConnected) {
    const item = new GalleryItem(payload);
    await item.save();
    res.status(201).json(item);
  } else {
    const db = readJSON();
    const newPhoto = { id: 'g_' + Date.now(), ...payload };
    db.gallery.push(newPhoto);
    writeJSON(db);
    res.status(201).json(newPhoto);
  }
});

app.delete('/api/admin/gallery/food/:id', requireAdmin, async (req, res) => {
  if (isMongoConnected) {
    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } else {
    const db = readJSON();
    db.gallery = db.gallery.filter(item => item.id !== req.params.id);
    writeJSON(db);
    res.json({ success: true });
  }
});

// 5. Selfie Gallery CRUD
app.get('/api/gallery/selfie', async (req, res) => {
  if (isMongoConnected) {
    const selfies = await Selfie.find();
    res.json(selfies);
  } else {
    const db = readJSON();
    res.json(db.selfieWall);
  }
});

app.post('/api/gallery/selfie', requireAdmin, async (req, res) => {
  const payload = {
    name: req.body.name,
    rating: parseInt(req.body.rating) || 5,
    review: req.body.review,
    image: req.body.image,
    likes: 0,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  if (isMongoConnected) {
    const selfie = new Selfie(payload);
    await selfie.save();
    // Also insert into gallery
    const galleryItem = new GalleryItem({
      category: 'customers',
      title: `${payload.name}'s Memory`,
      image: payload.image
    });
    await galleryItem.save();
    res.status(201).json(selfie);
  } else {
    const db = readJSON();
    const newSelfie = { id: Date.now(), ...payload };
    db.selfieWall.push(newSelfie);
    db.gallery.push({
      id: 'g_selfie_' + newSelfie.id,
      category: 'customers',
      title: `${newSelfie.name}'s Memory`,
      image: newSelfie.image
    });
    writeJSON(db);
    res.status(201).json(newSelfie);
  }
});

app.post('/api/admin/gallery/selfie', requireAdmin, async (req, res) => {
  const payload = {
    name: req.body.name,
    rating: parseInt(req.body.rating) || 5,
    review: req.body.review,
    image: req.body.image,
    likes: 0,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  if (isMongoConnected) {
    const selfie = new Selfie(payload);
    await selfie.save();
    // Also insert into gallery
    const galleryItem = new GalleryItem({
      category: 'customers',
      title: `${payload.name}'s Memory`,
      image: payload.image
    });
    await galleryItem.save();
    res.status(201).json(selfie);
  } else {
    const db = readJSON();
    const newSelfie = { id: Date.now(), ...payload };
    db.selfieWall.push(newSelfie);
    db.gallery.push({
      id: 'g_selfie_' + newSelfie.id,
      category: 'customers',
      title: `${newSelfie.name}'s Memory`,
      image: newSelfie.image
    });
    writeJSON(db);
    res.status(201).json(newSelfie);
  }
});

app.delete('/api/admin/gallery/selfie/:id', requireAdmin, async (req, res) => {
  if (isMongoConnected) {
    const selfie = await Selfie.findById(req.params.id);
    if (selfie) {
      await GalleryItem.findOneAndDelete({ image: selfie.image });
      await Selfie.findByIdAndDelete(req.params.id);
    }
    res.json({ success: true });
  } else {
    const db = readJSON();
    const selfieId = parseInt(req.params.id);
    db.selfieWall = db.selfieWall.filter(item => item.id !== selfieId);
    db.gallery = db.gallery.filter(item => item.id !== 'g_selfie_' + selfieId);
    writeJSON(db);
    res.json({ success: true });
  }
});

// 6. Reviews CRUD
app.get('/api/reviews', async (req, res) => {
  if (isMongoConnected) {
    const reviews = await Review.find();
    res.json(reviews);
  } else {
    const db = readJSON();
    res.json(db.reviews);
  }
});

app.post('/api/reviews', requireAdmin, async (req, res) => {
  const payload = {
    name: req.body.name,
    role: req.body.role || 'Guest',
    rating: parseInt(req.body.rating) || 5,
    review: req.body.review,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  if (isMongoConnected) {
    const review = new Review(payload);
    await review.save();
    res.status(201).json(review);
  } else {
    const db = readJSON();
    const newReview = { id: 'rev_' + Date.now(), ...payload };
    db.reviews.push(newReview);
    writeJSON(db);
    res.status(201).json(newReview);
  }
});

app.post('/api/admin/reviews', requireAdmin, async (req, res) => {
  const payload = {
    name: req.body.name,
    role: req.body.role || 'Guest',
    rating: parseInt(req.body.rating) || 5,
    review: req.body.review,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  if (isMongoConnected) {
    const review = new Review(payload);
    await review.save();
    res.status(201).json(review);
  } else {
    const db = readJSON();
    const newReview = { id: 'rev_' + Date.now(), ...payload };
    db.reviews.push(newReview);
    writeJSON(db);
    res.status(201).json(newReview);
  }
});

app.delete('/api/admin/reviews/:id', requireAdmin, async (req, res) => {
  if (isMongoConnected) {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } else {
    const db = readJSON();
    db.reviews = db.reviews.filter(item => item.id !== req.params.id);
    writeJSON(db);
    res.json({ success: true });
  }
});

// 7. Multer Image File Upload Router (Protected)
app.post('/api/admin/upload', requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an image file.' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

/* ==========================================
   PRODUCTION STATIC DIRECTORY SERVE
   ========================================== */
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Express Secure Server running on port ${PORT}`);
});
