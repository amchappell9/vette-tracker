import * as z from "zod";

/**
 * Helper type to override default props for a given component.
 *
 * Useful for overriding DOM props for a custom component.
 * Example:
 * type ButtonProps = OverrideProps<React.ButtonHTMLAttributes<HTMLButtonElement>, {
 * className?: string;
 * }>;
 *
 * https://www.totaltypescript.com/tutorials/react-with-typescript/components/overriding-and-removing-component-props/solution
 */
export type OverrideProps<T, TOverridden> = Omit<T, keyof TOverridden> &
  TOverridden;

export function isValidZodLiteralUnion<T extends z.ZodLiteral<unknown>>(
  literals: T[]
): literals is [T, T, ...T[]] {
  return literals.length >= 2;
}

/**
 * A helper to workaround issues with creating a union of literals in Zod from a
 * mapped constant.
 *
 * https://github.com/colinhacks/zod/issues/831#issuecomment-1773734131
 * @param literals
 * @returns
 */
export function constructZodLiteralUnionType<T extends z.ZodLiteral<unknown>>(
  literals: T[]
) {
  if (!isValidZodLiteralUnion(literals)) {
    throw new Error(
      "Literals passed do not meet the criteria for constructing a union schema, the minimum length is 2"
    );
  }
  return z.union(literals);
}

/**
 * A utility type that takes an object type and makes the hover overlay more readable.
 *
 * https://www.totaltypescript.com/concepts/the-prettify-helper
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
