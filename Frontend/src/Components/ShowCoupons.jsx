const ShowCoupons = ({ coupons, showCoupons }) => {
    if (!showCoupons) return null; // Don't render if hidden
  
    return (
      <div className="w-full flex justify-center mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
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
      </div>
    );
  };
  
  export default ShowCoupons;
  