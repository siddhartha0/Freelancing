import { User } from "react-feather";
import { Icon as CustomIcon, Text } from "../../units";
import { useLayoutContent } from "../../context";
import React from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Navbar = React.memo(() => {
  const context = useLayoutContent();
  const location = useLocation();

  return (
    <main className="flex justify-between ">
      <section id="left-side" className="flex place-items-center gap-6 ">
        <Icon
          icon="hugeicons:menu-03"
          width={24}
          color="#s40189D"
          onClick={() => context?.setSidebarStatus((prev) => !prev)}
        />
        <Text size="header" classNAME="capitalize">
          {location.pathname == "/" ? "Dashboard" : location.pathname.slice(1)}
        </Text>
      </section>

      <section className="flex place-items-center gap-3 ">
        <div className="bg-white p-2 flex place-items-center justify-center place-self-center rounded-full">
          <CustomIcon name={User} />
        </div>
        <div className="flex flex-col">
          <Text>Xinu</Text>
          <Text size="tiny">Admin</Text>
        </div>
      </section>
    </main>
  );
});
