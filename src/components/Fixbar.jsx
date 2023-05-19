import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./global/Topbar";
import SidebarMenu from "./global/Sidebar";

function Fixbar() {
  const [isSidebar, setIsSidebar] = useState(true);

  // if (loading) {
  //   return (
  //     <center>
  //       <Audio
  //         height="90vh"
  //         width="100%"
  //         radius="9"
  //         color={colors.grey[100]}
  //         ariaLabel="three-dots-loading"
  //         wrapperStyle
  //         wrapperClass
  //       />
  //     </center>
  //   );
  // } else if (error) {
  //   return alert("Something went Wrong");
  // }
  return (
    <div className="app">
      <SidebarMenu isSidebar={isSidebar} />
      <main className="content" >
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet />
      </main>
    </div>
  );
}

export default Fixbar;
