import { h } from "preact";
import { ReactNode } from "preact/compat";
import classNames from "classnames";
import "./index.scss";

interface ButtonProps extends h.JSX.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "success"
    | "danger"
    | "tertiary"
    | "purple";
  onClick?: () => void;
  href?: string;
  dimension?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export default function Button(props: ButtonProps) {
  const { children, variant } = props;
  const Node: any = props.href ? "a" : "button";

  const classes = classNames(props.className, "base-button", {
    "base-button--primary": variant === "primary",
    "base-button--secondary": variant === "secondary",
    "base-button--outline": variant === "outline",
    "base-button--success": variant === "success",
    "base-button--danger": variant === "danger",
    "base-button--tertiary": variant === "tertiary",
    "base-button--purple": variant === "purple",
    "base-button--loading": props.isLoading,
  });

  return (
    <Node {...props} className={classes}>
      {props.isLoading ? (
        <>
          Please wait...
          <Spinner />
        </>
      ) : (
        children
      )}
    </Node>
  );
}

export const Spinner = () => {
  return (
    // prettier-ignore
    <svg className="base-spinner" viewBox="0 0 16 16" fill="none">
      <path d="M8 1V3.80002" stroke="black" stroke-linecap="round" stroke-linejoin="round" style="--index: 1"/>
      <path d="M8 12.2V15" stroke="black" stroke-linecap="round" stroke-linejoin="round" style="--index: 5"/>
      <path d="M3.05078 3.05103L5.03179 5.03204" stroke="black" stroke-linecap="round" stroke-linejoin="round" style="--index: 8"/>
      <path d="M10.9678 10.968L12.9488 12.949" stroke="black" stroke-linecap="round" stroke-linejoin="round" style="--index: 4"/>
      <path d="M1 8H3.80002" stroke="black" stroke-linecap="round" stroke-linejoin="round" style="--index: 7"/>
      <path d="M12.2012 8H15.0012" stroke="black" stroke-linecap="round" stroke-linejoin="round" style="--index: 3"/>
      <path d="M3.05078 12.949L5.03179 10.968" stroke="black" stroke-linecap="round" stroke-linejoin="round" style="--index: 6"/>
      <path d="M10.9678 5.03204L12.9488 3.05103" stroke="black" stroke-linecap="round" stroke-linejoin="round" style="--index: 2"/>
    </svg>
  );
};
