import { Rating } from "@mui/material";

const Rates = ({ rates = [], center }) => {
  const { value: totalRatesValue } = rates.reduce(
    (a, b) => ({
      value: a.value + b.value,
    }),
    { value: 0 }
  );
  const totalRates = rates.length;
  const rate = Math.ceil(totalRatesValue / totalRates);

  return (
    <div
      className={`flex gap-1 items-center h-6 ${
        center ? "justify-center" : "justify-start"
      }`}
    >
      {rate > 0 && (
        <>
          <Rating size="small" name="read-only" value={rate} readOnly />
          <p className="font-medium">{totalRates}</p>
        </>
      )}
    </div>
  );
};

export default Rates;
