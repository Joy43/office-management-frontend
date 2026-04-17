/* eslint-disable @typescript-eslint/no-explicit-any */
import ReduxStore from "@/redux/ReduxStore";

/**
 * Get valid token from Redux store
 * Handles token refresh if needed
 */
export const getValidToken = async (): Promise<string | null> => {
  try {
    const state = ReduxStore.getState();
    const token = state.auth.token;
    const refreshToken = state.auth.refreshToken;

    if (!token) {
      console.warn("[getValidToken] No token found in store");
      return null;
    }

    // Check if token is expired (basic check)
    if (isTokenExpired(token)) {
      console.log("[getValidToken] Token expired, attempting refresh");

      if (refreshToken) {
        // Attempt to refresh token
        const newToken = await refreshAccessToken(refreshToken);
        return newToken;
      }

      console.warn("[getValidToken] No refresh token available");
      return null;
    }

    return token;
  } catch (error) {
    console.error("[getValidToken] Error getting valid token:", error);
    return null;
  }
};

/**
 * Check if JWT token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    if (!token) return true;

    // Remove 'Bearer ' prefix if present
    const cleanToken = token.replace("Bearer ", "");

    // Decode JWT payload
    const parts = cleanToken.split(".");
    if (parts.length !== 3) return true;

    const payload = JSON.parse(atob(parts[1]));

    // Check expiration time (exp is in seconds)
    if (payload.exp) {
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();

      // Consider token expired if less than 1 minute remaining
      return currentTime >= expirationTime - 60000;
    }

    return false;
  } catch (error) {
    console.error("[isTokenExpired] Error checking token expiration:", error);
    return true;
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshAccessToken = async (
  refreshToken: string,
): Promise<string | null> => {
  try {
    const response = await fetch(
      "https://dabuke-gyedu.ssjoy.me/api/auth/refresh-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!response.ok) {
      console.error("[refreshAccessToken] Token refresh failed");
      return null;
    }

    const data = await response.json();

    // Update Redux store with new token
    if (data.accessToken) {
      const store = ReduxStore;
      const state = store.getState();

      // Import here to avoid circular dependency
      const { setUser } = require("@/redux/features/auth/authSlice");
      store.dispatch(
        setUser({
          user: state.auth.user,
          token: {
            accessToken: data.accessToken,
            refreshToken: refreshToken,
          },
        }),
      );

      return data.accessToken;
    }

    return null;
  } catch (error) {
    console.error("[refreshAccessToken] Error refreshing token:", error);
    return null;
  }
};

/**
 * Get token synchronously (for headers)
 */
export const getTokenSync = (): string | null => {
  try {
    const state = ReduxStore.getState();
    return state.auth.token;
  } catch {
    return null;
  }
};
