import React, { useCallback, useState } from "react";
import { v4 as uuid4 } from "uuid";
import ThankYou from "../ThankYou/ThankYou";
import "./MagazineDetails.css";
import useWebSocket, { ReadyState } from "react-use-websocket";

const MagazineDetails = ({
  coverDetails,
  setIsShowDetails,
  setSelectedCover,
  setResult,
  url,
  pKey,
  coreId,
}) => {
  const [isPublished, setIsPublished] = useState(false);
  const { sendJsonMessage, readyState } = useWebSocket(url, {
    share: true,
    shouldReconnect: () => true,
  });

  const handlePublished = useCallback(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        cmd: "publish",
        key: pKey,
        coreid: coreId,
        coverid: coverDetails?.key,
      });
    }
    setIsPublished(true);
  }, [pKey, coreId, readyState, sendJsonMessage, coverDetails?.key]);

  const handleDiscarded = () => {
    setIsPublished(false);
    setIsShowDetails(false);
    window.location.replace(window.env.SURVEY_URL + "?key=" + pKey + "&coreid=" + uuid4());
    return;
  };
  return (
    <>
      {isPublished ? (
        <ThankYou />
      ) : (
        <div className="root">
          <div className="main-container d-flex align-items-center justify-content-center">
            <div>
              <div className="row d-flex d-flex align-items-center justify-content-center">
                <div className="p-2">
                  <img className="image-details" src={coverDetails?.value} alt="" />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <div className="mt-4">
                  <button type="button" className="button-style" onClick={handlePublished}>
                    PUBLISH AT THE
                    <br />
                    NEWSSTAND
                  </button>
                </div>
                <div className="mt-4">
                  <button type="button" className="button-style" onClick={handleDiscarded}>
                    DISCARD AND
                    <br />
                    START OVER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MagazineDetails;
