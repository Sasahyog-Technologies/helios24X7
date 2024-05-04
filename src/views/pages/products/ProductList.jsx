import { useQuery } from "@tanstack/react-query";
import { Image, Table } from "antd";
import { format } from "date-fns";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import Breadcrumbs from "../../../components/Breadcrumbs";
import useOwnerManager from "../../../Hook/useOwnerManager";
import request from "../../../sdk/functions";
import ProductsListFilter from "./ProductListFilter";
import ProductsAddPopup from "../../../components/modelpopup/Product/ProductAddPopup";
import ProductDeletePopup from "../../../components/modelpopup/Product/ProductDeletePopup";
import ProductEditPopup from "../../../components/modelpopup/Product/ProductEditPopup";

const ProductsList = () => {
  const [productId, setProductId] = useState(null);
  const isWebDevice = useMediaQuery("(min-width:700px)");
  const { isOwner, isOwnerManager } = useOwnerManager();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      render: (media, record) => (
        <span className="table-avatar">
          <Image
            width={30}
            src={`${media?.data?.attributes?.url}`}
            class="rounded  d-block w-10"
          />
        </span>
      ),
    },
    /*  {
      title: "Description",
      dataIndex: "description",
    },
 */
    isOwnerManager
      ? {
          title: "Action",
          render: (walkin) => (
            <div className="dropdown dropdown-action text-end">
              <Link
                to="#"
                className="action-icon dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="material-icons">more_vert</i>
              </Link>

              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item"
                  to="#"
                  data-bs-toggle="modal"
                  data-bs-target="#edit_product"
                  onClick={() => setProductId(walkin.id)}
                >
                  <i className="fa fa-pencil m-r-5" /> Edit
                </Link>
                {isOwner ? (
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-target="#delete_product"
                    onClick={() => setProductId(walkin.id)}
                  >
                    <i className="fa fa-trash m-r-5" /> Delete
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          ),
        }
      : {},
  ];

  /* --------------------------------------------------------------------------- */

  const deviceColumns = [
    {
      render: (record, key, index) => {
        return (
          <div>
            {isOwnerManager ? (
              <div className="d-flex justify-content-between">
                {<div className="fw-bold fs-6"></div>}
                <div
                  className="dropdown dropdown-action text-end" /* style={{zIndex:100}} */
                >
                  <Link
                    to="#"
                    className="action-icon dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="material-icons">more_vert</i>
                  </Link>

                  <div className="dropdown-menu dropdown-menu-right">
                    <Link
                      className="dropdown-item"
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_product"
                      onClick={() => setProductId(record.id)}
                    >
                      <i className="fa fa-pencil m-r-5" /> Edit
                    </Link>
                    {isOwner ? (
                      <Link
                        className="dropdown-item"
                        to="#"
                        data-bs-toggle="modal"
                        data-bs-target="#delete_product"
                        onClick={() => setProductId(record.id)}
                      >
                        <i className="fa fa-trash m-r-5" /> Delete
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Title</span>
                <span> {record?.title}</span>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Subtitle</span>
                <span> {record?.subtitle}</span>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Slug</span>
                <span> {record?.slug}</span>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Price</span>
                <span> {record?.price}</span>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Discount Price</span>
                <span> {record?.discountPrice}</span>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <span className="fw-bold fs-6">Quantity</span>
                <span> {record?.quantity}</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold fs-6">Media </span>
              <span className="table-avatar">
                <Image
                  width={30}
                  src={`${record?.thumbnail?.data?.attributes?.url}`}
                  class="rounded  d-block w-10"
                />
              </span>
            </div>
          </div>
        );
      },
    },
  ];

  /* --------------------------------------------------------------------------- */

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
      total: 0,
    },
  });

  const [query, setQuery] = useState({
    search: "",
  });
  const {
    data: ProductsData,
    isLoading: ProductsIsLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["products-list"],
    queryFn: async () => {
      const data = await request.findMany("product", {
        populate: "thumbnail",
        filters: {
          title: { $containsi: query.search },
        },
      });
      setTableParams({
        ...tableParams,
        pagination: { ...tableParams.pagination, total: data.length },
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

  //console.log(ProductsData);

  const handleTableChange = (pagination, filters, sorter) => {
    //console.log("handleTableChange");
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      // setData([]);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <Breadcrumbs
            maintitle="Products"
            title="Dashboard"
            subtitle="Products"
            modal="#add_product"
            name="Add product"
            Linkname1="/products-list"
            isOwnerManager={isOwnerManager}
          />
          {/* /Page Header */}
          <ProductsListFilter
            query={query}
            setQuery={setQuery}
            refetch={refetch}
          />
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <Table
                  loading={ProductsIsLoading || isRefetching}
                  className="table-striped"
                  columns={isWebDevice ? columns : deviceColumns}
                  dataSource={ProductsData}
                  pagination={{
                    total: tableParams.pagination.total,
                    showSizeChanger: true,
                  }}
                  rowKey={(record) => record.id}
                  onChange={handleTableChange}
                />
              </div>
            </div>
          </div>
        </div>

        <ProductsAddPopup refetch={refetch} />
        <ProductDeletePopup refetch={refetch} productId={productId} />
        <ProductEditPopup refetch={refetch} productId={productId} />
      </div>
    </div>
  );
};

export default ProductsList;
