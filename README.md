
# 🏔️ TrailBlaze — Hiking E-Commerce

> **Live demo:** [hiking-ecommerce.vercel.app](https://hiking-ecommerce.vercel.app/)

TrailBlaze is a full-stack hiking e-commerce platform that blends outdoor gear shopping with hiking trail discovery. Beyond browsing and purchasing equipment, users can search for real hiking trails, view interactive maps, check weather forecasts, and receive **AI-powered gear recommendations** tailored to a specific trail and date.

---

## ✨ Features

### 🛒 E-Commerce
- **Product catalog** — Men, Women, Shoes, All, and Deals categories with filtering by type, size, price, and gender.
- **Product detail** — Image gallery, size/color selectors, size guide, accordion info sections.
- **Shopping cart** — Quantity management, move items to wishlist.
- **Wishlist** — Save items for later with smart sorting (in-stock first).
- **Checkout** — Delivery address form → Stripe secure payment → Order confirmation.
- **Order tracking** — Live order status progression (Processing → Packing → In Transit → Delivering → Delivered) with auto-polling every 30 seconds.
- **Free shipping** — Progress bar toward the €99 free-shipping threshold.

### 🥾 Trail Discovery (Unique to TrailBlaze)
- **Search trails** by city, park, or region using OpenStreetMap / Overpass API.
- **Trail cards** — Name, difficulty, distance, network type, rich photos.
- **Trail detail** — Interactive Leaflet map with route polyline, elevation, difficulty info.
- **Quick-search buttons** — Swiss Alps, Black Forest, Dolomites, Pyrenees.
- **Home page trail carousel** — Featured hikes near Zurich.

### 🤖 AI Gear Advisor
- Powered by **Claude (Anthropic)** .
- Select a trail, pick a date, and the AI analyzes the weather forecast and trail difficulty to recommend specific tops, bottoms, and footwear from the store's inventory.
- Helps hikers pack appropriately for the conditions.

### 👤 User System
- Register / Login with email and password.
- JWT-based authentication via httpOnly cookies.
- Email verification via Resend.
- Profile management (name, email, password).
- Protected routes and guest-only routing.

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 7** | Build tool & dev server |
| **TypeScript** | Type-safe code |
| **React Router DOM 7** | Client-side routing |
| **Tailwind CSS 4** | Utility-first styling |
| **DaisyUI 5** | Tailwind component library |
| **SCSS** | Custom styles with color/size partials |
| **Leaflet / react-leaflet** | Interactive trail maps |
| **Stripe** | Payment processing |
| **react-hot-toast** | Toast notifications |
| **react-loading-skeleton** | Loading states |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js / Express 5** | REST API server |
| **Prisma 7** | ORM (PostgreSQL) |
| **Neon** | Serverless PostgreSQL |
| **JWT + bcrypt** | Authentication |
| **Stripe** | Payment Intents API |
| **Anthropic SDK** | AI gear recommendations |
| **Resend** | Transactional emails |
| **Nodemon** | Dev auto-restart |

### APIs & Integrations
| Service | Purpose |
|---|---|
| **Open-Meteo** | Weather forecasts & elevation data |
| **OpenRouteService** | Hiking route directions |
| **Overpass API** | OpenStreetMap trail queries |
| **Nominatim (OSM)** | Geocoding (city → coordinates) |
| **Pexels** | Trail photography |
| **Cloudinary** | Image & video hosting |

### Infrastructure
| Tool | Purpose |
|---|---|
| **Vercel** | Frontend hosting |
| **Render** | Backend hosting |
| **pnpm** | Package manager |
| **Concurrently** | Run frontend + backend in dev |

---

## 📁 Project Structure

```
├── client/                     # React frontend
│   └── src/
│       ├── App.jsx             # Root component (BrowserRouter + AuthProvider)
│       ├── AppLayout.tsx       # Routes, header, footer, error boundary
│       ├── pages/              # Page components
│       │   ├── home/           # Landing page
│       │   ├── category/       # Product listing with filters
│       │   ├── product_page/   # Product detail page
│       │   ├── cart/           # Shopping cart + wishlist
│       │   ├── login/          # Login form
│       │   ├── register/       # Registration form
│       │   ├── profile/        # User profile
│       │   ├── delivery_info/  # Shipping address
│       │   ├── order/          # Order history
│       │   └── Trails/         # Trail search & detail (map, AI advisor)
│       └── shared/             # Shared components
│           ├── header/         # Navigation header
│           ├── footer/         # Footer with newsletter
│           ├── checkout/       # Stripe checkout flow
│           └── ...
├── server/                     # Express backend
│   ├── index.js                # Server entry point
│   ├── config/                 # Database, JWT, Resend config
│   ├── middlewares/            # Auth middleware
│   ├── controllers/            # Route handlers
│   ├── routes/                 # Express route definitions
│   └── services/               # Business logic (cart, wishlist, orders)
├── prisma/                     # Database layer
│   ├── schema.prisma           # Data model (8 tables)
│   ├── seed.js                 # Product data seeder
│   └── migrations/             # Database migrations
├── public/json/                # Static seed data
├── vercel.json                 # Vercel deployment config
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **pnpm** (recommended) or npm
- A **PostgreSQL** database (Neon serverless works great)

### 1. Clone & Install

```bash
git clone https://github.com/your-username/trailblaze.git
cd trailblaze
npm install
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL=postgresql://...

# Server
PORT=4996

# Auth
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# APIs
PEXELS_API_KEY=your-pexels-key
ANTHROPIC_API_KEY=your-anthropic-key
ORS_API_KEY=your-openrouteservice-key
RESEND_API_KEY=your-resend-key

# Deployment URLs
VITE_VERCEL_URL=https://hiking-ecommerce.vercel.app
VITE_RENDER_URL=https://trailblaze-blr0.onrender.com
```

### 3. Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Seed product data
node prisma/seed.js
```

### 4. Run in Development

```bash
npm run dev
```

This starts both the Vite dev server (frontend) and Express server (backend) concurrently:
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:4996](http://localhost:4996)

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start frontend + backend concurrently (development) |
| `npm run server` | Start Express API server with file watching |
| `npm run build` | Build frontend for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Lint the codebase |

---

## 🌐 Deployment

### Frontend (Vercel)

The frontend is deployed on Vercel with SPA rewrite rules (`vercel.json`). Every push to the main branch triggers an automatic redeploy.

**Production URL:** [https://hiking-ecommerce.vercel.app/](https://hiking-ecommerce.vercel.app/)

### Backend (Render)

The Express API server runs on Render. The backend URL is configured via `VITE_RENDER_URL` in the `.env` file.

**Backend URL:** [https://trailblaze-blr0.onrender.com/](https://trailblaze-blr0.onrender.com/)

---

## 🗄️ Database Schema

The Prisma schema defines 8 models:

| Model | Description |
|---|---|
| **User** | Account info, email verification, password |
| **Product** | Title, price, sizes, categories, images, details |
| **Cart** | One per user, contains CartItems |
| **CartItem** | Product + size + color + quantities |
| **Wishlist** | One per user, contains WishlistItems |
| **WishlistItem** | Saved products with details |
| **Order** | Purchase with status, payment, delivery address |
| **OrderItem** | Individual items within an order |
| **DeliveryAddress** | Saved shipping addresses per user |

---

## 🧪 API Overview

All API routes are prefixed with `/api`.

| Route | Purpose | Auth |
|---|---|---|
| `GET /api/products` | List all products | ✗ |
| `GET /api/products/:id` | Product details | ✗ |
| `POST /api/user/register` | Create account | ✗ |
| `POST /api/user/login` | Log in | ✗ |
| `POST /api/user/logout` | Log out | ✓ |
| `GET /api/user/profile` | Get profile | ✓ |
| `PUT /api/user/profile` | Update profile | ✓ |
| `GET /api/cart` | Get cart items | ✓ |
| `POST /api/cart/add` | Add to cart | ✓ |
| `DELETE /api/cart/:id` | Remove from cart | ✓ |
| `POST /api/cart/moveToWishlist` | Move item to wishlist | ✓ |
| `GET /api/wishlist` | Get wishlist | ✓ |
| `POST /api/wishlist/moveToCart` | Move item to cart | ✓ |
| `POST /api/checkout` | Create payment intent (Stripe) | ✓ |
| `GET /api/orders` | List orders | ✓ |
| `POST /api/orders/confirm` | Confirm payment & create order | ✓ |
| `GET /api/overpass/query` | Search hiking trails | ✗ |
| `GET /api/ors/directions` | Get hiking route directions | ✗ |
| `GET /api/open-meteo/forecast` | Weather forecast | ✗ |
| `POST /api/ai/suggest` | AI gear recommendation | ✗ |
| `GET /api/pexels/search` | Trail stock photos | ✗ |

---

## 🤖 AI Gear Recommendation Flow

1. User searches for a hiking trail.
2. Trail location is resolved via Nominatim geocoding.
3. Trail data is fetched from Overpass API (OpenStreetMap).
4. Route polyline is generated via OpenRouteService.
5. Weather forecast is retrieved from Open-Meteo for the chosen date.
6. User clicks **"Get AI Suggestion"** .
7. Claude (Anthropic) receives the trail difficulty, weather data, and product catalog — then recommends suitable clothing (top, bottom) from the store's inventory.

---

## 🎨 Design & Styling

- **Responsive breakpoints:** Desktop (1921px+), Laptop (1367px+), Tablet (769px+), Mobile (361px+).
- **Animations:** Fade-in, slide-in, hover effects throughout the UI.
- **Theme:** Light mode via DaisyUI's light theme.
- **Header:** Sticky, transparent→white on scroll, with search bar and mobile hamburger menu.

---

## 🧑‍💻 Author

**Denys Herzhyk**  
📧 denis.herzhyk@gmail.com  

Built as a university project at Ruse University, Ruse, Bulgaria.

---

## 📄 License

This project is for educational purposes.
