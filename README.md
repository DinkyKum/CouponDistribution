# Overview
It is a coupon distribution system that ensures fair and efficient coupon allocation using round-robin logic while tracking users via IP and cookies to prevent misuse.

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

# Features
- Main API: /claim (POST request)
- Starts MongoDB session for consistency.
- Fetches user IP address and checks last claim time via cookies.
- Wait time logic: If the user claimed a coupon within 10 minutes, they must wait.
- Round-robin coupon assignment: Finds last assigned coupon using lastAssignedAt.
- Assigns the next coupon in sequence.
- Stores user IPs in each coupon entry.
- Cookies track last claim time to calculate wait period.

