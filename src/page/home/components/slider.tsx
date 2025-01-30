// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import "./SwiperSlider/slider.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

const images = [
  {
    id: 1,
    url: "/public/images/image1.jpg",
  },
  {
    id: 2,
    url: "/public/images/image2.jpg",
  },
  {
    id: 3,
    url: "/public/images/image3.jpg",
  },
];

export const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      effect="fade"
      navigation
      speed={2500}
      pagination={{ clickable: true }}
      //scrollbar={{ draggable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}

      className="carousel"
    >
      {images.map((image) => (
        <SwiperSlide key={image.id} className="w-full">
          <img
            src={image.url}
            alt={`Slide ${image.id}`}
            className="w-full lg:h-[450px] h-[350px] object-cover object-center"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
