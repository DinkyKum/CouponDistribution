import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const CouponListButton = () => {
  const [coupons, setCoupons] = useState([]);
  const [showCoupons, setShowCoupons] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCoupons = async () => {
    if (!showCoupons) {
      try {
        const response = await axios.get(BASE_URL + "/view/coupons"); // Adjust API URL
        setCoupons(response.data);
        setShowCoupons(true);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load coupons");
      }
    } else {
      setShowCoupons(false);
    }
  };

  return (
    <div className="text-white text-center">
      {/* Toggle Button */}
      <button 
        onClick={fetchCoupons}
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold  text-lg py-4 px-4 rounded transition-all"
      >
        {showCoupons ? "Hide Coupons" : "View Coupons"}
      </button>

      {/* Coupon Cards */}
      {showCoupons && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-6">
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <div
                key={coupon.couponCode}
                className="bg-gray-900 text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold">{coupon.name}</h3>
                <p className="text-sm text-gray-400">Code: {coupon.couponCode}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No coupons available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponListButton;
