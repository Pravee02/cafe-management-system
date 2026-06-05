window.cafeData = {
  categories: [
    { id: 'pizza', name: 'Pizza', icon: 'fa-pizza-slice' },
    { id: 'burger', name: 'Burger', icon: 'fa-hamburger' },
    { id: 'momos', name: 'Momos', icon: 'fa-cloud' },
    { id: 'fries', name: 'Fries', icon: 'fa-fries' },
    { id: 'tea', name: 'Tea', icon: 'fa-mug-hot' },
    { id: 'coffee', name: 'Coffee', icon: 'fa-coffee' },
    { id: 'shakes', name: 'Shakes', icon: 'fa-glass-martini-alt' },
    { id: 'mocktails', name: 'Mocktails', icon: 'fa-cocktail' },
    { id: 'sandwiches', name: 'Sandwiches', icon: 'fa-bread-slice' },
    { id: 'rolls', name: 'Rolls', icon: 'fa-scroll' }
  ],
  
  menuItems: [
    // Pizza
    {
      id: 'p1',
      category: 'pizza',
      name: 'Artisanal Margherita',
      price: 249,
      description: 'San Marzano tomatoes, fresh buffalo mozzarella, fresh basil, and extra virgin olive oil on hand-stretched sourdough crust.',
      rating: 4.8,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p2',
      category: 'pizza',
      name: 'Paneer Tikka Passion',
      price: 299,
      description: 'Clay-oven spiced paneer chunks, bell peppers, red onions, coriander, and mint-mayo drizzle on cheesy base.',
      rating: 4.7,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p3',
      category: 'pizza',
      name: 'Spicy Peri Peri Delight',
      price: 329,
      description: 'Fiery peri-peri chicken/paneer, sweet corn, sliced jalapenos, and smoked scamorza cheese.',
      rating: 4.9,
      isVeg: false,
      image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80'
    },

    // Burger
    {
      id: 'b1',
      category: 'burger',
      name: 'Cheesy Lava Beast',
      price: 189,
      description: 'Crispy veggie patty stuffed with liquid cheddar, topped with caramelized onions, gherkins, and signature Zoop sauce.',
      rating: 4.9,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'b2',
      category: 'burger',
      name: 'Paneer Maharaja Classic',
      price: 219,
      description: 'Double layer spiced paneer slabs, iceberg lettuce, tomatoes, and rich tandoori dressing in sesame brioche buns.',
      rating: 4.6,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80'
    },

    // Momos
    {
      id: 'm1',
      category: 'momos',
      name: 'Tandoori Paneer Momos',
      price: 149,
      description: 'Dumplings stuffed with spiced paneer, charred in clay oven, served with spicy red chili chutney and garlic aioli.',
      rating: 4.8,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'm2',
      category: 'momos',
      name: 'Crunchy Kurkure Momos',
      price: 159,
      description: 'Crispy, cornflake-crusted deep-fried dumplings with a savory vegetable filling and dynamic seasoning.',
      rating: 4.7,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1625220194771-7ebded0d90ae?auto=format&fit=crop&w=600&q=80'
    },

    // Fries
    {
      id: 'f1',
      category: 'fries',
      name: 'Signature Peri Peri Fries',
      price: 99,
      description: 'Golden skin-on french fries tossed in an aromatic, fiery peri-peri seasoning blend.',
      rating: 4.5,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'f2',
      category: 'fries',
      name: 'Loaded Truffle Cheese Fries',
      price: 149,
      description: 'Crispy fries drizzled with aromatic white truffle oil, melted cheese sauce, and chives.',
      rating: 4.8,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80'
    },

    // Tea
    {
      id: 't1',
      category: 'tea',
      name: 'Adrak Elaichi Cutting Chai',
      price: 39,
      description: 'Traditional Indian street-style tea brewed with freshly crushed ginger, green cardamom, and full-cream milk.',
      rating: 4.9,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 't2',
      category: 'tea',
      name: 'Premium Jasmine Green',
      price: 79,
      description: 'Delicate whole-leaf green tea scented with fresh jasmine blossoms for a floral, calming cup.',
      rating: 4.4,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1627435601357-37ae7918d096?auto=format&fit=crop&w=600&q=80'
    },

    // Coffee
    {
      id: 'c1',
      category: 'coffee',
      name: 'Rose & Gold Latte',
      price: 159,
      description: 'Double shot arabica, steamed milk, organic rose essence, topped with edible 24k gold leaf.',
      rating: 4.9,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'c2',
      category: 'coffee',
      name: 'Caramel Macchiato Shakerato',
      price: 179,
      description: 'Espresso shaken with ice, rich house caramel syrup, and cold milk foam, served tall.',
      rating: 4.8,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
    },

    // Shakes
    {
      id: 's1',
      category: 'shakes',
      name: 'Belgian Chocolate Crunch',
      price: 169,
      description: 'Thick shake made with 70% dark Belgian chocolate gelato, topped with brownie chunks and chocolate shavings.',
      rating: 4.9,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 's2',
      category: 'shakes',
      name: 'Royal Lotus Biscoff Shake',
      price: 189,
      description: 'Indulgent shake infused with premium Lotus Biscoff spread, crushed cookies, and whipped cream.',
      rating: 4.8,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80'
    },

    // Mocktails
    {
      id: 'k1',
      category: 'mocktails',
      name: 'Blue Ocean Curacao',
      price: 129,
      description: 'Refreshing summer drink with blue curacao syrup, freshly squeezed lime juice, mint leaves, and carbonated soda.',
      rating: 4.6,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'k2',
      category: 'mocktails',
      name: 'Cranberry Basil Sparkler',
      price: 139,
      description: 'Tart cranberry juice shaken with fresh muddled basil leaves, club soda, and a touch of organic honey.',
      rating: 4.7,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80'
    },

    // Sandwiches
    {
      id: 'w1',
      category: 'sandwiches',
      name: 'Sourdough Pesto Caprese',
      price: 179,
      description: 'House-made basil pesto, fresh tomatoes, creamy bocconcini cheese, grilled on artisan sourdough.',
      rating: 4.8,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'w2',
      category: 'sandwiches',
      name: 'Smoked Paneer Club Sandwich',
      price: 199,
      description: 'Triple-decker sandwich layered with hickory-smoked paneer, coleslaw, cheese slice, and fresh cucumbers.',
      rating: 4.7,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80'
    },

    // Rolls
    {
      id: 'r1',
      category: 'rolls',
      name: 'Paneer Kathi Roll',
      price: 139,
      description: 'Laccha paratha rolled with skewered cottage cheese cubes, pickled onions, chatpata masala, and mint chutney.',
      rating: 4.7,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1626700051175-6518c4793fdf?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'r2',
      category: 'rolls',
      name: 'Zesty Crispy Veg Wrap',
      price: 129,
      description: 'Tortilla sheet rolled with crunchy vegetable cutlet, shredded lettuce, cheese sauce, and sweet chili dressing.',
      rating: 4.5,
      isVeg: true,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    }
  ],

  reviews: [
    {
      id: 1,
      name: 'Aarav Sharma',
      rating: 5,
      role: 'Student at DTU',
      review: 'Zoop Cafe is our go-to hangout spot. The Rose Latte is out of this world, and the aesthetic is insanely premium. Perfect place to code or catch up with friends.'
    },
    {
      id: 2,
      name: 'Neha Kapoor',
      rating: 5,
      role: 'Food Blogger',
      review: 'From the glassmorphic cards to the curated menu, Zoop looks and tastes like a 5-star brand. The Cheesy Lava Burger is loaded and super delicious!'
    },
    {
      id: 3,
      name: 'Rohan Mehra',
      rating: 4,
      role: 'Regular Customer',
      review: 'Excellent service and great prices for students. The seating is comfortable and the vibe is always dynamic. Love their Peri Peri Fries!'
    },
    {
      id: 4,
      name: 'Ananya Goel',
      rating: 5,
      role: 'Design Student',
      review: 'I am blown away by the interior design and the branding. The presentation of the dishes matches the high-end feel of the space itself.'
    }
  ],

  selfieWall: [
    {
      id: 1,
      name: 'Preeti & Sarthak',
      rating: 5,
      likes: 124,
      review: 'Weekend vibes at our favorite corner! Food is awesome!',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Kabir Verma',
      rating: 5,
      likes: 89,
      review: 'Tackling midterms with double caffeine and hot momos. 🔥',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Megha Sen',
      rating: 5,
      likes: 156,
      review: 'Obsessed with the aesthetics here! Perfect lighting for selfies.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      name: 'The Foodie Duo',
      rating: 5,
      likes: 210,
      review: 'Tried the Belgian chocolate shake today. Mind blown! 🥤',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80'
    }
  ],

  gallery: [
    { id: 'g1', category: 'food', title: 'Cheesy Sourdough Margherita', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
    { id: 'g2', category: 'seating', title: 'Premium Velvet Seating Corner', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80' },
    { id: 'g3', category: 'cafe', title: 'The Zoop Espresso Bar', image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80' },
    { id: 'g4', category: 'food', title: 'Belgian Chocolate Waffle Shake', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
    { id: 'g5', category: 'customers', title: 'Co-Working at Zoop', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
    { id: 'g6', category: 'seating', title: 'Ambient Evening Seating', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    { id: 'g7', category: 'food', title: 'Sourdough Caprese Sandwich', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80' },
    { id: 'g8', category: 'cafe', title: 'Neon Signature Entrance', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80' }
  ]
};
