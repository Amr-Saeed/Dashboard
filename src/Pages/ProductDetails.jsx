import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productService.getById(id);
      setProduct(data);
    } catch (error) {
      setProduct({
        id: id,
        name: "Liam Anderson Red",
        price: 1240.22,
        description: "Premium quality product with excellent features",
        sales: 1909,
        revenue: 2102,
        views: 6575,
        stock: 150,
        category: "Electronics",
        status: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="d-flex">
      <div className="sidebar">
        <div className="p-4">
          <h4 className="fw-bold mb-4">Sugarpanel</h4>
          <nav>
            <div
              className="nav-item-custom"
              onClick={() => navigate("/dashboard")}
            >
              <span>📊</span> Dashboard
            </div>
            <div
              className="nav-item-custom"
              onClick={() => navigate("/products")}
            >
              <span>📦</span> Products
            </div>
          </nav>
        </div>
      </div>

      <div className="main-content flex-grow-1">
        <div className="mb-4">
          <button
            className="btn btn-link"
            onClick={() => navigate("/products")}
          >
            ← Back to Products
          </button>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="dashboard-card">
              <h3 className="fw-bold mb-4">{product.name}</h3>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">
                      Product Name
                    </label>
                    <p className="fw-semibold">{product.name}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Category</label>
                    <p className="fw-semibold">{product.category}</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Price</label>
                    <p className="fw-semibold fs-4">${product.price}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label text-muted">Stock</label>
                    <p className="fw-semibold">{product.stock} units</p>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Status</label>
                    <p>
                      <span
                        className={`badge ${product.status ? "bg-success" : "bg-secondary"}`}
                      >
                        {product.status ? "Active" : "Inactive"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label text-muted">Description</label>
                <p>{product.description}</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary-custom">Edit Product</button>
                <button className="btn btn-outline-danger">Delete</button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard-card">
              <h6 className="fw-bold mb-3">Statistics</h6>
              <div className="mb-3">
                <div className="text-muted small">Total Sales</div>
                <div className="fs-4 fw-bold">
                  {product.sales.toLocaleString()}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Revenue</div>
                <div className="fs-4 fw-bold">
                  ${product.revenue.toLocaleString()}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Views</div>
                <div className="fs-4 fw-bold">
                  {product.views.toLocaleString()}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-muted small">Conversion Rate</div>
                <div className="fs-4 fw-bold">29.5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
