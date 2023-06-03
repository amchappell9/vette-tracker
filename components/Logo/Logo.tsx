import mainLogoLarge from "@/public/images/vette-tracker-main-logo-cropped-2000x1500.png";
import invertedLogoLarge from "@/public/images/vette-tracker-inverted-color-cropped-2000x1500.png";
import Image from "next/image";

type LogoProps = {
  variant?: "default" | "inverted";
  className?: string;
};

const Logo = ({ variant = "default", className }: LogoProps) => {
  if (variant === "inverted") {
    return (
      <Image
        src={invertedLogoLarge}
        alt="Vette Tracker Logo"
        className={className}
        height={40}
      />
    );
  }

  return (
    <Image
      src={mainLogoLarge}
      alt="Vette Tracker Logo"
      className={className}
      height={40}
    />
  );
};

export default Logo;
