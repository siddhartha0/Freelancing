import { NavPaths } from "../../constant";
import companyLogo from "../../assets/images/companyLogo.png";
import { Icon, NavigateLink, Text } from "../../units";
import React from "react";
import classnames from "classnames";
import { useLayoutContent } from "../../context";

export const Sidebar = React.memo(() => {
  const context = useLayoutContent();

  return (
    <main className=" w-52 flex flex-col  gap-8 place-items-center    h-screen overflow-x-scroll">
      <img src={companyLogo} alt="logo" className="h-10 mt-8" />

      <section className=" flex flex-col gap-10 ml-5  mt-4 pl-6 ">
        {NavPaths.map((nav) => (
          <NavigateLink
            path={nav.path}
            key={nav.id + nav.title}
            className={classnames("flex  place-items-center gap-4 mr-2 pr-4", {
              "bg-primary text-purple-800 rounded-s-full  flex items-center w-52 pl-4 pt-4 pb-4 animate-slide-in-right  ":
                context?.currentPath === nav.title,
            })}
            onClick={() => {
              context?.setCurrentPath(nav.title);
              const element = document.getElementById(nav.title);
              element?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <Icon
              name={nav.icon}
              textColor={context?.currentPath === nav.title ? "#111" : "#fff"}
            />
            <Text
              usage={context?.currentPath === nav.title ? "brand" : "secondary"}
              size="medium"
            >
              {nav.title}
            </Text>
          </NavigateLink>
        ))}
      </section>
    </main>
  );
});
