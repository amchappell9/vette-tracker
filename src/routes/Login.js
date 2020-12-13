import React from "react";
import { useHistory, useLocation } from "react-router-dom";

export const Login = ({ handleAuth }) => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  return (
    // <Container>
    //   <Row>
    //     <Col xs="12">
    //       <Card className="text-center">
    //         <Card.Body>
    //           <Card.Title>Login</Card.Title>
    //           <Card.Text>Click below to login</Card.Text>
    //           <Button
    //             onClick={() => {
    //               handleAuth((response) => {
    //                 console.log(response);
    //                 history.replace(from);
    //               });
    //             }}
    //           >
    //             Login
    //           </Button>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
    <>
      <h2>Login</h2>
    </>
  );
};
