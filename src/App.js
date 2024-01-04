import React from 'react';
import { v4 as uuid4 } from 'uuid';
import './App.css';
import HomePage from './components/HomePage/HomePage';

export const App = () => {
    const queryParams = new URLSearchParams(window.location.search);
    console.log({ queryParams });
    const pKey = queryParams.get('key');
    // let coreId = queryParams.get('coreId');

    // const pKey = 'jsun@eabcom';
    let coreId = '1e5055f3-15ba-42cf-9856-f9651d39290d';

    if (coreId === null) {
        coreId = uuid4();
    }

    if (pKey === null || (typeof pKey === 'string' && pKey.trim().length !== 11)) {
        window.location.replace(window.env.CVENT_EVENT_URL);
        return null; // prevent rendering the rest of the app.
    }
    // 1e5055f3-15ba-42cf-9856-f9651d39290d
    // 1e5055f3-15ba-42cf-9856-f9651d39290d
    console.log('PKey:', pKey, coreId);
    console.log('coreId:', pKey, coreId);

    return (
        <div className="App">
            <HomePage pKey={pKey} coreId={coreId} />
        </div>
    );
};
