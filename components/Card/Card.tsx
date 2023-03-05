import { cva, VariantProps } from "class-variance-authority";

const card = cva("mt-4 w-full rounded bg-white drop-shadow-lg", {
  variants: {
    padding: {
      default: "px-8 py-8 sm:px-16",
      none: "",
    },
  },
  defaultVariants: {
    padding: "default",
  },
});

export type CardVariants = VariantProps<typeof card>;

export type CardPaddingVariants = NonNullable<CardVariants["padding"]>;

type CardProps = {
  children: React.ReactNode;
  padding?: "default" | "none";
  className?: string;
};

const Card = ({ children, padding = "default" }: CardProps): JSX.Element => {
  return <div className={card({ padding })}>{children}</div>;
};

export default Card;
