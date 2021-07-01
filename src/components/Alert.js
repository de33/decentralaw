import { useState } from "react";
import { Alert, Button } from "react-bootstrap";

const AlertDismissible = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>Hey! That's you!</Alert.Heading>
        <p>
          Click the 'Sign' button to create a permanet, time-stamped record of
          your signature.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me!
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
};

export default AlertDismissible;
