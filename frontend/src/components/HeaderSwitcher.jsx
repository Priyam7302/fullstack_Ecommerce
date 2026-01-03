import { useLocation } from "react-router-dom";
import UserHeader from "../user/UserHeader";
import AdminHeader from "../admin/AdminHeader";

function HeaderSwitcher() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? <AdminHeader /> : <UserHeader />;
}

export default HeaderSwitcher;
