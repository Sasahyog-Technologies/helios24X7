import React, { useState } from "react";
import { Link } from "react-router-dom";
import request from "../../../sdk/functions";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import ProductHeader from "../../layout/ProductHeader";
import ProductsListFilter from "../../../views/pages/products/ProductListFilter";
const ProductListing = () => {
  const [query, setQuery] = useState({
    search: "",
  });
  const {
    data: ProductsData,
    isLoading: ProductsIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["marketplace-products-list"],
    queryFn: async () => {
      const data = await request.findMany("product", {
        populate: "thumbnail",
        filters: {
          title: { $containsi: query.search },
        },
      });

      // return formetter(data);
      return data.data.map((item) => {
        return {
          ...item.attributes,
          id: item.id,
        };
      });
    },
  });
  // console.log(ProductsData);
  return (
    <div className="mt-20" style={{ marginTop: "100px" }}>
      <ProductHeader />
      <div className="content container-fluid mt-5">
        <div className="mt-10">
          <ProductsListFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          />
        </div>
        <div className="row">
          {ProductsIsLoading || isRefetching ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              {ProductsData?.length ? (
                <>
                  {ProductsData.map((product) => (
                    <div
                      className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                      key={product.id}
                    >
                      <div className="profile-widget">
                        <div className="profile-img">
                          <Link to="/profile" className="">
                            <img
                              src={product?.thumbnail?.data?.attributes?.url}
                              alt=""
                          style={{width:"100%" ,height:"100%"}}
                            />
                          </Link>
                        </div>

                        <h4 className="user-name m-t-10 mb-0 text-ellipsis">
                          <Link to={`/profile/${product.id}`}>
                            {product.title}
                          </Link>
                        </h4>
                        <div className="text-muted">
                          <span className=" small text-decoration-line-through">
                            ₹ {product.price}
                          </span>{" "}
                          <br />
                          <span className="text-lg font-weight-bold">
                            ₹{product.discountPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>Products Not Available</>
              )}
            </>
          )}
        </div>
      </div>

      {/*       <ProductListingAddPopup />
    
      <DeleteModal Name="Delete product" /> */}
    </div>
  );
};

export default ProductListing;
