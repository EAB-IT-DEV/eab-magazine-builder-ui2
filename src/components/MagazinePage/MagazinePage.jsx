import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../HomePage/HomePage.jsx';
import MagazineDetails from '../MagazineDetails/MagazineDetails.jsx';
import './MagazinePage.css';

const MagazinePage = () => {
    const { result, setResult, url, pKey } = useContext(AppContext);
    const [selectedCover, setSelectedCover] = useState({});
    const [isShowDetails, setIsShowDetails] = useState(false);
    const [coverDetails, setCoverDetails] = useState({});

    const handleSelect = useCallback(
        key => {
            const updatedData = result.map(item => (item.key === key ? { ...item, selected: !item.selected } : { ...item, selected: false }));
            setResult(updatedData);

            // select cover
            const selected = result.find(item => item.key === key && !item.selected);
            setSelectedCover(selected);
        },
        [result, setResult],
    );

    const handleShowDetails = useCallback(
        key => {
            const selected = result.find(item => item.key === key);
            setCoverDetails(selected);
            setIsShowDetails(true);
        },
        [result],
    );

    return (
        <>
            {isShowDetails ? (
                <MagazineDetails coverDetails={coverDetails} setIsShowDetails={setIsShowDetails} setSelectedCover={setSelectedCover} setResult={setResult} url={url} pKey={pKey} />
            ) : (
                <div className="root">
                    <div className="main-container d-flex align-items-center justify-content-center">
                        <div>
                            <div>
                                <p className="text-center heading-text fw-bolder">Pick your favorite</p>
                            </div>
                            <div className="row d-flex d-flex align-items-center justify-content-center">
                                {result?.map(el => (
                                    <div className={`${result.length === 1 ? 'col-12' : 'col-6'} p-2`} key={el.key}>
                                        <div>
                                            <i
                                                className={`fa-regular fa-circle-check  ${el.selected ? 'selected-check-icon' : 'check-icon'}`}
                                                onClick={() => handleSelect(el.key)}
                                            />
                                        </div>

                                        <img className="cover-image" src={el.value} alt="" onClick={() => handleShowDetails(el.key)} />
                                    </div>
                                ))}
                            </div>
                            {selectedCover?.key ? (
                                <div className="mt-4">
                                    <button type="button" className="button-style" onClick={() => handleShowDetails(selectedCover?.key)}>
                                        NEXT
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <button type="button" className="button-style" disabled style={{ cursor: 'not-allowed' }}>
                                        NEXT
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MagazinePage;
