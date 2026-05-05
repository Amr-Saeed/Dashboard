import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { getDashboardData } from "../services/api";

function MaximizeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4H4v4" />
      <path d="M16 4h4v4" />
      <path d="M8 20H4v-4" />
      <path d="M20 16v4h-4" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 7h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 17H9" />
      <path d="M18 17V11a6 6 0 1 0-12 0v6l-2 2h16l-2-2Z" />
    </svg>
  );
}

function DashboardPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [previewProducts, setPreviewProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getDashboardData()
      .then((data) => {
        if (active) {
          setDashboard(data);
          setPreviewProducts(data.productsPreview ?? []);
        }
      })
      .catch(() => {
        if (active) {
          setError("Unable to load dashboard data right now.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const togglePreviewProduct = (productId) => {
    setPreviewProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, active: !product.active }
          : product,
      ),
    );
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!dashboard) {
    return <div className="glass-card">Loading dashboard...</div>;
  }

  return (
    <div className="page-stack dashboard-page">
      <div className="dashboard-topbar">
        <div className="header-brand">
          <div className="header-brand-mark">SP</div>
          <h1 className="dashboard-title">Welcome Back {user?.name}</h1>
        </div>

        <div className="dashboard-actions">
          <button type="button" className="lang-select-button">
            EN
          </button>
          <button type="button" className="icon-button topbar-svg-icon" aria-label="Maximize">
            <MaximizeIcon />
          </button>
          <button type="button" className="icon-button topbar-svg-icon" aria-label="Messages">
            <MessageIcon />
          </button>
          <button type="button" className="icon-button topbar-svg-icon" aria-label="Notifications">
            <NotificationIcon />
          </button>
          <button type="button" className="icon-button topbar-avatar-icon">
            A
          </button>
          <div className="search-shell">
            <input type="search" placeholder="Search..." />
          </div>
          <button type="button" className="chip-button">
            Date
          </button>
          <button type="button" className="chip-button">
            Export Document
          </button>
        </div>
      </div>

      <div className="dashboard-header-copy">
        <p className="dashboard-subtitle">You have 2 unread notifications</p>
      </div>

      <div className="dashboard-grid">
        <article className="promo-card dashboard-card">
          <div className="promo-copy">
            <p className="promo-kicker">Sharpen your Skill with</p>
            <h3>Professional Online</h3>
            <button type="button" className="promo-button">
              Upgrade Now
            </button>
          </div>
        </article>

        {dashboard.metrics.map((metric) => (
          <article className="metric-panel dashboard-card" key={metric.label}>
            <div className="metric-panel-top">
              <span>{metric.label}</span>
              <span className={`metric-delta metric-delta-${metric.tone}`}>
                {metric.change}
              </span>
            </div>
            <strong className="metric-panel-value">{metric.value}</strong>
            <small>From Jan 01, 2025 - March 30, 2026</small>
          </article>
        ))}
      </div>

      <div className="dashboard-main-grid">
        <article className="glass-card dashboard-card chart-card transaction-card">
          <div className="card-heading">
            <div>
              <h2>Transaction Activity</h2>
            </div>
            <span className="card-filter">Last Year v</span>
          </div>
          <div className="chart-wrap line-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboard.activity}>
                <CartesianGrid stroke="#edf1f7" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#b1bccd" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#b1bccd" }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#2d8cff"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#12284a"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend-row">
            <span>
              <i className="legend-dot legend-blue" /> Total Transaction
            </span>
            <span>
              <i className="legend-dot legend-dark" /> Success Transaction
            </span>
          </div>
        </article>

        <article className="glass-card dashboard-card chart-card performance-card">
          <div className="card-heading">
            <div>
              <h2>Sale Performance</h2>
              <strong className="performance-number">91.72%</strong>
            </div>
            <span className="metric-delta metric-delta-success">+4.93%</span>
          </div>
          <div className="chart-wrap area-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboard.activity}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#69abff" stopOpacity={0.75} />
                    <stop offset="100%" stopColor="#69abff" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#edf1f7" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#b1bccd" }}
                />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5b9fff"
                  strokeWidth={2}
                  fill="url(#salesFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="glass-card dashboard-card schedule-panel">
          <div className="card-heading">
            <h2>Schedule</h2>
            <span className="see-all">See All</span>
          </div>
          <div className="schedule-month">January 2025</div>
          <div className="schedule-tabs">
            <span className="active">Meetings</span>
            <span>Events</span>
            <span>Holiday</span>
          </div>
          <div className="schedule-list">
            {dashboard.schedule.map((item) => (
              <div className="schedule-entry" key={item.title}>
                <span className={`schedule-tag ${item.badgeClass}`}>
                  {item.type}
                </span>
                <h3>{item.title}</h3>
                <p>{item.time}</p>
                <div className="schedule-footer">
                  <span>On Google Meet</span>
                  <span className="schedule-avatars">AAA +3</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-card dashboard-card heatmap-card">
          <div className="card-heading">
            <h2>Orders By Time</h2>
            <span className="card-filter">January 2025 v</span>
          </div>
          <div className="heatmap-grid">
            {dashboard.heatmap.map((value, index) => (
              <span
                key={`${value}-${index}`}
                className="heatmap-cell"
                style={{ opacity: 0.16 + value / 11 }}
              />
            ))}
          </div>
          <div className="heatmap-axis">
            <span>9am</span>
            <span>12pm</span>
            <span>3pm</span>
            <span>6pm</span>
            <span>9pm</span>
          </div>
        </article>

        <article className="glass-card dashboard-card chart-card product-statics-card">
          <div className="card-heading">
            <h2>Product Statics</h2>
            <span className="card-filter">Last Year v</span>
          </div>
          <div className="chart-wrap bar-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboard.activity} barGap={6}>
                <CartesianGrid stroke="#edf1f7" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#b1bccd" }}
                />
                <YAxis hide />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  fill="#dbe9ff"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="revenue"
                  fill="#2d8cff"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      <div className="stores-strip">
        {dashboard.stores.map((store) => (
          <article className="store-chip" key={store.name}>
            <div>
              <h3>{store.name}</h3>
              <p>{store.performance}</p>
            </div>
            <strong>{store.score}</strong>
          </article>
        ))}
      </div>

      <div className="dashboard-bottom-grid">
        <article className="glass-card dashboard-card product-list-panel">
          <div className="card-heading">
            <div>
              <h2>Product List</h2>
              <small className="inventory-note">
                3280 Item{" "}
                <span className="metric-delta metric-delta-success">
                  +4.93%
                </span>
              </small>
            </div>
            <span className="see-all">See More</span>
          </div>

          <div className="product-table-shell">
            <table className="table align-middle product-table mb-0">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Revenue</th>
                  <th>Sales</th>
                  <th>Reviews</th>
                  <th>Views</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {previewProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-row-main">
                        <span
                          className="product-color"
                          style={{ background: product.swatch }}
                        />
                        <div>
                          <strong>{product.name}</strong>
                          <small>{product.stock}</small>
                        </div>
                      </div>
                    </td>
                    <td>{product.revenue}</td>
                    <td>{product.sales}</td>
                    <td>{product.reviews}</td>
                    <td>{product.views}</td>
                    <td>
                      <button
                        type="button"
                        className={`toggle-pill ${product.active ? "is-on" : ""}`}
                        aria-label={`Toggle ${product.name}`}
                        onClick={() => togglePreviewProduct(product.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="glass-card dashboard-card conversion-panel">
          <div className="card-heading">
            <h2>Conversion Rate</h2>
            <span className="card-filter">Last Year v</span>
          </div>
          <div className="conversion-month">January 2025</div>
          <div className="conversion-list">
            {dashboard.conversion.map((item, index) => (
              <div className="conversion-row" key={`${item.label}-${index}`}>
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.rate}</small>
                </div>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

export default DashboardPage;
