import { getBaseUrl } from "./api.js";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getWishlist() {
  const url = new URL("wishlist", getBaseUrl());
  const response = await fetch(url, { headers: getAuthHeaders() });
  if (response.ok) return response.json();
  const err = await response.json().catch(() => ({}));
  throw new Error(err.error || "Failed to fetch wishlist");
}

export async function addToWishlist(productId) {
  const url = new URL("wishlist", getBaseUrl());
  const response = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId }),
  });
  if (response.status === 409) throw new Error("Already in wishlist");
  if (response.ok) return response.json();
  const err = await response.json().catch(() => ({}));
  throw new Error(err.error || "Failed to add to wishlist");
}

export async function removeFromWishlist(itemId) {
  const url = new URL(`wishlist/${itemId}`, getBaseUrl());
  const response = await fetch(url, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (response.status === 404) throw new Error("Item not found");
  if (response.ok || response.status === 204) return;
  const err = await response.json().catch(() => ({}));
  throw new Error(err.error || "Failed to remove from wishlist");
}
