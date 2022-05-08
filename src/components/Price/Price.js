const Price = ({ price, priceAfterDiscount, center }) => {
  const discount = Math.floor(((price - priceAfterDiscount) / price) * 100);
  return (
    <div className={`flex h-14 ${center ? "justify-center" : "justify-start"}`}>
      {priceAfterDiscount ? (
        <div
          className={`flex flex-col justify-center ${
            center ? "items-center" : "items-start"
          }`}
        >
          <div className="flex items-center gap-1">
            EGP
            <p className="text-xl font-semibold">{priceAfterDiscount}.00</p>
          </div>
          <div className="flex items-center gap-[10px]">
            <p className="line-through text-sm">EGP {price}.00</p>
            <p
              className="text-sm font-medium text-green"
              sx={{ fontSize: ".9rem", fontWeight: "500", color: "green" }}
            >
              {discount}% OFF
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          EGP
          <p className="text-xl font-semibold">{price}.00</p>
        </div>
      )}
    </div>
  );
};

export default Price;
