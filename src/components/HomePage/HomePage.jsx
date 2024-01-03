import React from 'react';
import './homePage.css';
import Footer from '../Footer/Footer';

const HomePage = () => {
    return (
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
    );
};

export default HomePage;
