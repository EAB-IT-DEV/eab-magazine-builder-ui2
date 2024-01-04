import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid4 } from 'uuid';
import './App.css';
import HomePage from './components/HomePage/HomePage';

export const App = () => {
    const queryParams = new URLSearchParams(window.location.search);

    const pKey = queryParams.get('key');
    const initialCoreId = queryParams.get('coreId');
    const [coreId, setCoreId] = useState(initialCoreId || '');

    const initializedRef = useRef(false);

    useEffect(() => {
        if (pKey === null || (typeof pKey === 'string' && pKey.trim().length !== 11)) {
            window.location.replace(window.env.CVENT_EVENT_URL);
        }
    }, [pKey]);

    useEffect(() => {
        if (!initializedRef.current && !initialCoreId) {
            setCoreId(uuid4());
            initializedRef.current = true;
        }
    }, [initialCoreId]);

    console.log('PKey:', pKey);
    console.log('coreId:', coreId);

    return (
        <div className="App">
            <HomePage pKey={pKey} coreId={coreId} />
        </div>
    );
};
