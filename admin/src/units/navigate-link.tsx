import { Link } from "react-router-dom";
import classname from "classnames";
import React from "react";

interface linkPropTypes {
  path: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  textSize?: "medium" | "header" | "small";
  className?: string;
  children?: React.ReactNode;
}

export const NavigateLink = React.memo(
  ({ path, textSize = "medium", className, children }: linkPropTypes) => {
    return (
      <Link
        to={path}
        className={classname(` text-text-secondaryBrand ${className}`, {
          "text-xl": textSize == "medium",
          "text-2xl": textSize == "header",
          "text-base": textSize == "small",
        })}
      >
        {children}
      </Link>
    );
  }
);
