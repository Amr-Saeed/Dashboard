import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "dashboard-auth";

const defaultUser = {
  email: "amr@example.com",
  password: "123456",
  name: "Amr Saeed",
  role: "Operations Lead",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      login: ({ email, password }) => {
        if (
          email === defaultUser.email &&
          password === defaultUser.password
        ) {
          const nextUser = {
            email: defaultUser.email,
            name: defaultUser.name,
            role: defaultUser.role,
          };
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
          setUser(nextUser);
          return { success: true };
        }

        return {
          success: false,
          message: "Use amr@example.com / 123456 to access the dashboard.",
        };
      },
      logout: () => {
        window.localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
