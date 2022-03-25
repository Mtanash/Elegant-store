import { Input, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, useContext } from "react";
import Resizer from "react-image-file-resizer";
import "../../css/AddProductForm/AddProductForm.css";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import { publicAxios } from "../../api/axios";
import SnackbarContext from "../../context/SnackbarContext";

const initialFormData = {
  description: "",
  price: "",
  stock: "1",
  featured: false,
};

const AddProductForm = () => {
  const { openSnackbar } = useContext(SnackbarContext);
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const privateAxios = usePrivateAxios();
  const [loading, setLoading] = useState(false);

  const onFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

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
    <div className="addProductForm">
      <Typography
        variant="h4"
        component="h2"
        color="primary"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Add new product
      </Typography>
      <form onSubmit={onFormSubmit}>
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
        <TextField
          required
          fullWidth
          type="number"
          label="Price"
          name="price"
          value={formData.price}
          onChange={onFormDataChange}
        />
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
    </div>
  );
};

export default AddProductForm;
