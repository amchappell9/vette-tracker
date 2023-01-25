import { cva, VariantProps } from "class-variance-authority";

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

interface ButtonStyleProps extends VariantProps<typeof buttonStyles> {}

interface ButtonProps
  extends React.HTMLProps<HTMLButtonElement>,
    ButtonStyleProps {
  children: React.ReactNode;

  // I don't know why this was necessary
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  // intent?: "primary" | "secondary";
  // size?: "default" | "large" | "full";
}

const Button = ({
  children,
  buttonSize,
  intent,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonStyles({ buttonSize, intent, className })}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
