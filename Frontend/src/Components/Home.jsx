import CouponListButton from "./CouponListButton";
import ClaimCouponButton from "./ClaimCouponButton";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold mt-16 mb-6">Coupon System</h1>
      
      <div className="grid grid-cols-2 w-full max-w-3xl gap-6">

        <CouponListButton />
        <ClaimCouponButton />
   
      </div>
    </div>
  );
};

export default Home;
