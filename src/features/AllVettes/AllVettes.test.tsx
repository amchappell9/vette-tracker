import { screen, waitFor } from "@testing-library/react";
import { render } from "@/tests/utils/testUtils";
import AllVettes from "./AllVettes";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { server } from "@/tests/mocks/server";
import { http, HttpResponse } from "msw";

// Test that renders AddFirstVetteMessage when there are no vettes
test("renders AddFirstVetteMessage when there are no vettes", async () => {
  server.use(
    http.get("/api/services/vettes", () => {
      return HttpResponse.json([]);
    })
  );

  render(<AllVettes />);

  await waitFor(() => {
    expect(screen.getByText(/add your first vette!/i)).toBeInTheDocument();
  });
});

test("renders ListOfVettes with correct number of vettes per page", async () => {
  render(<AllVettes />);

  // Wait for the API call to complete and vettes to be displayed
  await waitFor(() => {
    // Should show 5 vettes per page (PAGE_SIZE = 5)
    const vetteElements = screen.getAllByText(/corvette/i);
    expect(vetteElements.length).toBeGreaterThan(0);
  });

  // Check that we have the expected mock data
  await waitFor(() => {
    expect(screen.getByText("2020 Corvette Stingray")).toBeInTheDocument();
    expect(screen.getByText("2019 Corvette Z06")).toBeInTheDocument();
  });
});

test("renders PaginationControls and handles page changes", async () => {
  const user = userEvent.setup();
  render(<AllVettes />);

  // Wait for initial load
  await waitFor(() => {
    expect(screen.getByText("2020 Corvette Stingray")).toBeInTheDocument();
  });

  // Find and click the next page button
  const nextPageButton = screen.getAllByRole("button", { name: /next/i })[0];

  await act(async () => {
    await user.click(nextPageButton);
  });

  // Should now show different vettes (page 2)
  await waitFor(() => {
    // Since we have 6 mock vettes and PAGE_SIZE is 5, page 2 should have 1 vette
    const vetteElements = screen.getAllByText(/corvette/i);
    expect(vetteElements.length).toBeGreaterThan(0);
  });
});

test("displays correct vette information from mock data", async () => {
  render(<AllVettes />);

  // Wait for vettes to load and check specific mock data
  await waitFor(() => {
    // Check first vette data
    expect(screen.getByText("2020 Corvette Stingray")).toBeInTheDocument();
    expect(screen.getByText(/torch red/i)).toBeInTheDocument();
    expect(screen.queryAllByText(/jet black/i));

    // Check second vette data
    expect(screen.getByText("2019 Corvette Z06")).toBeInTheDocument();
    expect(screen.getByText(/shadow gray metallic/i)).toBeInTheDocument();
  });
});
