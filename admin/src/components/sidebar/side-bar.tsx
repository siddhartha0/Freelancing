import { NavPaths } from "../../constant";
import companyLogo from "../../assets/images/companyLogo.png";
import { Icon, NavigateLink, Text } from "../../units";
import React from "react";

export const Sidebar = React.memo(() => {
  return (
    <main className="flex flex-col bg-brand gap-8 place-items-center h-[100vh] p-8 overflow-x-scroll">
      <img src={companyLogo} alt="logo" className="h-10" />

      <section className=" flex flex-col gap-10">
        {NavPaths.map((nav) => (
          <NavigateLink
            path={nav.path}
            key={nav.id + nav.title}
            className="flex place-items-center gap-4"
          >
            <Icon name={nav.icon} textColor="#fff" />
            <Text usage="secondary" size="medium">
              {nav.title}
            </Text>
          </NavigateLink>
        ))}
      </section>
    </main>
  );
});
