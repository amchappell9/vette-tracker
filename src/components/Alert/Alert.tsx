import {
  ExclamationIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

type AlertType = "info" | "success" | "warning" | "danger";

export const ALERT_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
};

const getMainStylesByType = (alertType: AlertType) => {
  switch (alertType) {
    case ALERT_TYPES.INFO:
      return "bg-blue-50 border-blue-400";

    case ALERT_TYPES.SUCCESS:
      return "bg-green-50 border-green-400";

    case ALERT_TYPES.WARNING:
      return "bg-yellow-50 border-yellow-400";

    case ALERT_TYPES.DANGER:
      return "bg-red-50 border-red-400";

    default:
      return "";
  }
};

const getTextStylesByType = (alertType: AlertType) => {
  switch (alertType) {
    case ALERT_TYPES.INFO:
      return "text-blue-700";

    case ALERT_TYPES.SUCCESS:
      return "text-green-700";

    case ALERT_TYPES.WARNING:
      return "text-yellow-700";

    case ALERT_TYPES.DANGER:
      return "text-red-700";

    default:
      return "";
  }
};

const getIconByType = (alertType: AlertType) => {
  switch (alertType) {
    case ALERT_TYPES.INFO:
      return (
        <InformationCircleIcon
          className="text-blue-400 h-5 w-5"
          aria-hidden="true"
        />
      );

    case ALERT_TYPES.SUCCESS:
      return (
        <CheckCircleIcon
          className="h-5 w-5 text-green-500"
          aria-hidden="true"
        />
      );

    case ALERT_TYPES.WARNING:
      return (
        <ExclamationIcon
          className="h-5 w-5 text-yellow-400"
          aria-hidden="true"
        />
      );

    case ALERT_TYPES.DANGER:
      return (
        <ExclamationCircleIcon
          className="h-5 w-5 text-red-400"
          aria-hidden="true"
        />
      );

    default:
      break;
  }
};

type AlertProps = {
  alertType: AlertType;
  message: string;
  className: string;
};

const Alert = ({ alertType, message, className }: AlertProps) => {
  return (
    <div
      className={`rounded border-l-4 p-4 ${getMainStylesByType(
        alertType
      )} ${className}`}
    >
      <div className="flex">
        <div className="flex-shrink-0">{getIconByType(alertType)}</div>
        <div className="ml-3">
          <p className={`text-sm ${getTextStylesByType(alertType)}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
