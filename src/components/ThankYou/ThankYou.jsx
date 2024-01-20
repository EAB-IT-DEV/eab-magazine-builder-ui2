import React from 'react';
import './ThankYou.css';
import footerImg from '../../images/footer-placeholder-base.png';

const ThankYou = ({ goToList }) => {
  return (
    <div className='root'>
      <div className='main-container d-flex align-items-center justify-content-center'>
        <div>
          <div>
            <h1 className='text-center thank-you-text fw-bolder'>Thank you!</h1>
          </div>
          <div>
            <p className='text-center heading-text fw-bolder'>
              Your magazine cover is being sent to the
              <br />
              CONNECTED Newsstand.
            </p>
          </div>
          <div className='py-4'>
            <img src={footerImg} className='w-100' alt='' />
          </div>

          <div>
            <button
              type='button'
              className='button-style mt-4 mb-4'
              onClick={() => goToList()}
            >
              RETURN TO GALLERY
            </button>
            <p className='text-center heading-text fw-bolder'>
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
