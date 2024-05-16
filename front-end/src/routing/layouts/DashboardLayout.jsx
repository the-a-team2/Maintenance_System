import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// custom components
import GridParent from "../../components/layout/GridParent";
import GridItem from "../../components/layout/GridItem";
import SidebarContainer from "../../components/dashboard/SidebarContainer";
import Navbar from "../../components/dashboard/Navbar";
// data
import SidebarData from "../../components/dashboard/SidebarData";
// styles
import "./style.scss";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = { user: { name: "User", role: "user" } }; //useSelector((state) => state.auth.user) for later
  const [sidebarButtons, setSidebarButtons] = useState(SidebarData.userButtons);

  // Adjust sidebarButtons state if needed when user role changes
  console.log(sidebarButtons);
  return (
    <GridParent className={"main-dashboard-container"}>
      {sidebarOpen && (
        <SidebarContainer buttons={sidebarButtons} sidebarOpen={sidebarOpen} />
      )}

      <GridItem xs={12} className="main">
        <Navbar />
        <Outlet /> {/* Nested routes will be rendered here */}
      </GridItem>
    </GridParent>
  );
};

export default DashboardLayout;
