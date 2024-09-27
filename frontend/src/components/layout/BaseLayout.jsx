import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const BaseLayout = () => {
  return (
    <main className="page-wrapper" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content-wrapper" style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </main>
  );
};

export default BaseLayout;
