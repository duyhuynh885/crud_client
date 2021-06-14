import { isAuth } from "../../helper/auth";


/**
 * WrapAdmin
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
 * 07-06-2021       DuyHV9           Component
 */
const WrapAdmin = ({ component: Component}) =>
  isAuth() && isAuth().roles[0] === "ROLE_ADMIN" ? (
    <Component />
  ) : null;

export default WrapAdmin;
