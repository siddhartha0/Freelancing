import { Briefcase, DollarSign, Package, User } from "react-feather";

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
    title: "Jobs",
    icon: Briefcase,
    path: "/jobs",
  },
  {
    id: 4,
    title: "Payments",
    icon: DollarSign,
    path: "/payment",
  },
];
