// import React from "react";
import axios, { CancelTokenSource } from "axios";

// const cancelToken = axios.CancelToken; //create cancel token
// const [cancelTokenSource, setCancelTokenSource]: [
//   CancelTokenSource,
//   (cancelTokenSource: CancelTokenSource) => void
// ] = React.useState(cancelToken.source());

export default axios.create({
  baseURL: "http://localhost:8080/api",
  // cancelToken: cancelTokenSource.token,
  headers: {
    "Content-type": "application/json",
  },
  // timeout: 10000,
});
