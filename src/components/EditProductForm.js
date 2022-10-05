import { useState } from "react";
import { categoriesObj } from "../constants";
import { useUpdateProductMutation } from "../features/api/productsApiSlice";
import useErrorHandler from "../hooks/useErrorHandler";
import { successToast } from "../toast/toasts";
import LoadingButton from "./LoadingButton";

const EditProductForm = ({ handleCloseModal, productToEdit }) => {
  const [editProductForm, setEditProductForm] = useState(productToEdit);

  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();

  const { handleError } = useErrorHandler();

  const handleEditProductFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId: editProductForm._id,
        productData: editProductForm,
      }).unwrap();

      setEditProductForm({});
      handleCloseModal();

      successToast("Product updated successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const handleEditProductFormChange = (e) => {
    if (
      e.target.name === "price" ||
      e.target.name === "stock" ||
      e.target.name === "priceAfterDiscount"
    ) {
      setEditProductForm({
        ...editProductForm,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setEditProductForm({
        ...editProductForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <form onSubmit={handleEditProductFormSubmit}>
      <div className="flex flex-col items-start gap-1 w-full">
        <label className="text-lg font-semibold" htmlFor="descriptionField">
          Description
        </label>
        <textarea
          className=" block w-full h-40 px-3 py-1.5 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors"
          id="descriptionField"
          name="description"
          placeholder="Product Description"
          value={editProductForm?.description}
          onChange={handleEditProductFormChange}
          required
        ></textarea>
      </div>
      <div className="flex flex-col items-start gap-1 w-full">
        <label className="text-lg font-semibold" htmlFor="selectField">
          Category
        </label>
        <select
          className=" block px-2 py-3 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors cursor-pointer "
          name="category"
          id="selectField"
          value={editProductForm?.category}
          onChange={handleEditProductFormChange}
          required
        >
          {Object.values(categoriesObj).map((category) => (
            <option className="cursor-pointer" key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-start gap-1 w-full">
        <label className="font-semibold" htmlFor="price">
          Price
        </label>
        <input
          className=" block w-full p-2 py-3 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors"
          id="price"
          type="number"
          name="price"
          value={editProductForm.price}
          onChange={handleEditProductFormChange}
          required
        />
      </div>
      {editProductForm?.priceAfterDiscount && (
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="font-semibold" htmlFor="priceAfterDiscount">
            Price after discount
          </label>
          <input
            className=" block w-full p-2 py-3 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors"
            id="priceAfterDiscount"
            type="number"
            name="priceAfterDiscount"
            value={editProductForm.priceAfterDiscount}
            onChange={handleEditProductFormChange}
            required
          />
        </div>
      )}
      <div className="flex flex-col items-start gap-1 w-full">
        <label className="font-semibold" htmlFor="Stock">
          Stock
        </label>
        <input
          className=" block w-full p-2 py-3 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors"
          id="Stock"
          type="number"
          name="stock"
          value={editProductForm.stock}
          onChange={handleEditProductFormChange}
          required
        />
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="checkboxField"
          className="cursor-pointer w-4 h-4"
          checked={editProductForm.featured}
          onChange={(e) =>
            setEditProductForm({
              ...editProductForm,
              featured: e.target.checked,
            })
          }
        />
        <label className="cursor-pointer font-semibold" htmlFor="checkboxField">
          Featured
        </label>
      </div>
      <LoadingButton
        loading={updateProductLoading}
        text="Save product"
        submit
        className="bg-deep-orange"
      />
    </form>
  );
};

export default EditProductForm;
