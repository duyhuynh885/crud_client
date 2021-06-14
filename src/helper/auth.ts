import cookie from "js-cookie";

/**
 * Auth Helper
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By DuyHV9
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       DuyHV9           Create
 */
// Set in Cookie
export const setCookie = (key: any, value: any) => {
  if (window !== undefined) {
    cookie.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};
// remove from cookie
export const removeCookie = (key: any) => {
  if (window !== undefined) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key: any) => {
  return cookie.get(key);
};

// Set in localstorage
export const setLocalStorage = (key: any, value: any) => {
  if (window !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = (key: any) => {
  if (window !== undefined) {
    localStorage.removeItem(key);
  }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response: any) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie("token", response.data.accessToken);
  setLocalStorage("user", response.data);
};

// Access user info from localstorage
export const isAuth = () => {
  if (window !== undefined) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user") || "{}");
      } else {
        return false;
      }
    }
  }
};

export const signout = (next: any) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

export const updateUser = (response: any, next: any) => {
  console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user") || "{}");
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
