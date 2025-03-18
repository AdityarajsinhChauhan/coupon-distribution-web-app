**Coupon Distribution Web App**

**Overview**
The Coupon Distribution Web App is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to claim coupons, while an admin can manage coupons through an admin panel.

**Tech Stack Used**
Frontend: React.js (Vite), Tailwind CSS, Axios
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Hosting: Vercel (Frontend & Backend)


**Project Structure**
Frontend (React + Vite)
The frontend folder contains the following structure:
•	src/pages/ contains Home Page and Admin Page.
•	src/components/ contains reusable components for UI.
•	src/api/ contains API requests using Axios.
•	.env stores required environment variables.

**Backend (Node.js + Express.js)**
The backend folder contains the following structure:
•	index.js is the entry point for the server.
•	models/ contains Mongoose schemas for coupons and claims.
•	routes/ contains different route handlers. 
o	adminRoutes.js manages admin actions such as login, logout, fetching coupons, and fetching claims.
o	couponRoutes.js for managing user action like claiming coupon
o	claimRoutes.js handles coupon availability and eligibility of users.
•	.env stores the database connection string and JWT secret.



**Feature**s
User Features:
•	View available coupons.
•	Claim a coupon.
Admin Features:
•	Login and Logout using JWT Authentication.
•	Add Coupons.
•	Delete Coupons.
•	Fetch Claimed Coupons.
•	View All Coupons.

**Setup Instructions**
1.	Clone the Repository
git clone https://github.com/AdityarajsinhChauhan/coupon-distribution-web-app.git  
cd coupon-distribution-web-app

3.	Backend Setup (Node.js + Express)
cd backend  
npm install

Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
PORT = port on which backend will run
NODE_ENV = status of project deployment or development
FRONTEND_URL = url of your front end

Run the backend server:
node index.js  



3.	Frontend Setup (React + Vite)cd frontend  
npm install  
Create a .env file in the frontend folder and add:
VITE_BASE_URL=http://localhost:(port on which backend is running) or backend url of deployed app  
Run the frontend server:
npm run dev

**API Endpoints**
Admin Routes:
•	POST /api/admin/login - Admin login
•	POST /api/admin/logout - Admin logout
•	GET /api/admin/getcoupons - Fetch all coupons
•	GET /api/admin/getclaims - Fetch all claimed coupons
•	POST /api/admin/addcoupon - Add a new coupon
•	DELETE /api/admin/deleteCoupon/:id - Delete a coupon
•	PUT /api/admin/change/:id - Update coupon status

**User Routes:**
•	POST /api/claim - Claim a coupon

**Authentication (JWT & Cookies)**
When the admin logs in, a JWT token is set in an HTTP-only cookie. The token is used in protected routes like getcoupons and getclaims. The frontend uses withCredentials: true in Axios requests to include cookies.
