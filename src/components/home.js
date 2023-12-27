import React, { useState } from "react";
import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Row, Col, Card } from "react-bootstrap";

export const Home = ({ pKey, coreId }) => {
  const [initialLoad, SetInitialLoad] = useState(true);
  const [result, setResult] = useState([]);
  const url = window.env.API_BASE_URL + "?key=" + pKey;
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(url, {
    share: true,
    shouldReconnect: () => true,
  });

  // Run when the connection state (readyState) changes
  useEffect(() => {
    if (readyState === ReadyState.OPEN && initialLoad) {
      sendJsonMessage({ cmd: "getresult", key: pKey, coreid: coreId });
      SetInitialLoad(false);
    }
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.status === "noprofile") {
        window.location.replace(lastJsonMessage.url);
      } else if (Array.isArray(lastJsonMessage.result) && lastJsonMessage.result.length)
        setResult((prev) => prev.concat(lastJsonMessage.result));
    }
  }, [readyState, initialLoad, sendJsonMessage, lastJsonMessage, pKey, coreId]);

  if (initialLoad)
    return (
      <Row className="justify-content-md-center">
        <Col className="col-5">
          <Card className="mt-3 no-card-border">
            <Card.Body>
              <Card.Text>
                Please wait while we are looking for your magazine cover ...
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="images/wait.png" title="waiting..." />
          </Card>
        </Col>
      </Row>
    );

  if (result.length === 0)
    return (
      <Row className="justify-content-md-center">
        <Col className="col-5">
          <Card className="mt-3 no-card-border">
            <Card.Body>
              <Card.Text>Please wait while your magazine cover is building...</Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="images/wait.png" title="waiting..." />
          </Card>
        </Col>
      </Row>
    );

  return (
    <Row className="justify-content-md-center">
      {result.map((item) => (
        <Col key={item.key} className="col-4">
          <Card className="mt-3">
            <Card.Img variant="top" src={item.value} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
