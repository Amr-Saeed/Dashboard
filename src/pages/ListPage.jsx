import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { getProducts } from "../services/api";

function ListPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (active) {
          setError("Unable to load product records right now.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const toggleProduct = (productId) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, active: !product.active }
          : product,
      ),
    );
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div className="page-stack">
      <SectionHeader
        title="Product List"
        subtitle="Search, review, and open the detail view for any inventory item."
        action={
          <input
            type="search"
            className="form-control rounded-pill search-input"
            placeholder="Search products"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        }
      />

      {error ? <div className="alert alert-danger">{error}</div> : null}

      <article className="glass-card">
        <div className="table-responsive">
          <table className="table align-middle product-table mb-0">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Revenue</th>
                <th>Reviews</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="product-swatch"
                        style={{ background: product.swatch }}
                      />
                      <div>
                        <strong className="d-block">{product.name}</strong>
                        <small className="text-secondary">{product.location}</small>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.revenue}</td>
                  <td>{product.reviews}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        className={`toggle-pill ${product.active ? "is-on" : ""}`}
                        aria-label={`Toggle ${product.name}`}
                        onClick={() => toggleProduct(product.id)}
                      />
                      <span
                        className={`badge ${
                          product.active ? "text-bg-primary" : "text-bg-light"
                        }`}
                      >
                        {product.active ? "Active" : "Paused"}
                      </span>
                    </div>
                  </td>
                  <td className="text-end">
                    <Link
                      to={`/details/${product.id}`}
                      className="btn btn-sm btn-outline-dark rounded-pill"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}

export default ListPage;
