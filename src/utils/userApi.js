import { getBaseUrl } from "./api.js";

export async function registerUser(firstName, lastName, address, city, postCode, email, password) {
  const url = new URL("auth/register", getBaseUrl());
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
        firstName,
        lastName,
        email,
        password,
        location: {
            address,
            city,
            postCode
        }
    }),
  });

  if (response.ok) {
    return response.json();
  }

    const err = await response.json().catch(() => ({}));
    console.log("Fel från backend:", err);
    const errorMessages = err.errors 
    ? err.errors.map(e => e.message).join("\n") 
    : err.message || "Registrering misslyckades";

    throw new Error(errorMessages);
}

export async function loginUser(email, password) {
  const url = new URL("auth/login", getBaseUrl());
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return response.json();
  }

    const err = await response.json().catch(() => ({}));
    console.log("Fel från backend:", err);
    const errorMessages = err.errors 
    ? err.errors.map(e => e.message).join("\n") 
    : err.message || "Registrering misslyckades";

    throw new Error(errorMessages);
}