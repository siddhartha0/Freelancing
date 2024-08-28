import { Menu, User } from "react-feather";
import { Icon, Text } from "../../units";
import { useLayoutContent } from "../../context";
import React from "react";

export const Navbar = React.memo(() => {
  const context = useLayoutContent();

  return (
    <main className="flex justify-between ">
      <section id="left-side" className="flex place-items-center gap-6 ">
        <Icon
          name={Menu}
          onClick={() => context?.setSidebarStatus((prev) => !prev)}
          iconSize={24}
          textColor="#40189D"
        />
        <Text size="header">Dashboard</Text>
      </section>

      <section className="flex place-items-center gap-3 ">
        <div className="bg-white p-2 flex place-items-center justify-center place-self-center rounded-full">
          <Icon name={User} />
        </div>
        <div className="flex flex-col">
          <Text>Xinu</Text>
          <Text size="small">Admin</Text>
        </div>
      </section>
    </main>
  );
});
