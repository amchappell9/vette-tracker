import React from "react";
import { Link } from "react-router-dom";

/**
 * This could be designed much better
 */
const ConfirmationView = ({ formValues, handleSubmitAnother }) => {
  return (
    <div className="mt-5">
      <h1 className="text-center">Vette Added!</h1>
      {/* <Card bg="light" className="mt-4">
        <Card.Body as={Container}>
          <Row className="mb-4">
            <Col>
              <div className="text-center font-weight-bold">
                <h3>{`${formValues.year} Chevrolet Corvette ${formValues.submodel}`}</h3>
              </div>
            </Col>
          </Row>
          <Row className="pb-4">
            <Col xs={2}></Col>
            <Col>
              <div className="card-item">
                <span>{`$${formValues.cost}`}</span>
              </div>
              <div className="card-item">
                <span>{`${formValues.miles} Miles`}</span>
              </div>
              <div className="card-item">
                <span>
                  <a href={formValues.link}>Listing</a>
                </span>
              </div>
            </Col>
            <Col>
              <div className="card-item">
                <span>{formValues.exteriorColor}</span>
              </div>
              <div className="card-item">
                <span>{formValues.interiorColor}</span>
              </div>
              <div className="card-item">
                <span>{formValues.trim}</span>
              </div>
            </Col>
            <Col>
              <div className="card-item">
                <span>
                  NPP:{" "}
                  {typeof formValues.packages.npp !== "undefined"
                    ? "true"
                    : "false"}
                </span>
              </div>
              <div className="card-item">
                <span>
                  MRC:{" "}
                  {typeof formValues.packages.mrc !== "undefined"
                    ? "true"
                    : "false"}
                </span>
              </div>
              <div className="card-item">
                <span>
                  PDR:{" "}
                  {typeof formValues.packages.pdr !== "undefined"
                    ? "true"
                    : "false"}
                </span>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row className="mt-4">
        <Col>
          <Button
            onClick={handleSubmitAnother}
            size="lg"
            block
            className="mx-auto"
            variant="outline-primary"
          >
            Submit Another
          </Button>
        </Col>
        <Col>
          <Button size="lg" block as={Link} to="/vettes">
            View All Vettes
          </Button>
        </Col>
      </Row> */}
    </div>
  );
};

export default ConfirmationView;
