import { Paper, Typography, Link } from "@mui/material";

const Deposits = ({ totalDeposits }) => {
  return (
    <div className="shadow-special p-2 h-full ">
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Deposits
      </Typography>
      <Typography component="h3" variant="h4">
        ${totalDeposits}.00
      </Typography>
      <Typography
        component="h3"
        variant="subtitle1"
        gutterBottom
        sx={{ color: "#333" }}
      >
        on 12 March, 2021
      </Typography>
      <Link
        sx={{ paddingTop: "25px" }}
        component="button"
        variant="body2"
        onClick={() => {
          console.info("I'm a button.");
        }}
      >
        View balance
      </Link>
    </div>
  );
};

export default Deposits;
