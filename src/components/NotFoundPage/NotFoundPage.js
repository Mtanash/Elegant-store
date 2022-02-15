import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
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
          Page Not Found
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate("/")}>
          Go to homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
