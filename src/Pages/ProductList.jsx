import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      setProducts([
        {
          id: 1,
          name: "Liam Anderson Red",
          price: 1240.22,
          sales: 1909,
          revenue: 2102,
          views: 6575,
          status: true,
        },
        {
          id: 2,
          name: "Ava Reynolds Blue",
          price: 1240.22,
          sales: 1909,
          revenue: 2102,
          views: 6575,
          status: true,
        },
        {
          id: 3,
          name: "Jackson White Blue",
          price: 1240.22,
          sales: 1909,
          revenue: 2102,
          views: 6575,
          status: true,
        },
        {
          id: 4,
          name: "Bennett Reynolds Blue",
          price: 1240.22,
          sales: 1909,
          revenue: 2102,
          views: 6575,
          status: true,
        },
        {
          id: 5,
          name: "Eva Reynolds Blue",
          price: 1240.22,
          sales: 1909,
          revenue: 2102,
          views: 6575,
          status: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <div className="p-4">
          <h4 className="fw-bold mb-4">Sugarpanel</h4>
          <nav>
            <Link
              to="/dashboard"
              className="nav-item-custom text-decoration-none"
            >
              <span>📊</span> Dashboard
            </Link>
            <div className="nav-item-custom active">
              <span>📦</span> Products
            </div>
            <div className="nav-item-custom">
              <span>👥</span> Customers
            </div>
            <div className="nav-item-custom">
              <span>📈</span> Analytics
            </div>
            <div className="nav-item-custom">
              <span>📅</span> Schedule
            </div>
            <div className="nav-item-custom">
              <span>⚙️</span> Settings
            </div>
          </nav>
        </div>
      </div>

      <div className="main-content flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">Products</h3>
          <button className="btn btn-primary-custom">Add Product</button>
        </div>

        <div className="dashboard-card">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="badge bg-success bg-opacity-10 text-success me-2">
                3280
              </span>
              <span className="text-muted">Items</span>
            </div>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search products..."
                style={{ width: "300px" }}
              />
              <button className="btn btn-outline-secondary">Filter</button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table product-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>Revenue</th>
                  <th>Views</th>
                  <th>Actions</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <Link
                        to={`/products/${product.id}`}
                        className="text-decoration-none"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td>${product.price}</td>
                    <td>{product.sales.toLocaleString()}</td>
                    <td>${product.revenue.toLocaleString()}</td>
                    <td>{product.views.toLocaleString()}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        Edit
                      </button>
                    </td>
                    <td>
                      <div
                        className={`toggle-switch ${product.status ? "" : "inactive"}`}
                        style={{
                          background: product.status ? "#667eea" : "#ccc",
                        }}
                      ></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
