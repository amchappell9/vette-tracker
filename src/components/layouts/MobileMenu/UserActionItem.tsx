// This type could be better
// It should enforce the props of the component passed to the `as` prop
type UserActionItemProps = {
  as?: React.ElementType;
  icon: React.ElementType;
  text: string;
  onClick?: () => void;
  href?: string;
};

const UserActionItem = ({
  as: Component = "button",
  icon: Icon,
  text,
  onClick,
  href,
}: UserActionItemProps) => {
  return (
    <li>
      <Component
        onClick={onClick}
        href={href}
        className="-mx-2 flex w-full items-center gap-2 rounded-sm px-2 py-2 text-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2"
      >
        <Icon className="h-6" />
        <span>{text}</span>
      </Component>
    </li>
  );
};

export default UserActionItem;
