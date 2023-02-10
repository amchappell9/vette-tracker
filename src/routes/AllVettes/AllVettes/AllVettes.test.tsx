import { afterAll, afterEach, beforeAll, expect, it } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import AllVettes from "./AllVettes";
import { VetteObject } from "../../../types/types";
import { MemoryRouter } from "react-router-dom";

const exampleVettes: VetteObject[] = [
  {
    year: "2014",
    miles: "20000",
    cost: "46000",
    transmissionType: "Manual",
    exteriorColor: "Laguna Blue",
    interiorColor: "Red",
    submodel: "Z51",
    trim: "3LT",
    packages: ["NPP", "MRC"],
    link: "https://www.corvetteforum.com/forums/c7-corvettes-for-sale/4613494-2014-z51-m7-3lt-mag-ride-laguna-blue-21k-mi-46000-nc.html",
    id: "324888926111138385",
    date: "03-01-2022",
    userId: "35467dac-767d-48b2-ac3c-e1e08e30b581",
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const server = setupServer(
  rest.get("/.netlify/functions/vettes", (req, res, ctx) => {
    return res(ctx.json({ vettes: exampleVettes }));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();

  // Clear the cache between tests
  queryClient.clear();
});
afterAll(() => server.close());

// Renders vettes
it("renders vettes", async () => {
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AllVettes setHeaderInfo={() => null} />
      </QueryClientProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    // expect(screen.getByText("2014 Corvette")).toBeInTheDocument();
  });
});

it("renders first vette message when there are no vettes", async () => {
  server.use(
    rest.get("/.netlify/functions/vettes", (req, res, ctx) => {
      return res(ctx.json({ vettes: [] }));
    })
  );

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AllVettes setHeaderInfo={() => null} />
      </QueryClientProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    // expect(screen.getByText("Add your first Vette!")).toBeInTheDocument();
  });
});

// Shows error
it("shows error", async () => {
  server.use(
    rest.get("/.netlify/functions/vettes", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AllVettes setHeaderInfo={() => null} />
      </QueryClientProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText("Request failed with status code 500"));
    // ).toBeInTheDocument();
  });
});
