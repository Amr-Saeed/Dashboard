import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const STORAGE_KEY = "dashboard-theme";

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19V10" />
      <path d="M12 19V5" />
      <path d="M19 19v-7" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </svg>
  );
}

function DetailsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M9 9h6" />
      <path d="M9 13h6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 14.5A6.5 6.5 0 0 1 9.5 6a7.5 7.5 0 1 0 8.5 8.5Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 8.7a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Z" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
    </svg>
  );
}

const navigation = [
  { to: "/dashboard", label: "Charts", Icon: ChartIcon },
  { to: "/list", label: "Products", Icon: ProductsIcon },
  { to: "/details/1", label: "Details", Icon: DetailsIcon },
];

function SidebarLink({ item }) {
  const { Icon } = item;

  return (
    <NavLink
      to={item.to}
      title={item.label}
      className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
    >
      <span className="sidebar-link-badge sidebar-icon-svg">
        <Icon />
      </span>
    </NavLink>
  );
}

function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    setIsDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", isDarkMode);
    window.localStorage.setItem(STORAGE_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={`app-shell ${isDarkMode ? "theme-dark-shell" : ""}`}>
      <aside className="sidebar-panel">
        <nav className="nav flex-column gap-2 mt-2 sidebar-icon-nav">
          {navigation.map((item) => (
            <SidebarLink key={item.label} item={item} />
          ))}
        </nav>

        <div className="sidebar-icon-nav sidebar-utility-nav mt-2">
          <button
            type="button"
            className={`sidebar-link sidebar-action-button ${
              isDarkMode ? "active" : ""
            }`}
            title="Toggle dark mode"
            onClick={() => setIsDarkMode((current) => !current)}
          >
            <span className="sidebar-link-badge sidebar-icon-svg">
              <MoonIcon />
            </span>
          </button>

          <button
            type="button"
            className="sidebar-link sidebar-action-button"
            title="Settings"
          >
            <span className="sidebar-link-badge sidebar-icon-svg">
              <SettingsIcon />
            </span>
          </button>
        </div>

        <div className="sidebar-footer mt-auto">
          <div className="avatar-circle">{user?.name?.charAt(0) ?? "A"}</div>
          <button
            type="button"
            className="btn btn-outline-dark rounded-pill w-100 mt-3 sidebar-logout"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="content-panel">
        <Outlet />
      </main>
    </div>
  );
}

export default AppShell;
