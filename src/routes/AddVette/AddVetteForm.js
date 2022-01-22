import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import FormFieldErrorMessage from "../../components/FormFieldErrorMessage";
import SubModelRadioButton from "./SubModelRadioButton";
import TrimRadioButton from "./TrimRadioButton";
import PackageCheckbox from "./PackageCheckbox";

import SUBMODELS from "../../constants/SUBMODELS";
import TRIMS from "../../constants/TRIMS";
import PACKAGES from "../../constants/PACKAGES";

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

const AddVetteForm = ({ onSubmit, vetteToEditInfo }) => {
  const formik = useFormik({
    initialValues: {
      year:
        vetteToEditInfo && vetteToEditInfo.year ? vetteToEditInfo.year : "2014",
      miles:
        vetteToEditInfo && vetteToEditInfo.miles ? vetteToEditInfo.miles : "",
      cost: vetteToEditInfo && vetteToEditInfo.cost ? vetteToEditInfo.cost : "",
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
      trim: vetteToEditInfo && vetteToEditInfo.trim ? vetteToEditInfo.trim : "",
      packages:
        vetteToEditInfo && vetteToEditInfo.packages
          ? vetteToEditInfo.packages
          : [],
      link: vetteToEditInfo && vetteToEditInfo.link ? vetteToEditInfo.link : "",
    },
    enableReinitialize: true,
    validationSchema: addVetteFormValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <div className="px-16 py-4">
      <p className="text-gray-700 mb-8">
        Add your info about your potential Vette here. The more Vettes you
        enter, the easier it is to spot trends!
      </p>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-6 gap-8">
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Year</label>
          <Select
            className="w-full bg-gray-50 text-lg py-2 px-4"
            options={["2014", "2015", "2016", "2017", "2018", "2019"]}
            {...formik.getFieldProps("year")}
          />
          {formik.touched.year && formik.errors.year ? (
            <FormFieldErrorMessage
              errorMessage={formik.errors.year}
              className="mt-1"
            />
          ) : null}
        </div>
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Miles</label>
          <Input
            id="miles"
            name="miles"
            haserror={formik.touched.miles && formik.errors.miles}
            {...formik.getFieldProps("miles")}
            className="w-full bg-gray-50 text-lg py-2 px-4"
          />
          {formik.touched.miles && formik.errors.miles ? (
            <FormFieldErrorMessage
              errorMessage={formik.errors.miles}
              className="mt-1"
            />
          ) : null}
        </div>
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Cost</label>
          <Input
            id="cost"
            name="cost"
            className="w-full bg-gray-50 text-lg py-2 px-4"
            {...formik.getFieldProps("cost")}
          />
          {formik.touched.cost && formik.errors.cost ? (
            <FormFieldErrorMessage
              errorMessage={formik.errors.cost}
              className="mt-1"
            />
          ) : null}
        </div>
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Transmission</label>
          <Select
            className="w-full bg-gray-50 text-lg py-2 px-4"
            options={["Manual", "Automatic"]}
            {...formik.getFieldProps("transmissionType")}
          />
          {formik.touched.transmissionType && formik.errors.transmissionType ? (
            <FormFieldErrorMessage
              errorMessage={formik.errors.transmissionType}
              className="mt-1"
            />
          ) : null}
        </div>
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Exterior Color</label>
          <Select
            className="w-full bg-gray-50 text-lg py-2 px-4"
            options={["Artic White"]}
            {...formik.getFieldProps("exteriorColor")}
          />
          {formik.touched.exteriorColor && formik.errors.exteriorColor ? (
            <FormFieldErrorMessage
              errorMessage={formik.errors.exteriorColor}
              className="mt-1"
            />
          ) : null}
        </div>
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Interior Color</label>
          <Select
            className="w-full bg-gray-50 text-lg py-2 px-4"
            options={["Red"]}
            {...formik.getFieldProps("interiorColor")}
          />
          {formik.touched.interiorColor && formik.errors.interiorColor ? (
            <FormFieldErrorMessage
              errorMessage={formik.errors.interiorColor}
              className="mt-1"
            />
          ) : null}
        </div>
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Submodel</label>
          <div className="grid grid-cols-2 gap-8">
            {SUBMODELS.map((submodel) => (
              <SubModelRadioButton
                key={submodel.title}
                name="submodel"
                className="col-span-1"
                title={submodel.title}
                engine={submodel.engine}
                hp={submodel.hp}
                torque={submodel.torque}
                features={submodel.features}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                selectedValue={formik.values.submodel}
              />
            ))}
          </div>
          {formik.touched.submodel && formik.errors.submodel ? (
            <FormFieldErrorMessage
              errorMessage={formik.errors.submodel}
              className="mt-2"
            />
          ) : null}
        </div>
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Trim</label>
          <div className="grid grid-cols-3 gap-8">
            {TRIMS.map((trim) => (
              <TrimRadioButton
                key={trim.title}
                name="trim"
                className=""
                title={trim.title}
                features={trim.features}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                selectedValue={formik.values.trim}
              />
            ))}
          </div>
          {formik.touched.trim && formik.errors.trim ? (
            <FormFieldErrorMessage
              errorMessage={formik.errors.trim}
              className="mt-2"
            />
          ) : null}
        </div>
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Packages</label>
          <div className="shadow">
            {PACKAGES.map((packageObj) => (
              <PackageCheckbox
                key={packageObj.value}
                name="packages"
                className=""
                title={packageObj.title}
                value={packageObj.value}
                checked={formik.values.packages.includes(packageObj.value)}
                description={packageObj.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            ))}
          </div>
        </div>
        <div className="col-span-6">
          <label className="block font-bold text-lg mb-1">Link</label>
          <Input
            id="link"
            name="link"
            className="w-full bg-gray-50 text-lg py-2 px-4"
            {...formik.getFieldProps("link")}
          />
        </div>
        <div className="col-span-6 text-right">
          <Button type="reset" variant="secondary" className="mr-2">
            Clear
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting ? true : false}
          >
            {vetteToEditInfo ? "Edit Vette" : "Add Vette"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVetteForm;
