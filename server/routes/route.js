import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';

import products from '../model/productSchema.js';


const router = express.Router();

import stripePackage from 'stripe';

// Initialize Stripe with your secret key
const stripe = stripePackage('sk_test_51OwTgPSF8k242W8hEaynbsT2jV5GEGxLl4gk2cgIQACfaHVJdmrsZLSGO74uyCJ41dmfllQjSkjLj0NDCMoHr6nN00ksj9blI4');

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);



router.post("/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    try {
        const lineItems = products.map((product) => {
            // console.log(product);
            const priceValue = parseFloat(product.price.cost);
            const unitAmount = Math.round(priceValue);

            if (isNaN(unitAmount) || unitAmount <= 0) {
                throw new Error(`Invalid price for product: ${product.price.value}`);
            }

            const productName = typeof product.title === 'object' ? product.title.name : product.title;

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.title.shortTitle,
                        description: product.description, 
                        images: [product.url] 
                    },
                    unit_amount: unitAmount,
                },
                quantity: product.quantity
            };
        });

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "An error occurred while creating checkout session" });
    }
});



export default router;
