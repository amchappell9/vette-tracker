import React, { act } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddVetteForm from "./AddVetteForm";
import { VetteObject } from "@/src/types";

describe("AddVetteForm", () => {
  test("renders form with default values", () => {
    render(<AddVetteForm handleSubmit={jest.fn} />);
    expect(screen.getByLabelText("Link")).toHaveValue("");
    expect(screen.getByLabelText("Year")).toHaveValue("2014");
    expect(screen.getByLabelText("Transmission")).toHaveValue("Manual");
    expect(screen.getByLabelText("Exterior Color")).toHaveValue("Arctic White");
    expect(screen.getByLabelText("Interior Color")).toHaveValue("Jet Black");
    expect(screen.getByLabelText("Miles")).toHaveValue("");
    expect(screen.getByLabelText("Cost")).toHaveValue("");
  });

  test("renders form with vetteToEditInfo values", () => {
    const vetteToEditInfo: VetteObject = {
      id: "1234567890",
      date: "2021-01-01",
      userId: "1234567890",
      link: "https://example.com",
      year: "2015",
      submodel: "Z06",
      trim: "3LT",
      packages: ["Z07", "CFZ"],
      transmissionType: "Automatic",
      exteriorColor: "Laguna Blue",
      interiorColor: "Black",
      miles: "10000",
      cost: "50000",
    };

    render(
      <AddVetteForm handleSubmit={jest.fn} editVetteValues={vetteToEditInfo} />
    );

    expect(screen.getByLabelText("Link")).toHaveValue("https://example.com");
    expect(screen.getByLabelText("Year")).toHaveValue("2015");
    expect(screen.getByRole("radio", { name: /Z06/i })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("radio", { name: /3LT/i })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByLabelText("Transmission")).toHaveValue("Automatic");
    expect(screen.getByLabelText("Exterior Color")).toHaveValue("Laguna Blue");
    expect(screen.getByLabelText("Interior Color")).toHaveValue("Jet Black");
    expect(screen.getByLabelText("Miles")).toHaveValue("10,000");
    expect(screen.getByLabelText("Cost")).toHaveValue("$50,000");
  });

  test("submits form with correct values", async () => {
    const handleSubmit = jest.fn();

    render(<AddVetteForm handleSubmit={handleSubmit} />);
    const user = userEvent.setup();

    await act(async () => {
      await user.type(
        screen.getByRole("textbox", { name: /link/i }),
        "https://example.com"
      );

      await user.selectOptions(
        screen.getByRole("combobox", { name: /year/i }),
        ["2015"]
      );

      await user.click(screen.getByRole("radio", { name: /Z06/i }));
      await user.click(screen.getByRole("radio", { name: /3LT/i }));

      await user.click(screen.getByLabelText(/Magnetic Ride Control/i));
      await user.click(screen.getByLabelText(/NPP Exhaust/i));
      await user.click(screen.getByLabelText(/Performance Data Recorder/i));

      await user.selectOptions(
        screen.getByRole("combobox", { name: /transmission/i }),
        ["Automatic"]
      );

      await user.selectOptions(
        screen.getByRole("combobox", { name: /exterior color/i }),
        ["Laguna Blue"]
      );

      await user.selectOptions(
        screen.getByRole("combobox", { name: /interior color/i }),
        ["Ash Gray"]
      );

      await user.type(screen.getByRole("textbox", { name: /miles/i }), "72000");
      await user.type(screen.getByRole("textbox", { name: /cost/i }), "45000");
    });

    expect(screen.getByLabelText("Link")).toHaveValue("https://example.com");
    expect(screen.getByLabelText("Year")).toHaveValue("2015");
    expect(screen.getByRole("radio", { name: /Z06/i })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("radio", { name: /3LT/i })).toHaveAttribute(
      "aria-checked",
      "true"
    );

    expect(screen.getByLabelText("Transmission")).toHaveValue("Automatic");
    expect(screen.getByLabelText("Exterior Color")).toHaveValue("Laguna Blue");
    expect(screen.getByLabelText("Interior Color")).toHaveValue("Ash Gray");
    expect(screen.getByLabelText("Miles")).toHaveValue("72,000");
    expect(screen.getByLabelText("Cost")).toHaveValue("$45,000");

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /add vette/i }));
    });

    expect(handleSubmit).toHaveBeenCalledWith({
      link: "https://example.com",
      year: "2015",
      submodel: "Z06",
      trim: "3LT",
      packages: ["MRC", "NPP", "PDR"],
      transmissionType: "Automatic",
      exteriorColor: "Laguna Blue",
      interiorColor: "Ash Gray",
      miles: "72,000",
      cost: "$45,000",
    });
  });

  test("resets form values", async () => {
    render(<AddVetteForm handleSubmit={jest.fn} />);
    const user = userEvent.setup();

    await act(async () => {
      await user.type(
        screen.getByRole("textbox", { name: /link/i }),
        "https://example.com"
      );
      await user.selectOptions(
        screen.getByRole("combobox", { name: /year/i }),
        ["2015"]
      );
      await user.click(screen.getByRole("radio", { name: /Z06/i }));
      await user.click(screen.getByRole("radio", { name: /3LT/i }));
      await user.click(screen.getByLabelText(/Magnetic Ride Control/i));
      await user.click(screen.getByLabelText(/NPP Exhaust/i));
      await user.click(screen.getByLabelText(/Performance Data Recorder/i));
      await user.selectOptions(
        screen.getByRole("combobox", { name: /transmission/i }),
        ["Automatic"]
      );
      await user.selectOptions(
        screen.getByRole("combobox", { name: /exterior color/i }),
        ["Laguna Blue"]
      );
      await user.selectOptions(
        screen.getByRole("combobox", { name: /interior color/i }),
        ["Ash Gray"]
      );
      await user.type(screen.getByRole("textbox", { name: /miles/i }), "72000");
      await user.type(screen.getByRole("textbox", { name: /cost/i }), "45000");
    });

    expect(screen.getByLabelText("Link")).toHaveValue("https://example.com");
    expect(screen.getByLabelText("Year")).toHaveValue("2015");
    expect(screen.getByRole("radio", { name: /Z06/i })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("radio", { name: /3LT/i })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByLabelText("Transmission")).toHaveValue("Automatic");
    expect(screen.getByLabelText("Exterior Color")).toHaveValue("Laguna Blue");
    expect(screen.getByLabelText("Interior Color")).toHaveValue("Ash Gray");
    expect(screen.getByLabelText("Miles")).toHaveValue("72,000");
    expect(screen.getByLabelText("Cost")).toHaveValue("$45,000");

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /clear/i }));
    });

    expect(screen.getByLabelText("Link")).toHaveValue("");
    expect(screen.getByLabelText("Year")).toHaveValue("2014");
    expect(screen.queryByRole("radio", { name: /Z06/i })).toBeNull();
    expect(screen.getByRole("radio", { name: /3LT/i })).toHaveAttribute(
      "aria-checked",
      "false"
    );
    expect(screen.getByLabelText("Transmission")).toHaveValue("Manual");
    expect(screen.getByLabelText("Exterior Color")).toHaveValue("Arctic White");
    expect(screen.getByLabelText("Interior Color")).toHaveValue("Jet Black");
    expect(screen.getByLabelText("Miles")).toHaveValue("");
    expect(screen.getByLabelText("Cost")).toHaveValue("");
  });

  test("renders edit vette values properly", async () => {
    const vetteToEditInfo: VetteObject = {
      id: "1234567890",
      date: "2021-01-01",
      userId: "1234567890",
      link: "https://example.com",
      year: "2015",
      submodel: "Z06",
      trim: "3LT",
      packages: ["Z07", "CFZ"],
      transmissionType: "Automatic",
      exteriorColor: "Laguna Blue",
      interiorColor: "Black",
      miles: "10000",
      cost: "50000",
    };

    render(
      <AddVetteForm handleSubmit={jest.fn} editVetteValues={vetteToEditInfo} />
    );

    expect(screen.getByLabelText("Link")).toHaveValue("https://example.com");
    expect(screen.getByLabelText("Year")).toHaveValue("2015");
    expect(screen.getByRole("radio", { name: /Z06/i })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByRole("radio", { name: /3LT/i })).toHaveAttribute(
      "aria-checked",
      "true"
    );
    expect(screen.getByLabelText("Transmission")).toHaveValue("Automatic");
    expect(screen.getByLabelText("Exterior Color")).toHaveValue("Laguna Blue");
    expect(screen.getByLabelText("Interior Color")).toHaveValue("Jet Black");
    expect(screen.getByLabelText("Miles")).toHaveValue("10,000");
    expect(screen.getByLabelText("Cost")).toHaveValue("$50,000");

    expect(screen.getByRole("button", { name: /edit vette/i }));
  });
});
