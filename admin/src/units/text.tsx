import classname from "classnames";

interface propTypes
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: "header" | "medium" | "small";
  children: React.ReactNode;
  usage?: "brand" | "primary" | "secondary";
  classNAME?: string;
}

export const Text = ({
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
        "text-[12px]": size === "small",
        "text-text-brand": usage == "brand",
        "text-text-primary": usage == "primary",
        "text-text-secondary": usage == "secondary",
      })}
      {...other}
    >
      {children}
    </p>
  );
};
