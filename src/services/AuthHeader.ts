/**
 * Auth Header
 *
 * Version 1.0
 *
 * Date: 08-06-2021
 *
 * Copyright 
 *
 * Modification Logs:
 * DATE               AUTHOR          DESCRIPTION
 * -----------------------------------------------------------------------
 * 08-06-2021         DuyHV9           Create
 */


export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
