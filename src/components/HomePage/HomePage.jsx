import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import './homePage.css';
// import Footer from '../Footer/Footer';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import MagazinePage from '../MagazinePage/MagazinePage';
import Loader from './Loader';
export const AppContext = createContext();

const HomePage = ({ pKey, coreId }) => {
  const [initialLoad, SetInitialLoad] = useState(true);
  const [result, setResult] = useState([]);
  const url = window.env.API_BASE_URL + '?key=' + pKey;
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(url, {
    share: true,
    shouldReconnect: () => true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPreviews, setIsLoadingPreviews] = useState(false);

  const resultRef = useRef(result);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResultChange = useCallback(
    (newItems) => {
      if (newItems.length > 0) {
        setIsLoadingPreviews(false);
        setResult((prev) => [...prev, ...newItems]);
      }
    },
    [setIsLoadingPreviews, setResult]
  );

  const updateCurrentResult = useCallback(
    (newItems) => {
      if (newItems.length > 0) {
        const newItemsMap = new Map();
        newItems.forEach((item) => {
          newItemsMap.set(item.key, item);
        });
        setIsLoadingPreviews(false);
        setResult((prev) =>
          prev.map((item) => {
            if (newItemsMap.has(item.key)) {
              return newItemsMap.get(item.key);
            } else {
              return item;
            }
          })
        );
      }
    },
    [setIsLoadingPreviews, setResult]
  );

  // Run when the connection state (readyState) changes
  useEffect(() => {
    // console.log(lastJsonMessage);

    if (readyState === ReadyState.OPEN && initialLoad) {
      sendJsonMessage({ cmd: 'getresult', key: pKey, coreid: coreId });
      SetInitialLoad(false);
    }

    if (lastJsonMessage !== null) {
      if (lastJsonMessage.status === 'noprofile') {
        window.location.replace(lastJsonMessage.url);
      } else if (
        Array.isArray(lastJsonMessage.result) &&
        lastJsonMessage.result.length
      ) {
        const newItems = lastJsonMessage.result.filter(
          (item) => !resultRef.current.find((o) => o.key === item.key)
        );
        if (newItems.length > 0) {
          handleResultChange(newItems);
        } else {
          updateCurrentResult(lastJsonMessage.result);
        }
      }
    }
  }, [
    readyState,
    initialLoad,
    handleResultChange,
    sendJsonMessage,
    lastJsonMessage,
    pKey,
    coreId,
    updateCurrentResult,
  ]);

  const goToSurvey = () => {
    setIsLoading(true);
    sendJsonMessage({ cmd: 'restart', key: pKey, coreid: coreId });
  };

  // console.log('result: 53', result);
  return (
    <AppContext.Provider
      value={{
        result,
        setResult,
        url,
        pKey,
        coreId,
        sendJsonMessage,
        setIsLoading,
        goToSurvey,
        isLoadingPreviews,
        setIsLoadingPreviews,
        isMobile,
      }}
    >
      {isLoading && (
        <div className='main-container d-flex align-items-center justify-content-center'>
          <Loader />
        </div>
      )}
      {!isLoading && result.length > 0 ? (
        <MagazinePage />
      ) : (
        <div className='root'>
          <div className='main-container d-flex align-items-center justify-content-center'>
            <div>
              <div>
                <p className='text-center heading-text fw-bolder'>
                  The future of higher education awaits.
                </p>
              </div>
              <Loader />
              <div>
                <p className='text-center heading-text '>
                  Hang tight while we create your
                </p>
                <p className='text-center heading-text'>magazine cover.</p>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      )}
    </AppContext.Provider>
  );
};

export default HomePage;
