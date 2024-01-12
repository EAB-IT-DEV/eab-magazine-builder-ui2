import React, { useCallback } from 'react';
import './ThankYou.css';
import footerImg from '../../images/Kiosk_Magazine.png';
import { v4 as uuid4 } from 'uuid';

const ThankYou = ({ setIsPublished, setIsShowDetails, pKey, setSelectedCover, setCoverDetails, result, setResult }) => {
    const handlerNewSurveyButton = () => {
        setIsPublished(false);
        setIsShowDetails(false);
        window.location.replace(window.env.SURVEY_URL + '?key=' + pKey + '&coreid=' + uuid4());
        return;
    };

    const HandleBackToGalleryButton = useCallback(() => {
        const updatedData = result.map(item => ({ ...item, selected: false }));
        setResult(updatedData);
        setSelectedCover({});
        setCoverDetails({});
        setIsPublished(false);
        setIsShowDetails(false);
    }, [result, setCoverDetails, setIsPublished, setIsShowDetails, setResult, setSelectedCover]);
    return (
        <div className="root">
            <div className="main-container d-flex align-items-center justify-content-center">
                <div>
                    <div>
                        <h1 className="text-center thank-you-text fw-bolder">Thank you!</h1>
                    </div>
                    <div>
                        <p className="text-center heading-text fw-bolder">
                            Your magazine cover is being sent to the
                            <br />
                            CONNECTED Newsstand.
                        </p>
                    </div>
                    <div className="my-2">
                        <button type="button" className="button-style" onClick={HandleBackToGalleryButton}>
                            Back To Gallery
                        </button>
                    </div>

                    <div className="mt-2">
                        <button type="button" className="button-style" onClick={handlerNewSurveyButton}>
                            New Survey
                        </button>
                    </div>
                    <div className="my-4">
                        <img className="w-100" src={footerImg} alt="" />
                    </div>

                    <div>
                        <p className="text-center heading-text fw-bolder">
                            Be sure to stop by to see it on the
                            <br />
                            gallery wall.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
