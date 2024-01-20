import { AppContext } from '../HomePage/HomePage.jsx';
import {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './SwiperMobile.css';
import Loader from '../HomePage/Loader';
import PublishedBanner from '../../images/published-banner.svg';
import SelectedCheck from '../../images/selected-check.svg';
import DeselectedCheck from '../../images/deselected-check.svg';

const SwiperMobile = ({
  handleShowDetails,
  handleSelect,
  selectedCover,
  setSelectedCover,
}) => {
  const { result, isLoadingPreviews } = useContext(AppContext);

  const reversedResult = useMemo(
    () => result?.slice().reverse() ?? [],
    [result]
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const isInitialized = useRef(false);

  const selectSlide = useCallback(
    (val, isLoading) => {
      if (result) {
        let i;
        if (val > result.length) {
          i = 0;
        } else if (val < 0) {
          i = result.length - 1;
        } else {
          i = val;
        }

        if (i != null) {
          setCurrentIndex(i);
          if (isLoading !== true)
            reversedResult[i].status
              ? setSelectedCover({})
              : handleSelect(reversedResult[i].key);
        }
      }
    },
    [result, handleSelect, reversedResult, setSelectedCover]
  );

  useEffect(() => {
    if (!isInitialized.current && selectedCover?.key) {
      selectSlide(
        reversedResult.findIndex((item) => item.key === selectedCover.key)
      );
      isInitialized.current = true;
    } else if (!isInitialized.current && !selectedCover?.key) {
      if (!reversedResult[0].status) handleSelect(reversedResult[0].key);
      isInitialized.current = true;
    }
  }, [reversedResult, selectedCover, selectSlide, handleSelect]);

  useEffect(() => {
    if (isLoadingPreviews) {
      selectSlide(0, true);
    }
  }, [isLoadingPreviews, selectSlide]);

  return (
    <div className='d-flex flex-column align-items-center'>
      <div className='eab-carousel-indicators'>
        {result?.map((el, index) => (
          <button
            key={'indicator' + el.key}
            type='button'
            className={currentIndex === index ? 'active' : ''}
            onClick={() => selectSlide(index)}
          />
        ))}
      </div>

      <div>
        {/* {reversedResult[currentIndex]?.status && (
          <img
            src={PublishedBanner}
            className='published-banner'
            alt={'Published'}
          />
        )} */}
        {!reversedResult[currentIndex]?.status && (
          <img
            src={
              reversedResult[currentIndex]?.selected
                ? SelectedCheck
                : DeselectedCheck
            }
            className='check-icon'
            alt={
              reversedResult[currentIndex]?.selected ? 'Selected' : 'Deselected'
            }
          />
        )}
      </div>

      <Carousel
        activeIndex={currentIndex}
        indicators={false}
        onSelect={selectSlide}
        interval={null}
      >
        {isLoadingPreviews && (
          <Carousel.Item>
            <div className='loading-previews'>
              <Loader />
            </div>
          </Carousel.Item>
        )}
        {reversedResult?.map((item) => (
          <Carousel.Item key={item.key}>
            <img
              className='cover-image'
              src={item.value}
              alt=''
              onClick={() =>
                item.status ? false : handleShowDetails(item.key)
              }
            />
            {item.status && (
              <img
                className='published-carousel'
                alt='published'
                src={PublishedBanner}
              />
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SwiperMobile;
