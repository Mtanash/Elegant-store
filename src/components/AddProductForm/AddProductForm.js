import { useState } from "react";
import Resizer from "react-image-file-resizer";
import { categoriesObj } from "../../constants";
import { useAddNewProductMutation } from "../../features/api/productsApiSlice";
import { errorToast, successToast } from "../../toast/toasts";
import LoadingButton from "../LoadingButton/LoadingButton";

const initialFormData = {
  description: "",
  price: "",
  stock: "1",
  featured: false,
  category: categoriesObj.womenClothes,
};

const AddProductForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState(null);
  const [productHaveDiscount, setProductHaveDiscount] = useState(false);
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");

  const [addNewProduct, { isLoading: addNewProductLoading }] =
    useAddNewProductMutation();

  const onFormDataChange = (e) => {
    if (e.target.name === "price" || e.target.name === "stock") {
      setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // if product have discount => add price after discount to formData obj
    if (productHaveDiscount) {
      Object.defineProperty(formData, "priceAfterDiscount", {
        value: parseInt(priceAfterDiscount),
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }

    try {
      const productFormData = new FormData();

      for (let key in formData) {
        productFormData.append(key, formData[key]);
      }

      productFormData.append("productImage", file);

      await addNewProduct(productFormData).unwrap();
      successToast("Product added successfully");

      setFormData(initialFormData);
    } catch (error) {
      console.log(error);
      errorToast(error.message);
    }
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
    <div className="shadow-special w-full h-full p-2">
      <h3 className="mb-2 font-bold text-3xl text-center">Add new product</h3>
      <form
        onSubmit={onFormSubmit}
        className="w-9/12 flex flex-col items-start gap-3 mx-auto"
      >
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-lg font-semibold" htmlFor="descriptionField">
            Description
          </label>
          <textarea
            className=" block w-full h-40 px-3 py-1.5 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors"
            id="descriptionField"
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={onFormDataChange}
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
            value={formData.category}
            onChange={onFormDataChange}
            required
          >
            {Object.values(categoriesObj).map((category) => (
              <option
                className="cursor-pointer"
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="checkboxField"
            className="cursor-pointer w-4 h-4"
            checked={productHaveDiscount}
            onChange={(e) => setProductHaveDiscount(e.target.checked)}
          />
          <label
            className="cursor-pointer font-semibold"
            htmlFor="checkboxField"
          >
            Product have discount
          </label>
        </div>
        {productHaveDiscount ? (
          <>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="font-semibold" htmlFor="priceBeforeDiscount">
                Price before discount
              </label>
              <input
                className=" block w-full p-2 py-3 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors"
                type="number"
                id="priceBeforeDiscount"
                name="price"
                value={formData.price}
                onChange={onFormDataChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="font-semibold" htmlFor="priceAfterDiscount">
                Price after discount
              </label>
              <input
                className=" block w-full p-2 py-3 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors"
                id="priceAfterDiscount"
                type="number"
                name="priceAfterDiscount"
                value={priceAfterDiscount}
                onChange={(e) => setPriceAfterDiscount(e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="font-semibold" htmlFor="price">
              Price
            </label>
            <input
              className=" block w-full p-2 py-3 text-base font-normal resize-none outline-none border-2 border-pale-grey rounded-md hover:border-deep-blue focus:border-blue border-opacity-50 transition-colors"
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={onFormDataChange}
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
            value={formData.stock}
            onChange={onFormDataChange}
            required
          />
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="checkboxField"
            className="cursor-pointer w-4 h-4"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({ ...formData, featured: e.target.checked })
            }
          />
          <label
            className="cursor-pointer font-semibold"
            htmlFor="checkboxField"
          >
            Featured
          </label>
        </div>

        <div className="flex gap-2 items-center">
          <label className="cursor-pointer font-semibold" htmlFor="image">
            Product image
          </label>
          <input
            type="file"
            id="image"
            onChange={onInputFileChange}
            accept=".png, .jpeg, .jpg"
            required
          />
        </div>
        <LoadingButton
          loading={addNewProductLoading}
          text="Add product"
          submit
          className="bg-deep-orange"
        />
      </form>
    </div>
  );
};

export default AddProductForm;
