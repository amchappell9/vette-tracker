import { z } from "zod";
import { render, screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import FormCheckboxGroup from "./FormCheckboxGroup";
import userEvent from "@testing-library/user-event";

describe("FormCheckboxGroup", () => {
  const defaultProps = {
    label: "Test Label",
    name: "test",
    children: (name: string) => (
      <>
        <input type="checkbox" name={name} value="option1" />
        <input type="checkbox" name={name} value="option2" />
      </>
    ),
  };

  const validationSchema = z.object({
    test: z.array(z.string()).refine((val) => val.includes("option2"), {
      message: "The selected option must include 'option2'",
    }),
  });

  const renderComponent = (props = {}) => {
    return render(
      <Formik
        initialValues={{
          test: [],
        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          console.log("Submitting");
        }}
      >
        <Form>
          <FormCheckboxGroup {...defaultProps} {...props} />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );
  };

  it("renders the label", () => {
    renderComponent();
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders children with correct name prop", () => {
    renderComponent();
    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes).toHaveLength(2);

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveAttribute("name", "test");
    });
  });

  it("applies custom groupClassName when provided", () => {
    const groupClassName = "custom-class";
    renderComponent({ groupClassName });
    const formGroup = screen.getByRole("group");
    expect(formGroup).toHaveClass(groupClassName);
  });
});
