import {
  Input,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, useContext } from "react";
import Resizer from "react-image-file-resizer";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { publicAxios } from "../../api/axios";
import SnackbarContext from "../../context/SnackbarContext";
import MainPaper from "../custome material ui components/MainPaper";
import { categoriesObj } from "../../constants";

const initialFormData = {
  description: "",
  price: "",
  stock: "1",
  featured: false,
  category: categoriesObj.womenClothes,
};

const AddProductForm = () => {
  const { openSnackbar } = useContext(SnackbarContext);
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const privateAxios = usePrivateAxios();
  const [loading, setLoading] = useState(false);
  const [productHaveDiscount, setProductHaveDiscount] = useState(false);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");

  const onFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // if product have discount => add price after discount to formData obj
    if (productHaveDiscount) {
      Object.defineProperty(formData, "priceAfterDiscount", {
        value: priceAfterDiscount,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }

    const uploadProductImage = async (imageName) => {
      try {
        const response = await privateAxios.get(
          `/products/imageUploadUrl/${imageName}`
        );
        const uploadUrl = response?.data?.url;
        await publicAxios.put(uploadUrl, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const imageUrl = uploadUrl.split("?")[0];
        return imageUrl;
      } catch (err) {
        console.log(err?.response?.data);
      }
    };

    privateAxios.post("/products", { ...formData }).then(async (res) => {
      const productId = res?.data?._id;
      const imageUrl = await uploadProductImage(productId);
      try {
        await privateAxios.post("/products/image", { productId, imageUrl });
        setFormData(initialFormData);
        setLoading(false);
        openSnackbar("New Product added successfully");
      } catch (err) {
        console.log(err);
      }
    });
  };

  const onInputFileChange = (e) => {
    const uncompressedFile = e.target.files[0];
    Resizer.imageFileResizer(
      uncompressedFile,
      250,
      200,
      "PNG",
      100,
      0,
      (uri) => {
        setFile(uri);
      },
      "file",
      250,
      200
    );
  };

  return (
    <MainPaper elevation={3} sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        component="h2"
        color="primary"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Add new product
      </Typography>
      <form
        onSubmit={onFormSubmit}
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <TextField
          required
          fullWidth
          multiline
          type="text"
          label="Description"
          name="description"
          minRows={4}
          value={formData.description}
          onChange={onFormDataChange}
        />
        <FormControl fullWidth>
          <InputLabel id="category-select">Category</InputLabel>
          <Select
            labelId="category-select"
            value={formData.category}
            label="Category"
            name="category"
            onChange={onFormDataChange}
            required
          >
            {Object.values(categoriesObj).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox />}
          label="Product have discount"
          checked={productHaveDiscount}
          onChange={(e) => setProductHaveDiscount(e.target.checked)}
        />
        {productHaveDiscount ? (
          <>
            <TextField
              required
              fullWidth
              type="number"
              label="Price before discount"
              name="price"
              value={formData.price}
              onChange={onFormDataChange}
            />
            <TextField
              required
              fullWidth
              type="number"
              label="Price after discount"
              name="priceAfterDiscount"
              value={priceAfterDiscount}
              onChange={(e) => setPriceAfterDiscount(e.target.value)}
            />
          </>
        ) : (
          <TextField
            required
            fullWidth
            type="number"
            label="Price"
            name="price"
            value={formData.price}
            onChange={onFormDataChange}
          />
        )}
        <TextField
          required
          fullWidth
          type="number"
          label="Stock"
          name="stock"
          value={formData.stock}
          onChange={onFormDataChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Featured"
          checked={formData.featured}
          onChange={(e) =>
            setFormData({ ...formData, featured: e.target.checked })
          }
        />
        <Input
          type="file"
          inputProps={{ accept: ".png, .jpeg, .jpg" }}
          required
          onChange={onInputFileChange}
        />
        <LoadingButton variant="contained" type="submit" loading={loading}>
          Add product
        </LoadingButton>
      </form>
    </MainPaper>
  );
};

export default AddProductForm;
