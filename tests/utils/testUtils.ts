import { prettyDOM } from "@testing-library/react";

// https://testing-library.com/docs/dom-testing-library/api-debugging
export function logElement(element: Element | HTMLDocument): void {
  console.log(prettyDOM(element));
}
