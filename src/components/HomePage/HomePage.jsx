import React, { createContext, useEffect, useState } from 'react';
import './homePage.css';
import Footer from '../Footer/Footer';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import MagazinePage from '../MagazinePage/MagazinePage';
export const AppContext = createContext();

const HomePage = ({ pKey, coreId }) => {
    const [initialLoad, SetInitialLoad] = useState(true);
    const [result, setResult] = useState([]);
    const url = window.env.API_BASE_URL + '?key=' + pKey;
    const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(url, {
        share: true,
        shouldReconnect: () => true,
    });
    console.log('lastJsonMessage, sendJsonMessage, readyState', { lastJsonMessage, sendJsonMessage, readyState });

    // Run when the connection state (readyState) changes
    useEffect(() => {
        if (readyState === ReadyState.OPEN && initialLoad) {
            sendJsonMessage({ cmd: 'getresult', key: pKey, coreid: coreId });
            SetInitialLoad(false);
        }
        if (lastJsonMessage !== null) {
            if (lastJsonMessage.status === 'noprofile') {
                window.location.replace(lastJsonMessage.url);
            } else if (Array.isArray(lastJsonMessage.result) && lastJsonMessage.result.length) {
                setResult(prev => prev.concat(lastJsonMessage.result));
            }
        }
    }, [readyState, initialLoad, sendJsonMessage, lastJsonMessage, pKey, coreId]);

    console.log('result: 53', result);
    return (
        <AppContext.Provider value={{ result, setResult, url, pKey }}>
            {result.length > 0 ? (
                <MagazinePage />
            ) : (
                <div className="root">
                    <div className="main-container d-flex align-items-center justify-content-center">
                        <div>
                            <div>
                                <p className="text-center heading-text fw-bolder">The future of higher education awaits.</p>
                            </div>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div>
                                <p className="text-center heading-text ">Hang tight while we create your</p>
                                <p className="text-center heading-text">magazine cover.</p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </AppContext.Provider>
    );
};

export default HomePage;
