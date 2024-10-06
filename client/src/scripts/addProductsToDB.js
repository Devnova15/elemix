import {addProduct} from "./requests.js";

// Функция для добавления только мужских продуктов
export const addProductsMensCategory = async () => {
    const products = [
        {
            name: "Chino Shorts",
            currentPrice: 24.00,
            categories: "men",
            type: "Short",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/shorts-2-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/shorts-2-1-760x970.jpg",
            ],
            quantity: 100,
            description: "Comfortable and stylish chino shorts, ideal for warm weather outings. Pair them effortlessly with your favorite tops."
        },
        {
            name: "Black T-shirt",
            currentPrice: 14.00,
            categories: "men",
            type: "T-shirt",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/t-shirt-2-1-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/t-shirt-1-1-760x970.jpg",
            ],
            quantity: 245,
            color: "black",
            description: "A soft, breathable black T-shirt that’s perfect for layering or wearing solo. A timeless wardrobe essential for any occasion."
        },
        {
            name: "Joggers",
            currentPrice: 39.99,
            categories: "men",
            type: "Jeans",
            variations: [
                {
                    color: "Brown",
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/joggers-4-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/joggers-3-760x970.jpg"
                    ],
                    quantity: 245,
                },
                {
                    color: "Black",
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/joggers-2-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/joggers-1-760x970.jpg"
                    ],
                    quantity: 150,
                }
            ],
            description: "Joggers in woven fabric. Elasticized waistband with concealed drawstring and mock fly. Side pockets with zipper and welt back pockets. Legs with creases and sewn foldover cuffs.",
            sizes: "S, M, L, XL",

        },
        {
            name: "Bomber Jacket",
            currentPrice: 59.00,
            categories: "men",
            type: "Jacket, Top",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/hoodie-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/hoodie-1-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/hoodie-3-760x970.jpg",
            ],
            quantity: 100,
            color: "brown",
            sizes: "XSS, S, M, L, XL",
            description: "Jacket featuring a high neck, long sleeves with elastic cuffs, welt pockets at the hip, inside pocket detail, matching ribbed hem and zip-up front."

        },
        {
            name: "Hoodie",
            currentPrice: 19.99, // Новая цена со скидкой
            previousPrice: 24.45, // Старая цена (до скидки)
            categories: "men",
            type: "Hoodie",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/hoodie-2-2-150x150.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/hoodie-2-1-150x150.jpg",
            ],
            quantity: 0,
            description: "Cotton sweatshirt with a lined hood with drawstring and wrapover front. Kangaroo pocket, long sleeves, and ribbing at cuffs and hem."

        },
        {
            name: "Polo Shirt",
            currentPrice: 24.90,
            categories: "men",
            type: "T-shirt",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/polo-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/polo-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/polo-1-760x970.jpg",
            ],
            quantity: 50,
            sizes: "XSS, S, M, L, XL",
            description: "Polo shirt featuring a shirt collar, short sleeves with ribbed cuffs, side vents at the hem and a henley button placket."

        },

        {
            name: "Embroidered Belt Bag",
            currentPrice: 17.99,
            categories: "men",
            type: "Accessories, Bags",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/bag-2-150x150.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/bag-1-760x970.jpg",

            ],
            quantity: 50,
            description: "A stylish, embroidered belt bag for hands-free convenience. Perfect for essentials with an adjustable strap for versatile wear. Ideal for everyday use or travel."

        },
        {
            name: "3-pack Necklaces",
            currentPrice: 19.99,
            categories: "men",
            type: "Accessories",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/neaklaces-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/neaklaces-1-760x970.jpg",
            ],
            quantity: 70,
            description: "A versatile set of three necklaces to elevate any look. Layer them together or wear separately for effortless style. Perfect for any occasion."

        },
        {
            name: "Leather Sandals",
            currentPrice: 39.00,
            categories: "men",
            type: "Sandals, Shoes",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sandals-2-1-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sandals-2-2-760x970.jpg",
            ],
            quantity: 245,
            description: "Comfortable and stylish leather sandals, perfect for any casual outfit. Durable design with a sleek finish for everyday wear."

        },

        {
            name: "Oval Sunglasses",
            currentPrice: 14.00,
            categories: "men",
            type: "Accessories, Sunglasses",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sunglasses-4-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sunglasses-4-1-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sunglasses-4-2-760x970.jpg",
            ],
            quantity: 50,
            description: "Sleek and stylish men's oval sunglasses. Offering UV protection and a modern design, perfect for daily wear and outdoor activities."

        },

        {
            name: "Sneakers",
            currentPrice: 78.90,
            categories: "men",
            type: "Shoes",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sneakers-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sneakers-1-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sneakers-2-760x970.jpg",
            ],
            quantity: 70,
            description: "Classic sneakers with a modern design, perfect for everyday wear. Comfortable and durable."

        },

    ];

    // Фильтрация по категории "men"
    const menProducts = products.filter(product => product.categories === "men");

    const productsPromise = menProducts.map((product) => addProduct(product));

    await Promise.all(productsPromise);
    console.log('Men category products added');
};




export const addProductsWomensCategory = async () => {
    const products = [
        {
            name: "Printed Dress",
            currentPrice: 19.00,
            categories: "women",
            type: "Dresses",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/printed-dress-1-min-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/printed-dress-2-min-760x970.jpg",
            ],
            quantity: 50,
            sizes: "S, M, L, XL",
            description: "A vibrant printed dress featuring a flattering silhouette and lightweight fabric. Perfect for casual outings or dressed-up occasions."

        },

        {
            name: "Caramel Sunglasses",
            currentPrice: 42.45, // Новая цена со скидкой
            previousPrice: 49.00, // Старая цена (до скидки)
            categories: "women",
            type: "Accessories, Sunglasses",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sunglasses-3-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sunglasses-3-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sunglasses-3-1-760x970.jpg",
            ],
            quantity: 245,
            description: "Chic caramel-colored sunglasses with a modern design. Offering UV protection and a stylish finish for any sunny day."

        },

        {
            name: "Pleated Dress",
            currentPrice: 39.00,
            categories: "women",
            type: "Dresses",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/pleated-dress-1-min-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/pleated-dress-1-min-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/pleated-dress-2-min-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/pleated-dress-4-min-760x970.jpg",
            ],
            quantity: 35,
            sizes: "XSS, XS, S, M, L, XL",
            description: "Elegant pleated dress with a flowing silhouette, perfect for both casual and formal occasions. Lightweight and effortlessly stylish."
        },
        {
            name: "Striped Dress",
            currentPrice: 29.00,
            categories: "women",
            type: "Dresses",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/dress-1-1-min-100x100.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/dress-1-2-min-150x150.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/dress-1-3-min-760x970.jpg",
            ],
            quantity: 75,
            sizes: "XSS, XS, S, M, L, XL",
            description: "Collared shirt dress with a V-neckline. Sleeves falling below the elbow with elastic trim. Front patch pocket. Asymmetric hem. Polo-style button"
        },


        {
            name: "90s Shoulder Bag",
            currentPrice: 39.00,
            categories: "women",
            type: "Accessories, Bags",
            variations: [
                {
                    color: "Powder",
                    quantity: 70,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/80s-bag-min-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/80s-bag-3-min-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/80s-bag-2-min-760x970.jpg"
                    ]
                },
                {
                    color: "Black",
                    quantity: 70,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/80s-bag-black-2-min-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/80s-bag-black-3-min-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/80s-bag-black-1-min-760x970.jpg"
                    ]
                }
            ],
            description: "Tote bag in a combination of colours. Woven macramé-style body. Trim at the top in a combination of materials with gold stud detail. Shoulder straps. Lined interior with two pockets, one of which fastens with a zip. Magnetic clasp closure."
        },


        {
            name: "Retro Midi Skirt",
            currentPrice: 29.00,
            categories: "women",
            type: "Dresses",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/skirt-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/skirt-1-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/skirt-2-760x970.jpg",
            ],
            quantity: 90,
            description: "A stylish retro midi skirt featuring a high waist and a classic A-line silhouette. Perfect for vintage-inspired looks."
        },


        {
            name: "Small Backpack",
            currentPrice: 29.00,
            categories: "women",
            type: "Accessories, Bags",
            variations: [
                {
                    color: "White",
                    previousPrice: 25.00,
                    quantity: 30,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/backpack-white-1-min-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/backpack-white-2-min-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/backpack-white-3-min-760x970.jpg"
                    ]
                },
                {
                    color: "Black",
                    currentPrice: 29.00,
                    quantity: 15,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/backpack-black-3-min-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/backpack-black-1-min-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/backpack-black-2-min-760x970.jpg"
                    ]
                }
            ],
            description: "Tote bag in a combination of colors. Woven macramé-style body. Trim at the top in a combination of materials with gold stud detail. Shoulder straps. Lined interior with two pockets, one of which fastens with a zip. Magnetic clasp closure."
        },




        {
            name: "Bralette Top",
            currentPrice: 12.00,
            categories: "women",
            type: "Top",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/bralette-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/bralette-1-760x970.jpg",
            ],
            quantity: 30,
            sizes: "S, M, L",
            description: "Soft, lightweight bralette top with a minimalist design, perfect for layering or lounging."
        },

        {
            name: "Cropped Top",
            currentPrice: 18.00,
            categories: "women",
            type: "Top, T-shirt",
            variations: [
                {
                    color: "Black",
                    quantity: 50,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/top-5-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/top-6-760x970.jpg",
                    ]
                },
                {
                    color: "Lilac",
                    quantity: 30,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/top-2-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/top-1-760x970.jpg",
                    ]
                },
                {
                    color: "Lime",
                    quantity: 20,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/top-3-760x970.jpg",
                    ]
                }
            ],
            description: "Stylish cropped top with color variations. Perfect for casual wear.",
            sizes: "XSS, XS, S, M, L, XL",
        },


        {
            name: "Cotton Utility Dress",
            currentPrice: 49.00,
            categories: "women",
            type: "Dresses",
            variations: [
                {
                    color: "Black",
                    quantity: 50,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/cotton-dress-2-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/cotton-dress-1-760x970.jpg",
                    ]
                },
                {
                    color: "Navy",
                    quantity: 30,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/cotton-dress-3-760x970.jpg",

                    ]
                },
                {
                    color: "Powder",
                    quantity: 30,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/cotton-dress-4-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/cotton-dress-5-760x970.jpg",
                    ]
                }
            ],
            description: "Chic cotton utility dress with functional pockets and a relaxed fit, perfect for casual outings.",
            sizes: "XSS, XS, S, M, L, XL",
        },

        {
            name: "Striped Dress",
            currentPrice: 49.00, // Новая цена со скидкой
            previousPrice: 56.00, // Старая цена (до скидки)
            categories: "women",
            type: "Dresses",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/pinafore-dress-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/pinafore-dress-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/pinafore-dress-1-760x970.jpg",
            ],
            quantity: 50,
            sizes: "XSS, XS, S, M, L, XL",
            description: "Stylish pinafore dress with adjustable straps and a relaxed fit, perfect for layering."
        },

        {
            name: "Sandals With Thin Straps",
            currentPrice: 24.50, // Новая цена со скидкой
            previousPrice: 29.00, // Старая цена (до скидки)
            categories: "women",
            type: "Dresses",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sandals-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sandals-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sandals-1-760x970.jpg",
            ],
            quantity: 100,
            description: "High-heel sandals available in different colours: blue and black. Interwoven thin straps on the front with toe divider. Lined stiletto heel. Square toe."
        },

        {
            name: "Oversized Sweatshirt",
            currentPrice: 29.00,
            categories: "women",
            type: "Coats",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/coat-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/coat-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/coat-1-760x970.jpg",
            ],
            quantity: 100,
            description: "Cozy oversized sweatshirt with a relaxed fit, ideal for casual comfort."
        },

        {
            name: "Sports Leggings",
            currentPrice: 26.00,
            categories: "women",
            type: "Leggings",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/leggings-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/leggings-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/leggings-1-760x970.jpg",
            ],
            quantity: 200,
            description: "High-waisted sports leggings with a snug fit, perfect for workouts."
        },
        {
            name: "Lace-Up Sandals",
            currentPrice: 19.99,
            categories: "women",
            type: "Sandals",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/lace-up-sandals-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/lace-up-sandals-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/lace-up-sandals-1-760x970.jpg",
            ],
            quantity: 45,
            description: "Blue flat sandals. Interwoven daisy print fabric on the upper. Laminated gold detail on the sole. Tie fastening at the ankle."
        },

        {
            name: "Platform Sneakers",
            currentPrice: 24.00,
            categories: "women",
            type: "Shoes",
            variations: [
                {
                    color: "Yellow",
                    quantity: 50,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/sneakers-2-3-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/sneakers-2-2-760x970.jpg",

                    ]
                },
                {
                    color: "White",
                    quantity: 30,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/sneakers-2-1-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2020/06/sneakers-2-4-760x970.jpg",
                    ]
                },
            ],
            description: "Chunky platform sneakers with a bold design for style and comfort.",
        },

        {
            name: "Belt With Chain",
            currentPrice: 99.00, // Новая цена со скидкой
            previousPrice: 129.00, // Старая цена (до скидки)
            categories: "women",
            type: "Accessories",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/belt-3-1-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/belt-1-1-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/belt-2-1-760x970.jpg",
            ],
            quantity: 100,
            description: "Metal belt with chain and links. Lobster clasp fastening."
        },

        {
            name: "Round Sunglasses",
            currentPrice: 16.00, // Новая цена со скидкой
            categories: "women",
            type: "Accessories, Sunglasses",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sunglasses-2-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/05/sunglasses-2-1-760x970.jpg",
            ],
            quantity: 30,
            description: "Stylish round sunglasses with UV protection for a retro-inspired look."
        },

        {
            name: "Straight-Leg Jeans",
            currentPrice: 48.40,
            categories: "women",
            type: "Jeans",
            variations: [
                {
                    color: "Blue",
                    quantity: 50,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/jeans-2-4-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/jeans-2-3-760x970.jpg",
                    ]
                },
                {
                    color: "White",
                    quantity: 40,
                    imageUrls: [
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/jeans-2-1-760x970.jpg",
                        "https://elemix.pixel-show.com/wp-content/uploads/2019/05/jeans-2-2-760x970.jpg",
                    ]
                },
            ],
            description: "Chunky platform sneakers with a bold design for style and comfort.",
            sizes: "XSS, XS, S, M, L, XL",
        },

        {
            name: "Roll-Up Jeans",
            currentPrice: 49.00,
            categories: "women",
            type: "Jeans",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/04/jeans-1-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/04/jeans-2-760x970.jpg",
            ],
            quantity: 30,
            description: "Casual roll-up jeans with adjustable cuffs for a laid-back look."
        },

        {
            name: "Shapewear Bodysuit",
            currentPrice: 49.00,
            categories: "women",
            type: "Bodysuit",
            imageUrls: [
                "https://elemix.pixel-show.com/wp-content/uploads/2019/04/bodysuit-3-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/04/bodysuit-2-760x970.jpg",
                "https://elemix.pixel-show.com/wp-content/uploads/2019/04/bodysuit-1-760x970.jpg",
            ],
            quantity: 50,
            description: "Seamless shapewear bodysuit for a smooth, sculpted silhouette.",
            sizes: "XSS, XS, S, M, L, XL",
        },

    ]


    const womenProducts = products.filter(product => product.categories === "women");

    const productsPromise = womenProducts.map((product) => addProduct(product));

    await Promise.all(productsPromise);
    console.log('Women category products added');
}


