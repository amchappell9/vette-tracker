import { Formik } from "formik";
import * as Yup from "yup";

import Button from "../../components/Button";
import SubModelRadioButton from "./SubModelRadioButton";
import TrimRadioButton from "./TrimRadioButton";
import PackageCheckbox from "./PackageCheckbox";
import exteriorColors from "../../constants/exteriorColors";
import interiorColors from "../../constants/interiorColors";
// import submodels from "../../constants/submodels";
import submodels from "../../constants/SUBMODELS";
import trims from "../../constants/trims";
import packages from "../../constants/packages";
import FormInput from "../../components/forms/FormInput";
import FormSelect from "../../components/forms/FormSelect";
import FormRadioGroup from "../../components/forms/FormRadioGroup";
import FormCheckboxGroup from "../../components/forms/FormCheckboxGroup";
import ExteriorColorSelect from "./ExteriorColorSelect";

const addVetteFormValidationSchema = Yup.object({
  year: Yup.string().required(),
  miles: Yup.number("Miles must be a number").required("Please enter miles"),
  cost: Yup.number().required("Please enter cost of Vette"),
  transmissionType: Yup.string().required(),
  exteriorColor: Yup.string().required(),
  interiorColor: Yup.string().required(),
  submodel: Yup.string().required("Please select a submodel"),
  trim: Yup.string().required("Please select a trim"),
});

const AddVetteForm = ({ handleSubmit, vetteToEditInfo }) => {
  return (
    <div className="sm:py-4 sm:px-4 lg:px-16">
      <p className="mb-8 text-gray-700">
        Add your info about your potential Vette here. The more Vettes you
        enter, the easier it is to spot trends!
      </p>
      <Formik
        initialValues={{
          year:
            vetteToEditInfo && vetteToEditInfo.year
              ? vetteToEditInfo.year
              : "2014",
          miles:
            vetteToEditInfo && vetteToEditInfo.miles
              ? vetteToEditInfo.miles
              : "",
          cost:
            vetteToEditInfo && vetteToEditInfo.cost ? vetteToEditInfo.cost : "",
          transmissionType:
            vetteToEditInfo && vetteToEditInfo.transmissionType
              ? vetteToEditInfo.transmissionType
              : "Manual",
          exteriorColor:
            vetteToEditInfo && vetteToEditInfo.exteriorColor
              ? vetteToEditInfo.exteriorColor
              : "Artic White",
          interiorColor:
            vetteToEditInfo && vetteToEditInfo.interiorColor
              ? vetteToEditInfo.interiorColor
              : "Red",
          submodel:
            vetteToEditInfo && vetteToEditInfo.submodel
              ? vetteToEditInfo.submodel
              : "",
          trim:
            vetteToEditInfo && vetteToEditInfo.trim ? vetteToEditInfo.trim : "",
          packages:
            vetteToEditInfo && vetteToEditInfo.packages
              ? vetteToEditInfo.packages
              : [],
          link:
            vetteToEditInfo && vetteToEditInfo.link ? vetteToEditInfo.link : "",
        }}
        enableReinitialize={true}
        validationSchema={addVetteFormValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(props) => (
          <form
            onSubmit={props.handleSubmit}
            className="grid grid-cols-6 gap-8"
          >
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

            {/* Miles */}
            <div className="col-span-6">
              <FormInput name="miles" type="text" label="Miles" />
            </div>

            {/* Cost */}
            <div className="col-span-6">
              <FormInput name="cost" type="text" label="Cost" />
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
                allExteriorColorOptions={exteriorColors}
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

            {/* Submodel */}
            <div className="col-span-6">
              <FormRadioGroup
                name="submodel"
                label="Submodel"
                radioGroupClassName="grid grid-cols-1 gap-8 lg:grid-cols-2"
              >
                {(name) =>
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
              >
                {(name) =>
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
                {(name) =>
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

            {/* Link */}
            <div className="col-span-6">
              <FormInput name="link" type="text" label="Link" />
            </div>

            {/* Submission Buttons */}
            <div className="col-span-6 flex flex-row-reverse justify-between gap-2 md:justify-start">
              <Button
                type="submit"
                variant="primary"
                disabled={props.isSubmitting ? true : false}
              >
                {vetteToEditInfo ? "Edit Vette" : "Add Vette"}
              </Button>
              <Button type="reset" variant="secondary">
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
