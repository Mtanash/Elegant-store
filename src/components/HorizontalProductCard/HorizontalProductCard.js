import { truncateString } from "../../utils";

import { useNavigate } from "react-router-dom";
import IconButton from "../IconButton/IconButton";
import { MdDelete } from "react-icons/md";

const HorizontalProductCard = ({
  description,
  quantity,
  price,
  priceAfterDiscount,
  imageUrl,
  _id,
  loading,
  onRemoveButtonClicked,
}) => {
  const navigate = useNavigate();
  return (
    <div
      key={_id}
      className="flex flex-wrap justify-center my-4 gap-4 border-b-2 border-pale-grey border-opacity-30 pb-4 w-full"
    >
      <div
        className="w-28 h-28 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${_id}`)}
      >
        <img src={imageUrl} alt={description} />
      </div>
      <div className="flex-1 basis-[55%]">
        <p
          className="text-lg font-semibold mb-2 max-w-[50ch] break-words cursor-pointer"
          onClick={() => navigate(`/product/${_id}`)}
        >
          {truncateString(description, 50)}
        </p>
        {quantity && <p className="font-semibold text-sm">Qty: {quantity}</p>}
        <p className="font-semibold">
          Price: ${priceAfterDiscount ? priceAfterDiscount : price}
        </p>
      </div>
      <IconButton
        text="Remove"
        onButtonClick={onRemoveButtonClicked}
        Icon={MdDelete}
        alignCenter
        color="red"
      />
    </div>
  );
};

export default HorizontalProductCard;
