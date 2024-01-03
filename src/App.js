import React, { createContext, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { v4 as uuid4 } from 'uuid';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import MagazinePage from './components/MagazinePage/MagazinePage';

export const AppContext = createContext();

export const App = () => {
    const queryParams = new URLSearchParams(window.location.search);
    // console.log({ queryParams });
    const pKey = queryParams.get('key');
    let coreId = queryParams.get('coreId');
    console.log({ pKey, coreId });
    // const pKey = 'jsun@eabcom';
    // let coreId = '1234567890';

    if (coreId === null) {
        coreId = uuid4();
    }

    // if (pKey === null || (typeof pKey === 'string' && pKey.trim().length !== 11)) {
    //     window.location.replace(window.env.CVENT_EVENT_URL);
    //     return null; // prevent rendering the rest of the app.
    // }

    const [initialLoad, SetInitialLoad] = useState(true);
    const [result, setResult] = useState([]);
    const url = window.env.API_BASE_URL + '?key=' + pKey;
    const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(url, {
        share: true,
        shouldReconnect: () => true,
    });

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

    return (
        <AppContext.Provider value={{ result, setResult, url, pKey }}>
            <div className="App">{result.length > 0 ? <MagazinePage /> : <HomePage />}</div>
        </AppContext.Provider>
    );
};
