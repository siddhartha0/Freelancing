import { DollarSign, Package, Server, User } from "react-feather";

export const NavPaths = [
  {
    id: 1,
    title: "Dashboard",
    icon: Package,
    path: "/",
  },
  {
    id: 2,
    title: "Users",
    icon: User,
    path: "/user",
  },
  {
    id: 3,
    title: "Projects",
    icon: Server,
    path: "/projects",
  },
  {
    id: 4,
    title: "Payments",
    icon: DollarSign,
    path: "/payment",
  },
];
