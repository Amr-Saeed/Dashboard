import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { getProductById } from "../services/api";

function DetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProductById(id)
      .then((data) => {
        if (active) {
          setProduct(data);
        }
      })
      .catch(() => {
        if (active) {
          setError("Unable to load the selected product.");
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product) {
    return <div className="glass-card">Loading details...</div>;
  }

  return (
    <div className="page-stack">
      <SectionHeader
        title={product.name}
        subtitle={`${product.category} inventory detail and performance overview.`}
        action={
          <Link to="/list" className="btn btn-outline-dark rounded-pill">
            Back to list
          </Link>
        }
      />

      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <article className="glass-card h-100">
            <div className="detail-hero" style={{ background: product.swatch }} />
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <p className="eyebrow mb-2">Summary</p>
                <p className="mb-0 text-secondary">{product.description}</p>
              </div>
              <div className="col-md-6">
                <p className="eyebrow mb-2">Key Notes</p>
                <ul className="detail-list mb-0">
                  {product.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>

        <div className="col-12 col-xl-4">
          <article className="glass-card h-100">
            <p className="eyebrow mb-3">Product Metrics</p>
            <div className="d-grid gap-3">
              <div className="metric-row">
                <span>Revenue</span>
                <strong>{product.revenue}</strong>
              </div>
              <div className="metric-row">
                <span>Reviews</span>
                <strong>{product.reviews}</strong>
              </div>
              <div className="metric-row">
                <span>Sell-through</span>
                <strong>{product.sellThrough}</strong>
              </div>
              <div className="metric-row">
                <span>Warehouse</span>
                <strong>{product.location}</strong>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
