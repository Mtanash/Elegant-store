const Price = ({ price, priceAfterDiscount, center }) => {
  const discount = Math.floor(((price - priceAfterDiscount) / price) * 100);
  return (
    <div
      className={`flex h-14 ${
        center ? "justify-center" : "justify-start"
      } py-1`}
    >
      {priceAfterDiscount ? (
        <div
          className={`flex flex-col justify-center ${
            center ? "items-center" : "items-start"
          }`}
        >
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <p className="text-xs">EGP</p>
              <p className="text-xl font-semibold">
                {priceAfterDiscount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <p className="line-through text-sm">EGP {price.toFixed(2)}</p>
            <p
              className="text-sm font-medium text-green"
              sx={{ fontSize: ".9rem", fontWeight: "500", color: "green" }}
            >
              {discount}% OFF
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-1">
          <p className="text-xs">EGP</p>
          <p className="text-xl font-semibold">{price.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Price;
