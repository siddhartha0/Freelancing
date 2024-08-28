import React from "react";

interface guiderPropTypes {
  path: string;
  title: string;
  textSize?: "medium" | "header" | "small";
  className: string;
}

export const Guider = React.memo(
  ({ path, title, textSize = "medium", className }: guiderPropTypes) => {
    return (
      <button
        className={`text-${textSize} text-text-secondaryBrand ${className} no-underline`}
        onClick={() => {
          const element = document.getElementById(path);
          element?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        {title}
      </button>
    );
  }
);
