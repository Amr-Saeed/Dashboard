import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { dashboardService } from "../services/api";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    grossRevenue: 2480.32,
    avgOrderValue: 320.21,
    totalOrders: 1899.49,
    revenueChange: 12.5,
    orderChange: -8.2,
    ordersChange: 6.3,
  });

  const transactionData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 400 },
    { name: "May", value: 500 },
    { name: "Jun", value: 700 },
  ];

  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 },
    { name: "Jul", sales: 7000 },
    { name: "Aug", sales: 6500 },
    { name: "Sep", sales: 8000 },
    { name: "Oct", sales: 7500 },
    { name: "Nov", sales: 9000 },
    { name: "Dec", sales: 8500 },
  ];

  const productData = [
    { name: "Product A", sales: 2400 },
    { name: "Product B", sales: 1398 },
    { name: "Product C", sales: 9800 },
    { name: "Product D", sales: 3908 },
    { name: "Product E", sales: 4800 },
    { name: "Product F", sales: 3800 },
  ];

  const scheduleData = [
    {
      id: 1,
      title: "Meeting with Arthur Bell",
      time: "09:00 - 10:00 AM",
      type: "Product Design",
    },
    {
      id: 2,
      title: "Meeting with Leslie Perez",
      time: "11:00 - 12:00 PM",
      type: "Marketing Brainstorm",
    },
    {
      id: 3,
      title: "Meeting with Leslie Perez",
      time: "02:00 - 03:00 PM",
      type: "Brainstorming Session",
    },
  ];

  const stores = [
    { name: "New York Store", performance: 76, sales: 12450, trend: "up" },
    { name: "Los Angeles Store", performance: 78, sales: 11230, trend: "up" },
    { name: "Chicago Store", performance: 70, sales: 9870, trend: "down" },
    { name: "Houston Store", performance: 75, sales: 10450, trend: "up" },
  ];

  return (
    <div className="d-flex">
      <div className="sidebar">
        <div className="p-4">
          <h4 className="fw-bold mb-4">Sugarpanel</h4>
          <nav>
            <div className="nav-item-custom active">
              <span>📊</span> Dashboard
            </div>
            <div className="nav-item-custom">
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
        <div className="mt-auto p-4 border-top">
          <div className="nav-item-custom" onClick={logout}>
            <span>🚪</span> Logout
          </div>
        </div>
      </div>

      <div className="main-content flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1">Welcome Back Ameerah Howard</h3>
            <p className="text-muted mb-0">You have 2 unread notifications</p>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary">
              Export Document
            </button>
            <div
              className="bg-white rounded-circle p-2"
              style={{ width: "40px", height: "40px" }}
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="rounded-circle"
              />
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <div className="stat-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="stat-value">
                    ${stats.grossRevenue.toLocaleString()}
                  </div>
                  <div className="stat-label">Gross Revenue</div>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success">
                  +{stats.revenueChange}%
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="stat-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="stat-value">${stats.avgOrderValue}</div>
                  <div className="stat-label">Avg. Order Value</div>
                </div>
                <span className="badge bg-danger bg-opacity-10 text-danger">
                  {stats.orderChange}%
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="stat-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="stat-value">
                    ${stats.totalOrders.toLocaleString()}
                  </div>
                  <div className="stat-label">Total Orders</div>
                </div>
                <span className="badge bg-success bg-opacity-10 text-success">
                  +{stats.ordersChange}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <div className="dashboard-card">
              <h6 className="fw-bold mb-3">Transaction Activity</h6>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#667eea"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="dashboard-card">
              <h6 className="fw-bold mb-3">Sale Performance</h6>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#667eea"
                      fill="#667eea"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-8 mb-3">
            <div className="dashboard-card">
              <h6 className="fw-bold mb-3">Orders By Time</h6>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#667eea" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="dashboard-card">
              <h6 className="fw-bold mb-3">Schedule</h6>
              {scheduleData.map((item) => (
                <div key={item.id} className="schedule-item">
                  <div className="fw-semibold">{item.title}</div>
                  <div className="text-muted small">{item.time}</div>
                  <span className="badge bg-primary bg-opacity-10 text-primary mt-1">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row mb-4">
          {stores.map((store, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <div className="store-card">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0">{store.name}</h6>
                  <span
                    className={`badge ${store.trend === "up" ? "bg-success" : "bg-danger"} bg-opacity-10`}
                  >
                    {store.trend === "up" ? "↑" : "↓"} {store.performance}%
                  </span>
                </div>
                <div className="text-muted small">Performance Rate</div>
                <div className="mt-2">
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{ width: `${store.performance}%` }}
                    ></div>
                  </div>
                </div>
                <div className="mt-2 text-muted small">
                  ${store.sales.toLocaleString()} sales revenue
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-card">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold mb-0">Product List</h6>
            <Link to="/products" className="btn btn-sm btn-outline-primary">
              See More
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table product-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>Revenue</th>
                  <th>Views</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Liam Anderson Red</td>
                  <td>$1240.22</td>
                  <td>1,909</td>
                  <td>$2,102</td>
                  <td>6,575</td>
                  <td>
                    <div className="toggle-switch"></div>
                  </td>
                </tr>
                <tr>
                  <td>Ava Reynolds Blue</td>
                  <td>$1240.22</td>
                  <td>1,909</td>
                  <td>$2,102</td>
                  <td>6,575</td>
                  <td>
                    <div className="toggle-switch"></div>
                  </td>
                </tr>
                <tr>
                  <td>Jackson White Blue</td>
                  <td>$1240.22</td>
                  <td>1,909</td>
                  <td>$2,102</td>
                  <td>6,575</td>
                  <td>
                    <div className="toggle-switch"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
