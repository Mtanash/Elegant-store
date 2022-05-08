import Price from "../Price/Price";
import Rates from "../Rates/Rates";

const ProductFullDetails = ({ product }) => {
  return (
    <>
      <div className="h-[400px] basis-56 grid items-start col-start-1 col-end-2 row-start-1 row-end-2 overflow-hidden">
        <img src={product?.imageUrl} alt={product?.description} />
      </div>

      <div className="col-start-1 col-end-2 row-start-2 row-end-3 md:col-start-2 md:col-end-3  md:row-start-1 md:row-end-2">
        <p className="text-lg font-semibold mb-2">{product?.description}</p>
        <Rates rates={product?.rates} />
        <hr className="text-pale-white" />
        <Price
          price={product.price}
          priceAfterDiscount={product?.priceAfterDiscount}
        />
        <p className="text-sm my-2">All prices include VAT.</p>
        <hr className="text-pale-white" />
        <h4 className=" text-lg font-semibold mb-1">Details</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          veniam ipsam cum tenetur quia modi debitis cumque tenetur quia modi
          debitis cumque.
        </p>
      </div>
    </>
  );
};

export default ProductFullDetails;
