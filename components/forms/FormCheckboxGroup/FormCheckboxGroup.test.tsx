import { beforeEach, vi, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormCheckboxGroup from "./FormCheckboxGroup";
import { Form, Formik } from "formik";
import packages from "../../../constants/packages";
import PackageCheckbox from "../../../routes/AddVette/PackageCheckbox/PackageCheckbox";

// Reset the mock function before each test
beforeEach(() => {
  vi.resetAllMocks();
});

const handleSubmit = vi.fn();

const ErrorMessage = "Please select at least one package";

type MockFormProps = {
  onSubmit: (values: { packages: string[] }) => void;
};

const MockForm = ({ onSubmit }: MockFormProps) => {
  return (
    <Formik
      initialValues={{ packages: [] }}
      onSubmit={(values) => onSubmit(values)}
      validate={(values) => {
        console.log("in validate");

        if (values.packages.length === 0) {
          console.log("packages length: ", values.packages.length);
          return { packages: ErrorMessage };
        }
      }}
    >
      {(props) => (
        <Form>
          <>{console.log("errors", props.errors)}</>
          {/* <>{console.log(props.isValid)}</> */}
          <FormCheckboxGroup name="packages" label="Packages" groupClassName="">
            {(name: string) =>
              packages.map((packageObj) => (
                <PackageCheckbox
                  key={packageObj.value}
                  name={name}
                  className=""
                  title={packageObj.title}
                  value={packageObj.value}
                  description={packageObj.description}
                />
              ))
            }
          </FormCheckboxGroup>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

test("users can select multiple options in a form", async () => {
  render(<MockForm onSubmit={handleSubmit} />);

  const user = userEvent.setup();

  // Check that label has text of "Packages"
  expect(screen.getByText("Packages")).toBeTruthy();

  // User clicks on a checkbox
  await user.click(screen.getByText("Magnetic Ride Control"));
  await user.click(screen.getByText("NPP Exhaust"));

  // User clicks on submit button
  await user.click(screen.getByText("Submit"));

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({ packages: ["MRC", "NPP"] });
  });
});
