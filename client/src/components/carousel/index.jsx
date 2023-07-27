import {  useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCircle} from '@fortawesome/free-solid-svg-icons'

const images = [
    {
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
        url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    },
    {
        url: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    }
]

const Carousel = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentImage === 0;
        const newImage = isFirstSlide ? images.length - 1 : currentImage - 1;
        setCurrentImage(newImage);
    };

    const nextSlide = () => {
        const isLastSlide = currentImage === images.length - 1;
        const newImage = isLastSlide ? 0 : currentImage + 1;
        setCurrentImage(newImage);
    }

    const goToSlide = (slideImage) => {
        setCurrentImage(slideImage)
    }



    return (
        <div className='max-w-7xl h-[720px] w-full m-auto my-16 relative group'>
            <div
            style={{ backgroundImage: `url(${images[currentImage].url})` }}
            className='w-full h-5/6 rounded-2xl bg-center bg-cover duration-500'
            ></div>
            {/* Left Arrow */}
            <div className='hidden group-hover:block absolute top-[43%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 text-white cursor-pointer'>
                <FontAwesomeIcon icon={faChevronLeft} onClick={prevSlide} fontSize={18}/>
                {/* <BsChevronCompactLeft onClick={prevSlide} size={30} /> */}
            </div>
            {/* Right Arrow */}
            <div className='hidden group-hover:block absolute top-[43%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 text-white cursor-pointer'>
                <FontAwesomeIcon icon={faChevronRight} onClick={nextSlide}/>
            {/* <BsChevronCompactRight onClick={nextSlide} size={30} /> */}
            </div>
            <div className='flex top-4 justify-center py-2'>
            {images.map((slide, slideImage) => (
                <div
                key={slideImage}
                onClick={() => goToSlide(slideImage)}
                className='text-2xl cursor-pointer'
                >
                <FontAwesomeIcon icon={faCircle} fontSize={12} className="p-2"/>
                </div>
            ))}
            </div>
        </div>       
    )
}

export default Carousel;