// Stripe Configuration for Donations
import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

// Donation preset amounts and their impact
export const DONATION_PRESETS = {
  5: "1 dengue vaccine",
  20: "4 health checkups",
  50: "10 dengue vaccines",
  100: "1 complete TB treatment package",
}

// Stripe product IDs for recurring donations
export const STRIPE_PRODUCTS = {
  monthly_5: process.env.STRIPE_MONTHLY_5_PRICE_ID,
  monthly_20: process.env.STRIPE_MONTHLY_20_PRICE_ID,
  monthly_50: process.env.STRIPE_MONTHLY_50_PRICE_ID,
  monthly_100: process.env.STRIPE_MONTHLY_100_PRICE_ID,
}
