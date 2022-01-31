import { TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import "../../css/AddProductForm/AddProductForm.css";
import { createProduct } from "../../features/products/productsSlice";

const initialFormData = {
  title: "",
  description: "",
  price: "",
  imageUrl: "",
};

const AddProductForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const onFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(createProduct(formData))
      .unwrap()
      .then((res) => {
        setFormData(initialFormData);
        setLoading(false);
      });
  };

  return (
    <div className="addProductForm">
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Add new product
      </Typography>
      <form onSubmit={onFormSubmit}>
        <TextField
          required
          fullWidth
          type="text"
          label="Title"
          name="title"
          value={formData.title}
          onChange={onFormDataChange}
        />
        <TextField
          required
          fullWidth
          multiline
          type="text"
          label="Description"
          name="description"
          minRows={3}
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
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setFormData({ ...formData, imageUrl: base64 })
            }
          />
        </div>
        <LoadingButton variant="contained" type="submit" loading={loading}>
          Add product
        </LoadingButton>
      </form>
    </div>
  );
};

export default AddProductForm;
