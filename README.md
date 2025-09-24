# 🏡 Home Away

A modern vacation rental platform built with Next.js, allowing users to list and book properties worldwide.
Public link: https://home-away.huseinhk.com

## ✨ Features

- 🔐 **Authentication**: Secure user authentication with Clerk
- 🏠 **Property Management**: List and manage rental properties
- 📅 **Booking System**: Complete booking flow with calendar integration
- 💳 **Payment Processing**: Secure payments powered by Stripe
- ⭐ **Reviews & Ratings**: Guest review system for properties
- ❤️ **Favorites**: Save and manage favorite properties
- 🗺️ **Interactive Maps**: Property location mapping with Leaflet
- 🌙 **Dark Mode**: Modern UI with theme switching
- 📱 **Responsive Design**: Mobile-first responsive interface
- 🔍 **Search & Filter**: Advanced property search capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Payments**: Stripe
- **Styling**: Tailwind CSS + Radix UI components
- **Maps**: Leaflet & React Leaflet
- **Image Storage**: Supabase
- **State Management**: Zustand
- **Form Validation**: Zod
- **Charts**: Recharts
- **Date Handling**: React Day Picker & date-fns

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/HuseinHQ/home-away.git
   cd home-away
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:

   ```env
   DATABASE_URL="your_postgresql_url"
   DIRECT_URL="your_direct_postgresql_url"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   SUPABASE_URL="your_supabase_url"
   SUPABASE_ANON_KEY="your_supabase_anon_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
   STRIPE_SECRET_KEY="your_stripe_secret_key"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
├── components/            # Reusable React components
├── prisma/               # Database schema and migrations
├── utils/                # Utility functions and actions
├── hooks/                # Custom React hooks
├── lib/                  # Library configurations
└── public/               # Static assets
```

## 🔧 Key Features Implementation

- **Server Actions**: Leveraging Next.js server actions for form handling
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Modern UI**: shadcn/ui components with Tailwind CSS
- **Database Relations**: Well-structured relational database design
- **Image Upload**: Secure image handling with Supabase storage
- **Real-time Updates**: Optimistic UI updates and revalidation

## 📊 Admin Dashboard

Includes a comprehensive admin dashboard with:

- Booking analytics and charts
- Revenue tracking
- Property management statistics
- User activity monitoring

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [HuseinHQ](https://github.com/HuseinHQ)
