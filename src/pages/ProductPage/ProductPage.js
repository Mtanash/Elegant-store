import { useEffect } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { publicAxios } from "../../api/axios";
import { selectCurrentUser } from "../../features/user/userSlice";
import AddReview from "../../components/AddReview/AddReview";
import Reviews from "../../components/Reviews/Reviews";

import ProductFullDetails from "../../components/ProductFullDetails/ProductFullDetails";
import ProductDetailsPanel from "../../components/ProductDetailsPanel/ProductDetailsPanel";

const ProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [product, productLoading, productError, fetchProduct] = useAxios();
  const productIsFavorite = useSelector((state) =>
    state.user?.user?.favoriteProducts.includes(params.id)
  );
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    fetchProduct({
      axiosInstance: publicAxios,
      method: "get",
      url: `/products/${params.id}`,
    });
  }, []);

  if (productLoading) return <LoadingPage fullHeight={true} />;
  else if (productError) return <div>Error: {productError}</div>;
  else
    return (
      <section className="min-h-[calc(100vh_-_theme(headerAndFooterHeight))] p-3">
        <div className="container mx-auto flex flex-col items-center justify-center gap-3">
          {/* Product info section */}
          <div className="grid justify-center items-start gap-4 ">
            <ProductFullDetails product={product} />

            <ProductDetailsPanel
              product={product}
              productIsFavorite={productIsFavorite}
            />
          </div>
          <hr className="text-pale-white h-px w-full" />
          {/* Reviews section */}
          <h3 className="text-xl font-semibold self-center my-3">Reviews</h3>
          <div className="w-full flex flex-col md:grid grid-cols-2 gap-4">
            {user ? (
              <div>
                <AddReview productId={params.id} />
              </div>
            ) : (
              <p className="text-center text-lg">
                Please{" "}
                <button
                  className="hover:underline underline-offset-2"
                  onClick={() => navigate("/auth")}
                >
                  login
                </button>{" "}
                to add a review.
              </p>
            )}
            <hr className="md:hidden" />
            <div>
              <Reviews productId={params.id} />
            </div>
          </div>
        </div>
      </section>
    );
};

export default ProductPage;
