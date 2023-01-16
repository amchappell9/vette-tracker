import mainLogoSmall from "../../images/vette-tracker-main-logo-cropped-800x600.png";
import mainLogoLarge from "../../images/vette-tracker-main-logo-cropped-2000x1500.png";
import invertedLogoSmall from "../../images/vette-tracker-inverted-color-cropped800x600.png";
import invertedLogoLarge from "../../images/vette-tracker-inverted-color-cropped-2000x1500.png";
import logoIconSmall from "../../images/VetteTrackerLogoSymbol800x600.png";
import logoIconLarge from "../../images/VetteTrackerLogoSymbol2000x1500.png";

type LogoProps = {
  variant?: "default" | "inverted" | "icon";
  className?: string;
};

const Logo = ({ variant = "default", className }: LogoProps) => {
  if (variant === "icon") {
    return (
      <img
        srcSet={`${logoIconSmall}, ${logoIconLarge} 2x`}
        src={logoIconLarge}
        className={className}
        alt="Vette Tracker Logo Icon"
      />
    );
  }

  if (variant === "inverted") {
    return (
      <img
        srcSet={`${invertedLogoSmall}, ${invertedLogoLarge} 2x`}
        src={invertedLogoLarge}
        className={className}
        alt="Vette Tracker Logo"
      />
    );
  }

  return (
    <img
      srcSet={`${mainLogoSmall}, ${mainLogoLarge} 2x`}
      src={mainLogoLarge}
      className={className}
      alt="Vette Tracker Logo"
    />
  );
};

export default Logo;
