import { OverrideProps } from "@/src/utils/typeHelpers";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

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

type ButtonProps = VariantProps<typeof buttonStyles> &
  OverrideProps<
    ComponentProps<"button">,
    {
      className?: string;
    }
  >;

const Button = ({
  children,
  buttonSize,
  intent,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonStyles({ buttonSize, intent, className })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
