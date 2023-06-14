import { cva, VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { ComponentProps, PropsWithChildren } from "react";

const buttonStyles = cva("", {
  variants: {
    intent: {
      primary:
        "bg-red-500 hover:bg-red-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-700 transition-colors",
      secondary:
        "bg-white hover:bg-gray-100 text-gray-800 border rounded border-gray-300 transition-colors",
    },
    buttonSize: {
      default: "px-6 py-2 text-lg drop-shadow-sm",
      large: "px-12 py-6 font-bold text-3xl drop-shadow-md",
      full: "w-full py-3 font-bold text-xl drop-shadow-sm",
    },
  },
  defaultVariants: {
    intent: "primary",
    buttonSize: "default",
  },
});

type ButtonAsButtonProps = { as?: "button" } & ComponentProps<"button"> &
  VariantProps<typeof buttonStyles>;

type ButtonAsLinkProps = {
  as: "link";
  className?: string;
} & PropsWithChildren<LinkProps> &
  VariantProps<typeof buttonStyles>;

const Button = (props: ButtonAsButtonProps | ButtonAsLinkProps) => {
  const { buttonSize, intent, className } = props;
  const styles = buttonStyles({ buttonSize, intent, className });

  if (props.as === "link") {
    const { as, ...rest } = props;

    return (
      <Link {...rest} className={styles}>
        {props.children}
      </Link>
    );
  }

  return (
    <button {...props} className={styles}>
      {props.children}
    </button>
  );
};

export default Button;
