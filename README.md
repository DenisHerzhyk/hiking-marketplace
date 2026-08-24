Readme · MD

# 🏔️ TrailBlaze — Hiking E-Commerce

> **Live demo:** [hiking-ecommerce.vercel.app](https://hiking-ecommerce.vercel.app/)

TrailBlaze is a full-stack hiking e-commerce platform that blends outdoor gear shopping with hiking trail discovery. Users can browse and buy gear, search real hiking trails, view interactive maps, check weather forecasts, and get AI-powered gear recommendations for a specific trail and date.

---

## ✨ Features

**E-Commerce**

- Product catalog with filtering by category, size, price, and gender
- Product detail pages with size/color selectors and size guide
- Cart, wishlist, and Stripe checkout
- Order tracking with live status updates
  **Trail Discovery**
- Search trails by city, park, or region (OpenStreetMap / Overpass API)
- Interactive Leaflet maps with route, elevation, and difficulty
- Quick-search presets (Swiss Alps, Black Forest, Dolomites, Pyrenees)
  **AI Gear Advisor**
- Powered by Claude (Anthropic)
- Recommends gear from the store's inventory based on trail difficulty and weather forecast
  **Admin Page**
- Internal dashboard for managing inventory
- View all products with per-size stock levels
- Increase or decrease stock per size
- Remove a size entirely from a product
  **User System**
- JWT auth via httpOnly cookies, email verification (Resend)
- Profile management, protected/guest-only routes

---

## 🧰 Tech Stack

**Frontend:** React 19, Vite 7, TypeScript, React Router 7, Tailwind CSS 4, DaisyUI 5, Leaflet, Stripe, react-hot-toast

**Backend:** Node.js / Express 5, Prisma 7 (PostgreSQL via Neon), JWT + bcrypt, Stripe, Anthropic SDK, Resend, Nodemon

**External APIs:** Open-Meteo (weather), OpenRouteService (routing), Overpass API + Nominatim (trails/geocoding), Pexels (photos), Cloudinary (media hosting)

**Infrastructure:** Vercel (frontend), Render (backend), pnpm, Concurrently

---

## 📁 Project Structure

```
├── client/                     # React frontend
│   └── src/
│       ├── pages/              # home, category, product_page, cart, login,
│       │                       # register, profile, order, Trails, admin
│       └── shared/             # header, footer, checkout, shared components
├── server/                     # Express backend
│   ├── config/                 # database, JWT, Resend config
│   ├── middlewares/            # auth middleware
│   ├── controllers/            # route handlers
│   ├── routes/                 # route definitions
│   └── services/               # business logic (cart, wishlist, orders, stock)
├── prisma/                     # schema, seed data, migrations
└── public/json/                # static seed data
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm (recommended) or npm
- A PostgreSQL database (Neon works great)

### Setup

```bash
git clone https://github.com/your-username/trailblaze.git
cd trailblaze
npm install
```

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://...
PORT=4996

JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

VITE_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

PEXELS_API_KEY=your-pexels-key
ANTHROPIC_API_KEY=your-anthropic-key
ORS_API_KEY=your-openrouteservice-key
RESEND_API_KEY=your-resend-key

VITE_VERCEL_URL=https://hiking-ecommerce.vercel.app
VITE_RENDER_URL=https://trailblaze-blr0.onrender.com
```

```bash
npx prisma migrate dev
node prisma/seed.js
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4996

### Scripts

| Script            | Description                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start frontend + backend together (development) |
| `npm run server`  | Start Express API with file watching            |
| `npm run build`   | Build frontend for production                   |
| `npm run preview` | Preview production build locally                |
| `npm run lint`    | Lint the codebase                               |

---

## 🌐 Deployment

- **Frontend (Vercel):** [hiking-ecommerce.vercel.app](https://hiking-ecommerce.vercel.app/) — auto-deploys on push to main
- **Backend (Render):** [trailblaze-blr0.onrender.com](https://trailblaze-blr0.onrender.com/)

---

## 🗄️ Database Schema

| Model                       | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| **User**                    | Account info, email verification, password              |
| **Product**                 | Title, price, sizes, stock, categories, images, details |
| **Cart / CartItem**         | User's cart and its items                               |
| **Wishlist / WishlistItem** | Saved products                                          |
| **Order / OrderItem**       | Purchases and their line items                          |
| **DeliveryAddress**         | Saved shipping addresses per user                       |

---

## 🧪 API Overview

All routes are prefixed with `/api`.

| Route                                   | Purpose                        | Auth      |
| --------------------------------------- | ------------------------------ | --------- |
| `GET /products`                         | List all products              | ✗         |
| `GET /products/:id`                     | Product details                | ✗         |
| `POST /user/register`                   | Create account                 | ✗         |
| `POST /user/login`                      | Log in                         | ✗         |
| `POST /user/logout`                     | Log out                        | ✓         |
| `GET /user/profile`                     | Get profile                    | ✓         |
| `PUT /user/profile`                     | Update profile                 | ✓         |
| `GET /cart`                             | Get cart items                 | ✓         |
| `POST /cart/add`                        | Add to cart                    | ✓         |
| `DELETE /cart/:id`                      | Remove from cart               | ✓         |
| `POST /cart/moveToWishlist`             | Move item to wishlist          | ✓         |
| `GET /wishlist`                         | Get wishlist                   | ✓         |
| `POST /wishlist/moveToCart`             | Move item to cart              | ✓         |
| `POST /checkout`                        | Create payment intent (Stripe) | ✓         |
| `GET /orders`                           | List orders                    | ✓         |
| `POST /orders/confirm`                  | Confirm payment & create order | ✓         |
| `GET /overpass/query`                   | Search hiking trails           | ✗         |
| `GET /ors/directions`                   | Get hiking route directions    | ✗         |
| `GET /open-meteo/forecast`              | Weather forecast               | ✗         |
| `POST /ai/suggest`                      | AI gear recommendation         | ✗         |
| `GET /pexels/search`                    | Trail stock photos             | ✗         |
| `PUT /admin/add/:productId`             | Increase stock for a size      | ✓ (admin) |
| `PUT /admin/decrease/:productId`        | Decrease stock for a size      | ✓ (admin) |
| `DELETE /admin/remove/:productId/:size` | Remove a size from a product   | ✓ (admin) |

---

## 🤖 AI Gear Recommendation Flow

1. User searches for a trail → resolved via Nominatim geocoding.
2. Trail data fetched from Overpass API; route generated via OpenRouteService.
3. Weather forecast pulled from Open-Meteo for the chosen date.
4. On "Get AI Suggestion," Claude receives trail difficulty, weather, and the product catalog, and recommends gear from inventory.

---

## 🎨 Design & Styling

Responsive from mobile (361px+) to desktop (1921px+). Light theme via DaisyUI, with fade-in/slide-in animations and a sticky header that transitions from transparent to white on scroll.

---

## 🧑‍💻 Author

**Denys Herzhyk**
📧 denis.herzhyk@gmail.com

Built as a university project at Ruse University, Ruse, Bulgaria.
