import "./LoginPage.css";
import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const url = window.env.API_BASE_URL;
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(url, {
    share: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.status === "lookup") {
        window.location.href = "/?key=" + lastJsonMessage.result;
      } else if (lastJsonMessage.status === "noprofile") {
        setError(
          "Please make sure you are using the same email as your event registration."
        );
      }
    }
  }, [lastJsonMessage]);

  const handleSubmit = useCallback(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({ cmd: "lookup", email });
    }
  }, [email, readyState, sendJsonMessage]);

  return (
    <div className="root">
      <div className="main-container d-flex align-items-center justify-content-center">
        <div>
          <div>
            <p className="text-center login-heading-text fw-bolder">
              The future of higher education awaits.
            </p>

            <div className="d-flex flex-column align-items-center">
              <div className="mt-4">
                <input
                  className="input-field"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="display-5 mt-5 error-text">{error}</p>
                <button className="button-style" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>

            <p className="text-center mt-5 display-6">
              Enter your email to start creating your magazine
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
