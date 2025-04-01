import { cva, VariantProps } from "class-variance-authority";
import Link, { LinkProps } from "next/link";
import { ComponentProps, PropsWithChildren } from "react";

const buttonStyles = cva("text-center", {
  variants: {
    intent: {
      primary:
        "bg-red-500 hover:bg-red-600 text-white rounded-sm focus:outline-hidden focus:ring-2 focus:ring-red-700 transition-colors",
      secondary:
        "bg-white hover:bg-gray-100 text-gray-800 border rounded-sm border-gray-300 transition-colors",
    },
    buttonSize: {
      default: "px-6 py-2 text-lg drop-shadow-xs",
      small: "px-4 py-2 text-base font-medium drop-shadow-xs",
      large: "px-12 py-6 font-bold text-3xl drop-shadow-md",
    },
    widthBehavior: {
      default: "w-full sm:w-auto",
    },
  },
  defaultVariants: {
    intent: "primary",
    buttonSize: "default",
    widthBehavior: "default",
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
