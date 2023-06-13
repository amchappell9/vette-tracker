/**
 * Helper type to override default props for a given component.
 *
 * Useful for overriding DOM props for a custom component.
 * Example:
 * type ButtonProps = OverrideProps<React.ButtonHTMLAttributes<HTMLButtonElement>, {
 * className?: string;
 * }>;
 */
export type OverrideProps<T, TOverridden> = Omit<T, keyof TOverridden> &
  TOverridden;
