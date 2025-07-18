import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { prettyDOM } from "@testing-library/react";

// Create a custom render function that includes React Query Provider
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  queryClient?: QueryClient;
}

function customRender(ui: ReactElement, options: CustomRenderOptions = {}) {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// https://testing-library.com/docs/dom-testing-library/api-debugging
export function logElement(element: Element | HTMLDocument): void {
  console.log(prettyDOM(element));
}

// Re-export everything from testing-library/react
export * from "@testing-library/react";

// Override the default render with our custom render
export { customRender as render, createTestQueryClient };
