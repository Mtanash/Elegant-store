import {
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductCard = ({
  description,
  quantity,
  price,
  imageUrl,
  _id,
  onRemoveButtonClicked,
}) => {
  return (
    <Card
      key={_id}
      sx={{ display: "flex", paddingRight: "10px", marginBottom: "15px" }}
      raised
    >
      <CardMedia
        component="img"
        src={imageUrl}
        alt={description}
        sx={{ width: "100px", height: "100px" }}
      />
      <CardContent sx={{ flex: "1" }}>
        <Typography variant="body2">Qty: {quantity}</Typography>
        <Typography variant="body2">Price: ${price}</Typography>
      </CardContent>
      <Button
        sx={{ alignSelf: "center" }}
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={() => onRemoveButtonClicked(_id)}
      >
        Remove
      </Button>
    </Card>
  );
};

export default ProductCard;
