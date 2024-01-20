import React, { useCallback, useState, useContext } from 'react';
import ReactImageMagnify from '@blacklab/react-image-magnify';
import { AppContext } from '../HomePage/HomePage.jsx';
import ThankYou from '../ThankYou/ThankYou';
import './MagazineDetails.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const MagazineDetails = ({
  coverDetails,
  setIsShowDetails,
  setSelectedCover,
  url,
  pKey,
  coreId,
}) => {
  const [isPublished, setIsPublished] = useState(false);
  const { goToSurvey, setResult, isMobile } = useContext(AppContext);
  const { sendJsonMessage, readyState } = useWebSocket(url, {
    share: true,
    shouldReconnect: () => true,
  });

  const handlePublished = useCallback(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        cmd: 'publish',
        key: pKey,
        coreid: coreId,
        coverid: coverDetails?.key,
      });
    }
    setIsPublished(true);
    setSelectedCover({});
    // console.log('published');

    setResult((prev) =>
      prev.map((item) =>
        item.key === coverDetails?.key
          ? { ...item, status: 'published' }
          : { ...item, status: '' }
      )
    );
  }, [
    pKey,
    coreId,
    readyState,
    sendJsonMessage,
    coverDetails?.key,
    setResult,
    setSelectedCover,
  ]);

  const handleDiscarded = () => {
    // setIsPublished(false);
    // setIsShowDetails(false);
    // window.location.replace(
    //   window.env.SURVEY_URL + '?key=' + pKey + '&coreid=' + uuid4()
    // );
    // return;
    // sendJsonMessage({ cmd: 'discard', key: pKey, coreid: coreId });
    goToSurvey();
  };

  const goToList = () => {
    setSelectedCover({});
    setIsShowDetails(false);
  };

  return (
    <>
      {isPublished ? (
        <ThankYou goToList={goToList} />
      ) : (
        <div className='root'>
          <div className='main-container d-flex align-items-center justify-content-center'>
            <div>
              <div className='row d-flex align-items-center justify-content-center'>
                <div className='p-2'>
                  {!!coverDetails?.value && isMobile && (
                    <img
                      className='image-details'
                      src={coverDetails?.value}
                      alt=''
                    />
                  )}
                  {!!coverDetails?.value && !isMobile && (
                    <ReactImageMagnify
                      imageProps={{
                        alt: '',
                        src: coverDetails.value,
                        width: 500,
                        height: 641,
                      }}
                      magnifiedImageProps={{
                        src: coverDetails.value,
                        width: 791,
                        height: 1024,
                        alt: '',
                      }}
                      portalProps={{ placement: 'auto-start' }}
                      magnifyContainerProps={{ scale: 1.5 }}
                    />
                  )}
                </div>
              </div>
              <div className='d-flex flex-column align-items-center'>
                <div className='mt-4'>
                  <button
                    type='button'
                    className='button-style'
                    onClick={handlePublished}
                  >
                    {!isMobile && <>PUBLISH SELECTED</>}
                    {isMobile && <>CONFIRM AND PUBLISH</>}
                  </button>
                </div>
                <div className='mt-4'>
                  <button
                    type='button'
                    className='button-style'
                    onClick={handleDiscarded}
                  >
                    RESTART SURVEY
                  </button>
                </div>
                <div className='mt-4'>
                  <button
                    type='button'
                    className='button-style'
                    onClick={() => goToList()}
                  >
                    RETURN TO GALLERY
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
