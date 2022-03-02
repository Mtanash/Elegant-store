import { Input, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useState } from "react";
import { createProduct } from "../../features/products/productsSlice";

import { useDispatch } from "react-redux";

import "../../css/AddProductForm/AddProductForm.css";
import { publicAxios } from "../../api/axios";
import { getImageUploadUrl, addProductImageUrl } from "../../api/productsApi";
import Resizer from "react-image-file-resizer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const initialFormData = {
  description: "",
  price: "",
  featured: false,
};

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const onFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const uploadProductImage = async (imageName) => {
      try {
        const response = await getImageUploadUrl(imageName);
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

    setLoading(true);
    dispatch(createProduct(formData))
      .unwrap()
      .then(async (res) => {
        const productId = res._id;
        const imageUrl = await uploadProductImage(productId);
        await addProductImageUrl({ productId, imageUrl });
        setFormData(initialFormData);
        setLoading(false);
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
