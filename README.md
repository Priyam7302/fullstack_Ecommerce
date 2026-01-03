# FullStack E-Commerce Application

A modern, full-stack e-commerce platform built with Node.js, Express, React, and MongoDB. This application provides a complete shopping experience with user authentication, product management, and a shopping cart system.

## 📋 Project Overview

This is a production-ready e-commerce application featuring:

- **User Authentication**: Secure login and registration with JWT tokens
- **Admin Dashboard**: Product management and admin controls
- **Product Catalog**: Browse and view product details
- **Shopping Cart**: Add/remove items and manage quantities
- **Payment Integration**: Checkout functionality
- **Role-Based Access**: Separate user and admin interfaces

## 📁 Project Structure

```
FullStackLearning/Node/
├── backend/                 # Express.js server
│   ├── controllers/        # Business logic controllers
│   │   ├── Admin.js
│   │   ├── Auth.js
│   │   ├── Cart.js
│   │   ├── Product.js
│   │   └── controller.js
│   ├── db/                 # Database connection
│   │   └── connect.js
│   ├── middlewares/        # Custom middleware
│   │   └── Auth.js
│   ├── models/             # Mongoose schemas
│   │   ├── Auth.js
│   │   ├── Cart.js
│   │   └── ProductModel.js
│   ├── routes/             # API endpoints
│   │   ├── Admin.js
│   │   ├── Auth.js
│   │   ├── Cart.js
│   │   ├── Check.js
│   │   ├── productRouter.js
│   │   └── router.js
│   ├── uploads/            # File uploads storage
│   ├── index.js            # Server entry point
│   ├── httpServer.js
│   ├── data.js
│   ├── sum.js
│   └── package.json
│
└── frontend/               # React + Vite application
    ├── src/
    │   ├── admin/         # Admin panel pages
    │   │   ├── pages/
    │   │   │   ├── AdminLogin.jsx
    │   │   │   ├── AdminHome.jsx
    │   │   │   └── AddProduct.jsx
    │   │   └── components/
    │   │       └── ProtectedRouters.jsx
    │   ├── pages/         # User-facing pages
    │   │   ├── First.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Product.jsx
    │   │   ├── SingleProduct.jsx
    │   │   └── Cart.jsx
    │   ├── components/    # Reusable components
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   └── ProductCard.jsx
    │   ├── contexts/      # React context providers
    │   │   ├── AuthProvider.jsx
    │   │   └── CartProvider.jsx
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   ├── index.css
    │   └── axiosConfig.js
    ├── public/
    ├── vite.config.js
    ├── eslint.config.js
    ├── package.json
    └── index.html
```

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose (v9.0.1)
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer
- **Utilities**: CORS, Cookie Parser, dotenv

### Frontend

- **Library**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM (v7.10.1)
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Linting**: ESLint
- **Styling**: CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```env
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the development server:

```bash
npm run dev
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication Routes (`/user`)

- `POST /user/login` - User login
- `POST /user/register` - User registration
- `POST /user/logout` - User logout

### Products (`/product`)

- `GET /product` - Get all products
- `GET /product/:id` - Get single product
- `POST /product` - Create product (admin)
- `PUT /product/:id` - Update product (admin)
- `DELETE /product/:id` - Delete product (admin)

### Admin (`/admin`)

- `POST /admin/login` - Admin login
- `GET /admin/products` - Get all products for admin
- `POST /admin/product` - Create new product
- `PUT /admin/product/:id` - Update product
- `DELETE /admin/product/:id` - Delete product

### Cart (`/cart`)

- `GET /cart` - Get user's cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item quantity
- `DELETE /cart/remove/:id` - Remove item from cart

### Check (`/check`)

- Various utility endpoints

### Files (`/uploads`)

- Static file serving for uploads

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:

- Tokens are stored in HTTP-only cookies
- User and admin roles are differentiated
- Protected routes require valid authentication tokens
- Admin routes are protected by `ProtectedRouters` component

## 📦 Key Features

### User Features

- ✅ User registration and login
- ✅ Browse product catalog
- ✅ View product details
- ✅ Add products to cart
- ✅ Manage shopping cart
- ✅ User profile

### Admin Features

- ✅ Admin login
- ✅ Add new products
- ✅ Edit product details
- ✅ Delete products
- ✅ View all products
- ✅ Upload product images

## 🎨 Frontend Components

- **Header**: Navigation and user menu
- **Footer**: Site footer
- **ProductCard**: Individual product display component
- **ProtectedRouters**: Route protection wrapper for admin pages
- **AuthProvider**: Authentication context provider
- **CartProvider**: Shopping cart state management

## 📝 Database Models

### User Model

- Email
- Password (hashed with bcryptjs)
- Full name
- Role (user/admin)

### Product Model

- Name
- Description
- Price
- Category
- Image
- Quantity in stock
- Slug

### Cart Model

- User ID
- Product ID
- Quantity
- Added date

## 🔄 Development Workflow

### Backend Development

```bash
cd backend
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm run dev  # Runs Vite dev server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## 📄 Environment Variables

### Backend (.env)

```
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
PORT=3000
```

### Frontend (.env - optional)

```
VITE_API_URL=http://localhost:3000
```

## 🐛 Debugging

- Backend logs are printed to the console
- Frontend errors appear in browser console
- Use MongoDB Compass to inspect database
- Check network tab in browser DevTools for API requests

## 📦 Scripts

### Backend

- `npm run dev` - Start development server with nodemon

### Frontend

- `npm run dev` - Start Vite dev server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

## 🚢 Deployment

### Backend Deployment

1. Build the application
2. Set environment variables on hosting platform
3. Deploy to platforms like:
   - Heroku
   - Render
   - Railway
   - AWS

### Frontend Deployment

1. Run `npm run build` to create optimized build
2. Deploy the `dist` folder to:
   - Vercel
   - Netlify
   - AWS S3
   - GitHub Pages

## 🤝 Contributing

This is a learning project. Feel free to modify and improve the codebase!

## 📚 Learning Goals

This project demonstrates:

- Full-stack development with Node.js and React
- Express.js REST API design
- MongoDB database operations
- JWT authentication implementation
- Context API for state management
- Component-based architecture
- Form handling and validation
- File uploads with Multer
- CORS and security best practices

## 📞 Support

For issues or questions, check:

- Browser console for frontend errors
- Server logs for backend errors
- MongoDB connection status
- Environment variable configuration



**Happy Coding!** 🚀
