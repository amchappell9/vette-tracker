import { render } from "@testing-library/react";
import Footer from "./Footer";

it("renders my name", () => {
  const { getByText } = render(<Footer />);
  getByText(/austin chappell/i);
});
