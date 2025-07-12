# HealthConnect - Open-Source Healthcare Access Platform


A modular web application connecting underserved communities with free medical services through clinic location, AI triage, and transparent donation systems.

## 🏥 Project Description

HealthConnect is an open-source platform designed to:
- **Map free healthcare services** in low-income urban areas
- **Provide AI-powered triage** in local languages
- **Facilitate transparent donations** to support clinics
- **Offer SMS-based access** for low-bandwidth users

Built with privacy-focused design to serve vulnerable populations without requiring personal identification.

## ✨ Key Features

### 🌍 Location-Aware Services
- Interactive map of free clinics/hospitals
- Filter by specialty, language, and walk-in availability
- Offline-capable location search

### 🤖 AI Health Assistant
- Symptom checker with urgency assessment
- Multilingual support (English/Spanish/Hindi + more)
- SMS-based interaction alternative

### 💰 Transparent Donation System
- Real-time funding tracker
- Clinic-specific sponsorship
- Recurring donation options



| Landing Page 🌐                      | 
| --------------------------  | 
|<img width="2828" height="1334" alt="image" src="https://github.com/user-attachments/assets/d074b512-4b8c-458a-81d9-8d2eab3e831f" />


## 🛠️ Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14, Tailwind CSS |
| Backend | Firebase (Firestore, Auth) |
| AI | GPT-4o, custom NLP models |
| Payments | Stripe/UPI/M-Pesa |
| SMS | Twilio API |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Firebase project
- Stripe/Twilio accounts (optional)

### Installation
```bash
git clone https://github.com/yourrepo/healthconnect.git
cd healthconnect
npm install
```
cp .env.example .env.local
```
## Environment Setup
Add these environment variables to your configuration:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_MONTHLY_5_PRICE_ID=
STRIPE_MONTHLY_20_PRICE_ID=
STRIPE_MONTHLY_50_PRICE_ID=
STRIPE_MONTHLY_100_PRICE_ID=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```
## 🌍 How to Customize for Your City  

## 1. Rename the Project  
```bash  
# Linux/MacOS:  
find . -type f -exec sed -i 's/HealthConnect Jakarta/MedicalAid YourCity/g' {} +  
```
## 2. Update Critical Files

File	Changes Needed
src/config/app.ts	App name, contact info
public/locations.json	Clinic coordinates
## 3. Localize Content

```typescript
// `src/i18n/config.ts`  
const languages = {  
  en: 'English',  
  // Add yours:  
  hi: 'Hindi',  
  es: 'Spanish'  
}  
## 💻 Technical Features
- Mobile-first design (Tailwind CSS)
- Stripe/UPI/M-Pesa payment switch
- SMS fallback (Twilio/ClickSend)
```
## 🛠️ Setup
```bash 
npm install npm run dev 
```
> Pro Tip: Use --low-bandwidth flag for areas with poor connectivity.
