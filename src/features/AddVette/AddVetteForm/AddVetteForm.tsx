import { Formik } from "formik";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

import SubModelRadioButton from "../SubModelRadioButton/SubModelRadioButton";
import TrimRadioButton from "../TrimRadioButton/TrimRadioButton";
import PackageCheckbox from "../PackageCheckbox/PackageCheckbox";
import exteriorColors from "../../../constants/exteriorColors";
import interiorColors from "../../../constants/interiorColors";
import submodels from "../../../constants/submodels";
import trims from "../../../constants/trims";
import packages from "../../../constants/packages";
import FormInput from "@/src/components/forms/FromInput/FormInput";
import FormSelect from "@/src/components/forms/FormSelect/FormSelect";
import FormRadioGroup from "@/src/components/forms/FormRadioGroup/FormRadioGroup";
import FormCheckboxGroup from "@/src/components/forms/FormCheckboxGroup/FormCheckboxGroup";
import ExteriorColorSelect from "../ExteriorColorSelect/ExteriorColorSelect";
import { VetteValues } from "@/src/types";
import Button from "@/src/components/Button/Button";
import { formatVetteValues, getValuesFromLink } from "./addVetteFormHelpers";

const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  YEAR: "Please enter a year",
  MILES: "Miles must be a number",
  URL: "Please enter a valid URL. Ex: https://www.google.com",
};

const defaultVetteValues = {
  link: "",
  year: "2014",
  submodel: "",
  trim: "",
  packages: [],
  transmissionType: "Manual",
  exteriorColor: "Artic White",
  interiorColor: "Red",
  miles: "",
  cost: "",
};

const addVetteFormValidationSchema = z.object({
  link: z.string().url({ message: VALIDATION_MESSAGES.URL }).optional(),
  year: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }),
  submodel: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }),
  trim: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }),
  transmissionType: z.string({
    required_error: VALIDATION_MESSAGES.REQUIRED,
  }),
  exteriorColor: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }),
  interiorColor: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED }),
  miles: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED })
    .regex(/^(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)$/, VALIDATION_MESSAGES.MILES),
  cost: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED })
    .regex(/^\$(\d*\.?\d+|\d{1,3}(,\d{3})*(\.\d+)?)$/, "DOES NOT MEET REGEX"),
});

type AddVetteFormProps = {
  handleSubmit: (values: VetteValues) => void;
  editVetteValues?: VetteValues;
};

const AddVetteForm = ({ handleSubmit, editVetteValues }: AddVetteFormProps) => {
  const isEdit = Boolean(editVetteValues);
  const formattedEditVetteValues = editVetteValues
    ? formatVetteValues(editVetteValues)
    : undefined;

  return (
    <div className="sm:py-4 sm:px-4 lg:px-16">
      <p className="mb-8 text-gray-700">
        Add your info about your potential Vette here. The more Vettes you
        enter, the easier it is to spot trends!
      </p>
      <Formik
        initialValues={formattedEditVetteValues || defaultVetteValues}
        enableReinitialize={true}
        validationSchema={toFormikValidationSchema(
          addVetteFormValidationSchema
        )}
        onSubmit={(values: VetteValues) => handleSubmit(values)}
      >
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="grid grid-cols-6 gap-8"
          >
            {/* Link */}
            <div className="col-span-6">
              <FormInput
                onPaste={(event) => {
                  // When a user pastes in a link, try and parse out some values
                  // from it
                  const values = getValuesFromLink(
                    event.clipboardData.getData("Text")
                  );

                  // Strip out properties that are undefined, otherwise they cause issues
                  // with formik
                  const formattedValues = Object.fromEntries(
                    Object.entries(values).filter(([_, v]) => v !== undefined)
                  );

                  if (formattedValues) {
                    props.setValues({
                      ...props.values,
                      ...formattedValues,
                    });
                  }
                }}
                name="link"
                type="text"
                label="Link"
              />
            </div>

            {/* Year */}
            <div className="col-span-6">
              <FormSelect
                label="Year"
                name="year"
                options={[
                  { label: "2014", value: "2014" },
                  { label: "2015", value: "2015" },
                  { label: "2016", value: "2016" },
                  { label: "2017", value: "2017" },
                  { label: "2018", value: "2018" },
                  { label: "2019", value: "2019" },
                ]}
              />
            </div>
            {/* Submodel */}
            <div className="col-span-6">
              <FormRadioGroup
                name="submodel"
                label="Submodel"
                radioGroupClassName="grid grid-cols-1 gap-8 lg:grid-cols-2"
                labelClassName="font-bold mb-2 text-lg block"
              >
                {(name: string) =>
                  submodels
                    .filter((submodel) =>
                      submodel.years.includes(props.values.year)
                    )
                    .map((submodel) => (
                      <SubModelRadioButton
                        key={submodel.title}
                        name={name}
                        className="col-span-1"
                        title={submodel.title}
                        engine={submodel.engine}
                        hp={submodel.hp}
                        torque={submodel.torque}
                        features={submodel.features}
                      />
                    ))
                }
              </FormRadioGroup>
            </div>
            {/* Trim */}
            <div className="col-span-6">
              <FormRadioGroup
                name="trim"
                label="Trim"
                radioGroupClassName="grid grid-cols-1 gap-8 lg:grid-cols-3"
                labelClassName="font-bold mb-2 text-lg block"
              >
                {(name: string) =>
                  trims.map((trim) => (
                    <TrimRadioButton
                      key={trim.title}
                      name={name}
                      className=""
                      title={trim.title}
                      features={trim.features}
                    />
                  ))
                }
              </FormRadioGroup>
            </div>
            {/* Packages */}
            <div className="col-span-6">
              <FormCheckboxGroup name="packages" label="Packages">
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
            </div>
            {/* Tranmission */}
            <div className="col-span-6">
              <FormSelect
                label="Transmission"
                name="transmissionType"
                options={[
                  { label: "Manual", value: "Manual" },
                  { label: "Automatic", value: "Automatic" },
                ]}
              />
            </div>
            {/* Exterior Color */}
            <div className="col-span-6">
              <ExteriorColorSelect
                label="Exterior Color"
                name="exteriorColor"
                year={props.values.year}
                exteriorColors={exteriorColors}
              />
            </div>
            {/* Interior Color */}
            <div className="col-span-6">
              <FormSelect
                label="Interior Color"
                name="interiorColor"
                options={interiorColors.map((ic) => {
                  return { label: ic, value: ic };
                })}
              />
            </div>
            {/* Miles */}
            <div className="col-span-6">
              <FormInput
                maskType="miles"
                name="miles"
                type="text"
                label="Miles"
              />
            </div>
            {/* Cost */}
            <div className="col-span-6">
              <FormInput
                maskType="dollar"
                name="cost"
                type="text"
                label="Cost"
              />
            </div>
            {/* Submission Buttons */}
            <div className="col-span-6 flex flex-row-reverse justify-between gap-2 md:justify-start">
              <Button
                type="submit"
                intent="primary"
                disabled={props.isSubmitting ? true : false}
              >
                {isEdit ? "Edit Vette" : "Add Vette"}
              </Button>
              <Button
                onClick={props.handleReset}
                type="reset"
                intent="secondary"
              >
                Clear
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddVetteForm;
