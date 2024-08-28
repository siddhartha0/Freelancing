import * as icon from "react-feather";
import React from "react";

interface IconPropTypes {
  name: icon.Icon;
  onClick?: () => void;
  cursor?: string;
  className?: string;
  iconSize?: number;
  textColor?: string;
}

export const Icon = React.memo(
  ({
    name,
    iconSize = 26,
    onClick,
    cursor = "pointer",
    textColor = "#3E4954",
    className = "hover:animate-jiggle",
  }: IconPropTypes) => {
    const Names = name;
    return (
      <Names
        size={iconSize}
        color={textColor}
        cursor={cursor}
        onClick={onClick}
        className={className}
      />
    );
  }
);
