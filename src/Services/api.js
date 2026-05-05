const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const FALLBACK_DATA_URL = "/mock/db.json";

let fallbackCache = null;

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

async function getFallbackData() {
  if (!fallbackCache) {
    fallbackCache = fetchJson(FALLBACK_DATA_URL);
  }

  return fallbackCache;
}

async function request(path, fallbackResolver) {
  try {
    return await fetchJson(`${API_BASE_URL}${path}`);
  } catch (error) {
    if (!fallbackResolver) {
      throw error;
    }

    const fallbackData = await getFallbackData();
    return fallbackResolver(fallbackData);
  }
}

export async function getDashboardData() {
  return request("/dashboard", (data) => data.dashboard);
}

export async function getProducts() {
  return request("/products", (data) => data.products);
}

export async function getProductById(id) {
  return request(`/products/${id}`, (data) => {
    const product = data.products.find((item) => item.id === id);

    if (!product) {
      throw new Error(`Product ${id} not found`);
    }

    return product;
  });
}
