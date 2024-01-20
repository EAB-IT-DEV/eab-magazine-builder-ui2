import React, { useEffect, useState, useMemo } from 'react';
import { v4 as uuid4 } from 'uuid';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';

export const App = () => {
  const [loading, setLoading] = useState(true);

  const urlState = useMemo(() => {
    // console.log(window.location.pathname);
    const queryParams = new URLSearchParams(window.location.search);
    const pKey = queryParams.get('key');
    const coreId = queryParams.get('coreid') || uuid4();
    // console.log('Inside urlState: ', pKey, coreId);
    return { pKey, coreId, pathname: window.location.pathname };
  }, []);

  useEffect(() => {
    if (urlState.pathname !== '/login') {
      if (
        urlState.pKey === null ||
        (typeof urlState.pKey === 'string' &&
          urlState.pKey.trim().length !== 11)
      ) {
        window.location.href="/login";
        return;
      }
    }

    setLoading(false);
  }, [urlState]);

  if (loading) return <div>Loading ...</div>;

  return (
    <div className='App'>
      {urlState.pathname !== '/login' && (
        <HomePage pKey={urlState.pKey} coreId={urlState.coreId} />
      )}
      {urlState.pathname === '/login' && <LoginPage />}
    </div>
  );
};
