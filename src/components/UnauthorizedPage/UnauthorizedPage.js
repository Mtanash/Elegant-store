import { Box, Container, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        sx={{
          height: "calc(100vh - 124px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" component="h2" color="error" gutterBottom>
          Not Authorized
        </Typography>
        <Typography variant="h4" component="h3" align="center">
          You do not have access to the requested page.
        </Typography>
        <Link
          sx={{ paddingTop: "25px" }}
          component="button"
          variant="body1"
          onClick={() => navigate(-1)}
        >
          Go back
        </Link>
      </Box>
    </Container>
  );
};

export default UnauthorizedPage;
