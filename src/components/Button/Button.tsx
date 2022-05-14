type ButtonSize = "normal" | "large" | "full";

type ButtonSizes = {
  NORMAL: ButtonSize;
  LARGE: ButtonSize;
  FULL: ButtonSize;
};

const BUTTON_SIZES: ButtonSizes = {
  NORMAL: "normal",
  LARGE: "large",
  FULL: "full",
};

type ButtonVariant = "red" | "secondary";

type ButtonVariants = {
  RED: ButtonVariant;
  SECONDARY: ButtonVariant;
};

const BUTTON_VARIANTS: ButtonVariants = {
  RED: "red",
  SECONDARY: "secondary",
};

const getSizeClasses = (size: ButtonSize) => {
  let sizeClasses = "";

  switch (size) {
    case BUTTON_SIZES.LARGE:
      sizeClasses = "px-12 py-6 font-bold text-3xl drop-shadow-md";
      break;

    case BUTTON_SIZES.FULL:
      sizeClasses = "w-full py-3 font-bold text-xl drop-shadow-sm";
      break;

    // Defaults to BUTTON_SIZES.NORMAL
    default:
      sizeClasses = "px-6 py-2 text-lg drop-shadow-sm";
      break;
  }

  return sizeClasses;
};

const getVariantClasses = (variant: ButtonVariant) => {
  let variantClasses = "";

  switch (variant) {
    case BUTTON_VARIANTS.SECONDARY:
      variantClasses =
        "bg-white hover:bg-gray-100 text-gray-800 border rounded border-gray-300 transition-colors";
      break;

    // Defaults to BUTTON_VARIANTS.RED
    default:
      variantClasses =
        "bg-red-500 hover:bg-red-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-700 transition-colors";
      break;
  }

  return variantClasses;
};

type ButtonProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
};

const Button = ({
  children,
  size = BUTTON_SIZES.NORMAL,
  variant = BUTTON_VARIANTS.RED,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${
        typeof className !== "undefined" && className
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
