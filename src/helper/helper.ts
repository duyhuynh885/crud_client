/**
 * Helper
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
export const handleError = (error: any) =>
  (error.response && error.response.data && error.response.data.message) ||
  error.message ||
  error.toString();
