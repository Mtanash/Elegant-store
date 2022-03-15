import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  CardActionArea,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";

import { truncateString } from "../../utils";

import { useNavigate } from "react-router-dom";

const ProductCard = ({
  description,
  quantity,
  price,
  imageUrl,
  _id,
  loading,
  onRemoveButtonClicked,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      key={_id}
      sx={{ display: "flex", paddingRight: "10px", marginBottom: "15px" }}
      raised
    >
      <CardActionArea
        sx={{ display: "flex" }}
        onClick={() => navigate(`/product/${_id}`)}
      >
        <CardMedia
          component="img"
          src={imageUrl}
          alt={description}
          sx={{ width: "100px", height: "100px" }}
        />
        <CardContent sx={{ flex: "1" }}>
          <Typography variant="h6">
            {truncateString(description, 50)}
          </Typography>
          <Divider />
          {quantity && <Typography variant="body2">Qty: {quantity}</Typography>}
          <Typography variant="body2">Price: ${price}</Typography>
        </CardContent>
      </CardActionArea>
      <LoadingButton
        sx={{ alignSelf: "center" }}
        variant="outlined"
        startIcon={<DeleteIcon />}
        loading={loading}
        onClick={onRemoveButtonClicked}
      >
        Remove
      </LoadingButton>
    </Card>
  );
};

export default ProductCard;
