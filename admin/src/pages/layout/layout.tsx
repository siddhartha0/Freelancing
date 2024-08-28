import { Navbar, Sidebar } from "../../components";
import { Outlet } from "react-router-dom";
import classnames from "classnames";
import { useLayoutContent } from "../../context";
import React from "react";

export const Layout = React.memo(() => {
  const context = useLayoutContent();
  return (
    <main className="flex bg-primary">
      <section
        className={classnames("fixed   top-0 animate-fade-in", {
          hidden: !context?.sidebarStatus,
        })}
      >
        <Sidebar />
      </section>

      <section
        className={classnames("flex ml-52 flex-col p-4 ", {
          "-ml-2": context?.sidebarStatus == false,
        })}
      >
        <Navbar />
        <Outlet />
      </section>
    </main>
  );
});
