import { Menu } from "react-feather";
import { Icon, Text } from "../../units";
import { useLayoutContent } from "../../context";

export const Navbar = () => {
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

      <section className="flex place-items-center gap-6 "></section>
    </main>
  );
};
