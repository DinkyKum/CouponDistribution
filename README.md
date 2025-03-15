# Overview
It is a coupon distribution system that ensures fair and efficient coupon allocation using round-robin logic while tracking users via IP and cookies to prevent misuse.

# Features
- The website is deployed on Vercel. This is the link for the same- https://coupon-distribution-tau.vercel.app/
- The main page has two buttons.
- View Available Coupons – Displays a list of coupons.
- Claim Coupon – Allows users to claim a coupon.
- Four dummy coupons are pre-created for simplicity.
- Users can view the list of coupons before claiming.
- A user can claim only one coupon every 10 minutes.
- If a user tries to claim a coupon before 10 minutes, they receive a waiting time message.
- Upon successful coupon claim, the user receives a confirmation message.
- The backend includes a coupon creation API for admin purposes, but it is not exposed on the frontend for security reasons.

# Tech Stack
- Frontend: React.js, Tailwind CSS, DaisyUI
- Backend: Node.js, Express.js
- Database: MongoDB

# Setup Instructions
1. Clone the Repo
```
git clone https://github.com/DinkyKum/CouponDistribution.git  
cd CouponDistribution
```

3. Setup & Start Backend
```
cd Backend    
npm install    
npm run dev
```

3. Setup & Start Frontend
```
cd ../Frontend    
npm install    
npm run dev
```

# API Workflow
- User sends a request to /claim API.
- MongoDB session starts to maintain atomic operations.
- User's IP address is fetched.
- Last claim time is checked via cookies.
- Wait time is calculated.
- If claimed within 10 minutes, user must wait.
- Otherwise, a coupon is assigned.
- Coupon is assigned using Round Robin.
- Finds last assigned coupon using `lastAssignedAt` attribute.
- Next coupon in sequence is selected and assigned.
- User’s IP is stored in the assigned coupon's database entry.
- Cookie is updated to track the claim time of the user.

