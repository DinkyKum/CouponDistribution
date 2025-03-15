import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ClaimCouponButton = () => {
  const [claimedCoupon, setClaimedCoupon] = useState(null);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const claimCoupon = async () => {
    try {
      const response = await axios.post(BASE_URL + "/claim", {}, { withCredentials: true });
      setClaimedCoupon(response.data.coupon);
      setMessage(`Coupon claimed: ${response.data.coupon.code}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to claim coupon");
    }

    // Show toast
    setShowToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
      setMessage("");
    }, 3000);
  };

  return (
    <div className="relative text-white">
      {/* Toast with margin below navbar */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-700 text-white text-sm px-6 py-3 rounded-lg shadow-lg opacity-90 transition-all">
          {message}
        </div>
      )}

      {/* Flexbox container to align buttons */}
      <div className="flex justify-center space-x-4">
        <button 
          onClick={claimCoupon}
          className="bg-blue-600 hover:bg-blue-500 text-lg text-white font-bold py-4 px-4 rounded transition-all"
        >
          Claim Coupon
        </button>
      </div>

      {/* Claimed Coupon Info */}
      {claimedCoupon && (
        <p className="mt-4 p-2 bg-green-900 rounded text-center">
          Claimed: {claimedCoupon.code} {claimedCoupon.name}
        </p>
      )}
    </div>
  );
};

export default ClaimCouponButton;
