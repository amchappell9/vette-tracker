import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  year: yup.string().required(),
  miles: yup.number("Miles must be a number").required("Please enter Miles"),
  cost: yup.number("Cost should be a number").required("Cost is required"),
  exteriorColor: yup.string().required(),
  interiorColor: yup.string().required(),
  submodel: yup.string().required(),
  trim: yup.string().required(),
  link: yup.string().required(),
});

const AddVetteForm = ({ onSubmit }) => {
  return (
    <>
      <h2>Add Vette Form</h2>
    </>
  );
};

/*
  <Formik
        initialValues={{
          year: "2014",
          miles: "",
          cost: "",
          exteriorColor: "Artic White",
          interiorColor: "Red",
          submodel: "Base",
          trim: "1LT",
          packages: [],
          link: "",
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          
        }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                as="select"
                name="year"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Miles</Form.Label>
              <Form.Control
                type="text"
                name="miles"
                placeholder="Enter Miles"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.miles}
                isValid={touched.miles && !errors.miles}
                isInvalid={touched.miles && !!errors.miles}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.miles}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="text"
                name="cost"
                placeholder="Enter Cost"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cost}
                isValid={touched.cost && !errors.cost}
                isInvalid={touched.cost && !!errors.cost}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.cost}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Exterior Color</Form.Label>
              <Form.Control
                as="select"
                name="exteriorColor"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="Artic White">Artic White</option>
                <option value="Torch Red">Torch Red</option>
                <option value="Black">Black</option>
                <option value="Cyber Grey">Cyber Grey</option>
                <option value="Laguna Blue">Laguna Blue</option>
                <option value="Crystal Red">Crystal Red</option>
                <option value="Velocity Yellow">Velocity Yellow</option>
                <option value="Blade Silver">Blade Silver</option>
                <option value="Night Race Blue">Night Race Blue</option>
                <option value="Lime Rock Green">Lime Rock Green</option>
                <option value="Daytona Sunrise Orange">
                  Daytona Sunrise Orange
                </option>
                <option value="Shark Grey">Shark Grey</option>
                <option value="Admrial Blue">Admrial Blue</option>
                <option value="Corvette Racing Yellow">
                  Corvette Racing Yellow
                </option>
                <option value="Long Beach Red">Long Beach Red</option>
                <option value="Watkins Glen Grey">Watkins Glen Grey</option>
                <option value="Sterling Blue">Sterling Blue</option>
                <option value="Black Rose">Black Rose</option>
                <option value="Ceramic Matrix Grey">Ceramic Matrix Grey</option>
                <option value="Sebring Orange">Sebring Orange</option>
                <option value="Shadow Grey">Shadow Grey</option>
                <option value="Elkhart Lake Blue">Elkhart Lake Blue</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Interior Color</Form.Label>
              <Form.Control
                as="select"
                name="interiorColor"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="Red">Red</option>
                <option value="Black">Black</option>
                <option value="Grey">Grey</option>
                <option value="Kalahari">Kalahari</option>
                <option value="Tension Blue">Tension Blue</option>
                <option value="Twillight Blue">Twillight Blue</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Submodel</Form.Label>
              <Form.Control
                as="select"
                name="submodel"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="Base">Base</option>
                <option value="Z51">Z51</option>
                <option value="Grand Sport">Grand Sport</option>
                <option value="Z06">Z06</option>
                <option value="ZR1">ZR1</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Trim</Form.Label>
              <Form.Control
                as="select"
                name="trim"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="1LT">1LT</option>
                <option value="2LT">2LT</option>
                <option value="3LT">3LT</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Packages</Form.Label>
              <Form.Check
                type="checkbox"
                name="packages"
                value="npp"
                label="NPP"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Check
                type="checkbox"
                name="packages"
                value="mrc"
                label="MRC"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Check
                type="checkbox"
                name="packages"
                value="pdr"
                label="PDR"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Listing Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a link to the listing"
                name="link"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.link}
                isValid={touched.link && !errors.link}
                isInvalid={touched.link && !!errors.link}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.link}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="float-right"
            >
              Add Vette
            </Button>
          </Form>
        )}
      </Formik>
*/

export default AddVetteForm;
