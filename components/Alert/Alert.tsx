import {
  ExclamationIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { cva, VariantProps } from "class-variance-authority";

const alertStyles = cva("rounded border-l-4 p-4", {
  variants: {
    alertType: {
      info: "bg-blue-50 border-blue-400",
      success: "bg-green-50 border-green-400",
      warning: "bg-yellow-50 border-yellow-400",
      danger: "bg-red-50 border-red-400",
    },
  },
  defaultVariants: {
    alertType: "danger",
  },
});

const alertTextStyles = cva("text-sm", {
  variants: {
    alertType: {
      info: "text-blue-700",
      success: "text-green-700",
      warning: "text-yellow-700",
      danger: "text-red-700",
    },
  },
});

type AlertStyles = VariantProps<typeof alertStyles>;

type AlertType = Exclude<AlertStyles["alertType"], undefined | null>;

const getIconByType = (alertType: AlertType) => {
  switch (alertType) {
    case "info":
      return (
        <InformationCircleIcon
          className="text-blue-400 h-5 w-5"
          aria-hidden="true"
        />
      );

    case "success":
      return (
        <CheckCircleIcon
          className="h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );

    case "warning":
      return (
        <ExclamationIcon
          className="h-5 w-5 text-yellow-400"
          aria-hidden="true"
        />
      );

    case "danger":
      return (
        <ExclamationCircleIcon
          className="h-5 w-5 text-red-400"
          aria-hidden="true"
        />
      );

    default:
      throw new Error(`Unknown alert type: ${alertType}`);
  }
};

type AlertProps = {
  alertType: AlertType;
  message: string;
  className?: string;
};

const Alert = ({ alertType, message, className }: AlertProps) => {
  return (
    <div className={alertStyles({ alertType, className })} role="alert" aria-live="polite">
      <div className="flex">
        <div className="flex-shrink-0">
          {getIconByType(alertType)}
        </div>
        <div className="ml-3">
          <p className={alertTextStyles({ alertType })}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
