import { Navbar, Sidebar } from "../../components";
import { Outlet } from "react-router-dom";
import classnames from "classnames";
import { useLayoutContent } from "../../context";

export const Layout = () => {
  const context = useLayoutContent();

  return (
    <main className="flex bg-primary">
      <section
        className={classnames("fixed   bg-brand top-0 animate-fade-in", {
          hidden: !context?.sidebarStatus,
        })}
      >
        <Sidebar />
      </section>

      <section
        className={classnames(
          "flex ml-52 flex-col min-h-screen p-4 w-full gap-5 ",
          {
            "ml-2": context?.sidebarStatus == false,
          }
        )}
      >
        <Navbar />
        <Outlet />
      </section>
    </main>
  );
};
