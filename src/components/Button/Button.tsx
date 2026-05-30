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
  const { buttonSize, intent, widthBehavior, className } = props;
  const styles = buttonStyles({ buttonSize, intent, widthBehavior, className });

  if (props.as === "link") {
    // Strip CVA-only props so React doesn't forward unknown attributes to the DOM.
    const {
      as,
      buttonSize: _buttonSize,
      intent: _intent,
      widthBehavior: _widthBehavior,
      className: _className,
      ...rest
    } = props;

    return (
      <Link {...rest} className={styles}>
        {props.children}
      </Link>
    );
  }

  // Strip CVA-only props so React doesn't forward unknown attributes to the DOM.
  const {
    buttonSize: _buttonSize,
    intent: _intent,
    widthBehavior: _widthBehavior,
    className: _className,
    ...rest
  } = props;

  return (
    <button {...rest} className={styles}>
      {props.children}
    </button>
  );
};

export default Button;
