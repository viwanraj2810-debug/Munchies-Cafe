import type {
    RestaurantInfo,
    MenuItem,
    MenuCategory,
    Review,
    SignatureDishData,
} from '@/types'

export const restaurantInfo: RestaurantInfo = {
    name: 'Munchies Cafe',
    tagline: 'Where every plate tells a story.',
    established: '2019',
    rating: '4.8',
    covers: '120+',
    phone: '+919508351404',
    whatsapp: '919508351404',
    address: 'opposite to Nalanda medical College, near rail vihar Colony, Daud Bigha, Kankarbagh, daudbigha, Patna, Bihar 800026',
    mapUrl: 'https://maps.app.goo.gl/F3is1ifNbjhhTG8c8',
    mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1799.0546106063587!2d85.17262793840793!3d25.601286658425995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed595569e17dcb%3A0xfab8394fba0ba1c6!2sMunchies%20Cafe!5e0!3m2!1sen!2sin!4v1772608787770!5m2!1sen!2sin',
    hours: '12:00 PM — 11:00 PM · Daily',
    speciality: 'North Indian & Mughlai Cuisine',
}

export const menuCategories: MenuCategory[] = [
    { id: 'cat-all', label: 'All', slug: 'all' },
    { id: 'cat-veg', label: 'Vegetarian', slug: 'veg' },
    { id: 'cat-nonveg', label: 'Non-Veg', slug: 'non-veg' },
    { id: 'cat-south', label: 'South Indian', slug: 'south-indian' },
    { id: 'cat-bev', label: 'Beverages', slug: 'beverages' },
    { id: 'cat-salad', label: 'Salads', slug: 'salads' },
]

export const menuItems: MenuItem[] = [
    /* ───── VEG ───── */
    {
        id: 'v1',
        name: 'Paneer Tikka Masala',
        description: 'Chargrilled cottage cheese simmered in a rich tomato-cream gravy with aromatic spices.',
        price: 320,
        category: 'veg',
        imageUrl: '/images/veg/2025-02-03 (1).webp',
        isVeg: true,
        isSignature: true,
    },
    {
        id: 'v2',
        name: 'Dal Makhani',
        description: 'Black lentils slow-cooked overnight with butter, cream and a whisper of smoky flavour.',
        price: 280,
        category: 'veg',
        imageUrl: '/images/veg/2025-02-03 (2).webp',
        isVeg: true,
    },
    {
        id: 'v3',
        name: 'Malai Kofta',
        description: 'Golden paneer-potato dumplings bathed in a silky cashew-onion gravy.',
        price: 300,
        category: 'veg',
        imageUrl: '/images/veg/2025-02-03.webp',
        isVeg: true,
    },
    {
        id: 'v4',
        name: 'Shahi Paneer',
        description: 'Cubes of paneer in a luscious royal gravy of cream, nuts and mild spices.',
        price: 310,
        category: 'veg',
        imageUrl: '/images/veg/DSC_8273.webp',
        isVeg: true,
    },
    {
        id: 'v5',
        name: 'Kadhai Paneer',
        description: 'Wok-tossed paneer with bell peppers, onions and freshly pounded spices.',
        price: 290,
        category: 'veg',
        imageUrl: '/images/veg/DSC_8306.webp',
        isVeg: true,
    },
    {
        id: 'v6',
        name: 'Aloo Gobi',
        description: 'Potatoes and cauliflower dry-roasted with turmeric, cumin and fresh coriander.',
        price: 220,
        category: 'veg',
        imageUrl: '/images/veg/WhatsApp Image 2022-06-21 at 9.44.53 PM.webp',
        isVeg: true,
    },
    {
        id: 'v7',
        name: 'Mixed Veg Curry',
        description: 'Seasonal vegetables braised in a fragrant curry with ginger-garlic paste.',
        price: 240,
        category: 'veg',
        imageUrl: '/images/veg/WhatsApp Image 2022-06-21 at 9.44.56 PM.webp',
        isVeg: true,
    },
    {
        id: 'v8',
        name: 'Palak Paneer',
        description: 'Creamy spinach purée studded with soft paneer cubes and finished with cream.',
        price: 270,
        category: 'veg',
        imageUrl: '/images/veg/WhatsApp Image 2022-06-21 at 9.44.57 PM (3).webp',
        isVeg: true,
    },

    /* ───── NON-VEG ───── */
    {
        id: 'nv1',
        name: 'Butter Chicken',
        description: 'Tender tandoori chicken in a velvety tomato-butter sauce. Our most-loved dish.',
        price: 380,
        category: 'non-veg',
        imageUrl: '/images/nonveg/DSC_8251.webp',
        isVeg: false,
        isSignature: true,
    },
    {
        id: 'nv2',
        name: 'Mutton Rogan Josh',
        description: 'Slow-braised lamb shanks in a Kashmiri chilli and fennel-scented gravy.',
        price: 450,
        category: 'non-veg',
        imageUrl: '/images/nonveg/DSC_8275.webp',
        isVeg: false,
    },
    {
        id: 'nv3',
        name: 'Chicken Biryani',
        description: 'Dum-cooked basmati layered with spiced chicken, saffron and caramelised onions.',
        price: 360,
        category: 'non-veg',
        imageUrl: '/images/nonveg/DSC_8293.webp',
        isVeg: false,
    },
    {
        id: 'nv4',
        name: 'Tandoori Chicken',
        description: 'Half chicken marinated in yoghurt-spice paste, charred in a clay oven.',
        price: 340,
        category: 'non-veg',
        imageUrl: '/images/nonveg/DSC_8295.webp',
        isVeg: false,
    },
    {
        id: 'nv5',
        name: 'Fish Amritsari',
        description: 'Crispy batter-fried river fish fillets with ajwain, served with mint chutney.',
        price: 390,
        category: 'non-veg',
        imageUrl: '/images/nonveg/WhatsApp Image 2022-06-21 at 9.44.44 PM (1).webp',
        isVeg: false,
    },

    /* ───── SOUTH INDIAN ───── */
    {
        id: 'si1',
        name: 'Masala Dosa',
        description: 'Paper-thin rice crêpe stuffed with spiced potato, served with sambar and chutneys.',
        price: 180,
        category: 'south-indian',
        imageUrl: '/images/veg/south Iniadn/DSC_8262.webp',
        isVeg: true,
    },
    {
        id: 'si2',
        name: 'Idli Sambar',
        description: 'Steamed rice cakes paired with aromatic lentil sambar and coconut chutney.',
        price: 150,
        category: 'south-indian',
        imageUrl: '/images/veg/south Iniadn/DSC_8267.webp',
        isVeg: true,
    },
    {
        id: 'si3',
        name: 'Uttapam',
        description: 'Thick rice-lentil pancake topped with onions, tomatoes and green chillies.',
        price: 170,
        category: 'south-indian',
        imageUrl: '/images/veg/south Iniadn/DSC_8274.webp',
        isVeg: true,
    },

    /* ───── BEVERAGES ───── */
    {
        id: 'b1',
        name: 'Masala Chai',
        description: 'Robust Assam tea brewed with cardamom, ginger and whole spices.',
        price: 60,
        category: 'beverages',
        imageUrl: '/images/beverages/tea.webp',
        isVeg: true,
    },
    {
        id: 'b2',
        name: 'Chocolate Coffee Shake',
        description: 'Rich chocolate and coffee blend with a hint of vanilla.',
        price: 120,
        category: 'beverages',
        imageUrl: '/images/beverages/shake.webp',
        isVeg: true,
    },
    {
        id: 'b3',
        name: 'Min Mojito',
        description: 'Mint mojito is a refreshing and invigorating beverage that combines the crisp, minty flavor of fresh mint leaves with the zesty, tangy taste of lime juice, all balanced by the sweetness of sugar and the cool, invigorating sensation of ice.',
        price: 220,
        category: 'beverages',
        imageUrl: '/images/beverages/Mint mojito.webp',
        isVeg: true,
    },
    {
        id: 'b4',
        name: 'Lemon Mojito',
        description: 'Lemon mojito is a refreshing and invigorating beverage that combines the zesty, tangy taste of fresh lemon juice with the crisp, minty flavor of fresh mint leaves, all balanced by the sweetness of sugar and the cool, invigorating sensation of ice.',
        price: 220,
        category: 'beverages',
        imageUrl: '/images/beverages/LemonMojito.webp',
        isVeg: true,
    },
    {
        id: 'b5',
        name: 'Mojito',
        description: 'Mojito is a refreshing and invigorating beverage that combines the zesty, tangy taste of fresh lemon juice with the crisp, minty flavor of fresh mint leaves, all balanced by the sweetness of sugar and the cool, invigorating sensation of ice.',
        price: 220,
        category: 'beverages',
        imageUrl: '/images/beverages/Mojito.webp',
        isVeg: true,
    },

    /* ───── SALADS ───── */
    {
        id: 's1',
        name: 'Kachumber Salad',
        description: 'Finely diced cucumber, tomato, onion and fresh coriander with lemon.',
        price: 120,
        category: 'salads',
        imageUrl: '/images/veg/salad/DSC_8280.webp',
        isVeg: true,
    },
    {
        id: 's2',
        name: 'Sprout Salad',
        description: 'Mixed sprouts tossed with pomegranate, mint and a tangy chaat dressing.',
        price: 140,
        category: 'salads',
        imageUrl: '/images/veg/salad/DSC_8283.webp',
        isVeg: true,
    },
]

export const reviews: Review[] = [
    {
        id: 'r1',
        quote:
            'The butter chicken here is unlike anything I have ever tasted. Pure velvet on my palate. We drove two hours and would do it again tomorrow.',
        reviewer: 'Priya Sharma',
        source: 'Google',
        rating: 5,
        isHero: true,
    },
    {
        id: 'r2',
        quote:
            'Authentic flavours, elegant ambience. The mutton rogan josh melted in my mouth.',
        reviewer: 'Rohan Kapoor',
        source: 'Zomato',
        rating: 5,
    },
    {
        id: 'r3',
        quote:
            'Perfect for a quiet dinner. Impeccable service. The dal makhani is a must-try.',
        reviewer: 'Ananya Verma',
        source: 'TripAdvisor',
        rating: 4,
    },
    {
        id: 'r4',
        quote:
            'Best Indian fine dining experience in Patna. The attention to detail is remarkable.',
        reviewer: 'Karan Mehta',
        source: 'Google',
        rating: 5,
    },
]

export const signatureDish: SignatureDishData = {
    name: 'Mint Mojito',
    subtitle: 'The best Mojito in town',
    price: 420,
    description:
        'Mint mojito is a refreshing and invigorating beverage that combines the crisp, minty flavor of fresh mint leaves with the zesty, tangy taste of lime juice, all balanced by the sweetness of sugar and the cool, invigorating sensation of ice.',
    imageUrl: '/images/beverages/Mint mojito.webp',
}
