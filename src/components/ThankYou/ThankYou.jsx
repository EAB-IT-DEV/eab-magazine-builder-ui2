import React from 'react';
import './ThankYou.css';
import footerImg from '../../images/footer-placeholder–base.png';

const ThankYou = () => {
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
                    <div className="py-4">
                        <img style={{ width: '100%' }} className="w-100" src={footerImg} alt="" />
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
