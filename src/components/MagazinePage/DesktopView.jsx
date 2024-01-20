import ReactImageMagnify from '@blacklab/react-image-magnify';
import { AppContext } from '../HomePage/HomePage.jsx';
import { useContext } from 'react';
import Loader from '../HomePage/Loader';
import SelectedCheck from '../../images/selected-check.svg';
import DeselectedCheck from '../../images/deselected-check.svg';
import PublishedBanner from '../../images/published-banner.svg';

const DesktopView = ({ handleSelect, handleShowDetails }) => {
  const { result, isLoadingPreviews } = useContext(AppContext);

  const selectAndShowDetails = (key) => {
    handleSelect(key);
    handleShowDetails(key);
  };

  return (
    <div className='gallery-view d-none d-md-flex flex-wrap align-items-center justify-content-center gap-5'>
      {result &&
        result?.map((el) => (
          <div key={el.key} className={el.selected ? 'published-shadow' : ''}>
            <div>
              {el.status && (
                <div className='published-container'>
                  <img
                    src={PublishedBanner}
                    className='published-banner'
                    alt={'Published'}
                  />
                </div>
              )}
              {!el.status && (
                <img
                  src={el.selected ? SelectedCheck : DeselectedCheck}
                  onClick={() => handleSelect(el.key)}
                  className='check-icon'
                  alt={el.selected ? 'Selected' : 'Deselected'}
                />
              )}
            </div>

            {el.value && (
              <ReactImageMagnify
                imageProps={{
                  alt: '',
                  src: el.value,
                  width: 300,
                  height: 385,
                }}
                magnifiedImageProps={{
                  src: el.value,
                  width: 791,
                  height: 1024,
                  alt: '',
                }}
                portalProps={{ placement: 'auto-start' }}
                magnifyContainerProps={{ scale: 1.5 }}
                onClick={() =>
                  el.status ? false : selectAndShowDetails(el.key)
                }
              />
            )}
          </div>
        ))}

      {isLoadingPreviews && (
        <div className='loading-previews'>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default DesktopView;
