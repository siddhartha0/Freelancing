import classname from "classnames";
import React from "react";

interface propTypes
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: "header" | "medium" | "small" | "tiny";
  children: React.ReactNode;
  usage?: "brand" | "primary" | "secondary";
  classNAME?: string;
}

export const Text = React.memo(
  ({
    size = "medium",
    children,
    usage = "brand",
    classNAME,
    ...other
  }: propTypes) => {
    return (
      <p
        className={classname(`${classNAME}`, {
          "text-[28px]": size == "header",
          "text-[18px]": size === "medium",
          "text-[15px]": size === "small",
          "text-[13px]": size === "tiny",

          "text-text-brand": usage == "brand",
          "text-text-primary": usage == "primary",
          "text-text-secondary": usage == "secondary",
        })}
        {...other}
      >
        {children}
      </p>
    );
  }
);
