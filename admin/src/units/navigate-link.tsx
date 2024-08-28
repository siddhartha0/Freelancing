import { Link } from "react-router-dom";
import classname from "classnames";

interface linkPropTypes {
  path: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  textSize: "medium" | "header" | "small";
  className?: string;
}

export const NavigateLink = ({
  path,
  title,
  textSize = "medium",
  className,
  onClick = () => console.log("hello"),
}: linkPropTypes) => {
  return (
    <Link
      to={path}
      className={classname(` text-text-secondaryBrand ${className}`, {
        "text-xl": textSize == "medium",
        "text-2xl": textSize == "header",
        "text-base": textSize == "small",
      })}
      onClick={(e) => onClick(e)}
    >
      {title}
    </Link>
  );
};
