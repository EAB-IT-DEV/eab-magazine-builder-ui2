import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../HomePage/HomePage.jsx';
import MagazineDetails from '../MagazineDetails/MagazineDetails.jsx';
import './MagazinePage.css';

import SwiperMobile from './SwiperMobile.jsx';
import DesktopView from './DesktopView.jsx';

const MagazinePage = () => {
  const {
    result,
    setResult,
    url,
    pKey,
    coreId,
    sendJsonMessage,
    goToSurvey,
    setIsLoadingPreviews,
    isLoadingPreviews,
    isMobile,
  } = useContext(AppContext);
  const [selectedCover, setSelectedCover] = useState({});
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [coverDetails, setCoverDetails] = useState({});

  const handleSelect = useCallback(
    (key) => {
      const updatedData = result.map((item) =>
        item.key === key
          ? { ...item, selected: !item.selected }
          : { ...item, selected: false }
      );
      setResult(updatedData);

      // select cover
      const selected = result.find(
        (item) => item.key === key && !item.selected
      );
      setSelectedCover(selected);
    },
    [result, setResult]
  );

  const handleShowDetails = useCallback(
    (key) => {
      const selected = result.find((item) => item.key === key);
      setCoverDetails(selected);
      setIsShowDetails(true);
    },
    [result]
  );

  const createMoreCovers = () => {
    setIsLoadingPreviews(true);
    sendJsonMessage({ cmd: 'needmore', key: pKey, coreid: coreId });
  };

  return (
    <>
      {isShowDetails ? (
        <MagazineDetails
          coverDetails={coverDetails}
          setIsShowDetails={setIsShowDetails}
          setSelectedCover={setSelectedCover}
          url={url}
          pKey={pKey}
          coreId={coreId}
        />
      ) : (
        <div className='root'>
          <div className='magazine-page'>
            <div className='main-container d-flex align-items-center justify-content-center'>
              <div>
                <div>
                  <p className='text-center heading-text fw-bolder'>
                    Pick your favorite
                  </p>
                  <p className='general-color'>
                    {isMobile && (
                      <>
                        Each image may require a <br />
                        few seconds to load.
                      </>
                    )}
                    {!isMobile && (
                      <>Each image may require a few seconds to load.</>
                    )}
                  </p>
                </div>

                {isMobile && (
                  <SwiperMobile
                    handleSelect={handleSelect}
                    handleShowDetails={handleShowDetails}
                    selectedCover={selectedCover}
                    setSelectedCover={setSelectedCover}
                  />
                )}

                {!isMobile && (
                  <DesktopView
                    handleSelect={handleSelect}
                    handleShowDetails={handleShowDetails}
                  ></DesktopView>
                )}

                <div className='mt-4 d-flex justify-content-center flex-column flex-md-row gap-3 buttons-width align-items-center'>
                  <button
                    type='button'
                    className='button-style'
                    onClick={() => createMoreCovers()}
                    disabled={isLoadingPreviews}
                    style={{
                      cursor: isLoadingPreviews ? 'not-allowed' : 'pointer',
                    }}
                  >
                    CREATE MORE COVERS
                  </button>
                  <button
                    type='button'
                    className='button-style'
                    onClick={() => goToSurvey()}
                  >
                    RESTART SURVEY
                  </button>
                  <button
                    type='button'
                    className='button-style'
                    onClick={() =>
                      selectedCover?.key
                        ? handleShowDetails(selectedCover?.key)
                        : false
                    }
                    disabled={!selectedCover?.key}
                    style={{
                      cursor: !selectedCover?.key ? 'not-allowed' : 'pointer',
                    }}
                  >
                    PUBLISH SELECTED
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

export default MagazinePage;
