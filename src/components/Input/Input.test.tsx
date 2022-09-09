import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

it("formats miles correctly", async () => {
  const user = userEvent.setup();
  const { getByDisplayValue, getByRole } = render(
    <Input name="test" maskType="miles" />
  );
  const input = getByRole("textbox");

  await user.click(input);
  await user.keyboard("1234567");

  expect(getByDisplayValue("1,234,567")).toBeInTheDocument();
});
