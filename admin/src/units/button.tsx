import classname from "classnames";
import React from "react";

interface propTypes
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: "medium" | "small" | "large";
  children: React.ReactNode;
  usage?: "info" | "pop-up" | "complete" | "danger";
}

export const Button = React.memo(
  ({ size = "medium", usage = "info", children, ...other }: propTypes) => {
    return (
      <button
        className={classname("", {
          "py-[10px] px-[16px] text-[14.5px]": size == "medium",
          "py-[7px] px-[16px] text-[13px]": size == "small",
          "py-[15px] px-[24px] text-[16px]": size == "large",
          "bg-secondary hover:animate-fade-in hover:bg-brand ": usage == "info",
          "bg-brand hover:animate-fade-in ": usage == "pop-up",
          "bg-complete hover:animate-fade-in ": usage == "complete",
          "bg-love hover:animate-fade-in ": usage == "danger",
        })}
        {...other}
      >
        {children}
      </button>
    );
  }
);
