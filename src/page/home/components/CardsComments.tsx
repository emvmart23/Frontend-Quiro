// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import "./CardComments/CardsComments.css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';

const reviews = [
  {
    id: 1,
    image: '/public/images/image1.jpg',
    name: 'Romina K.',
    role: 'Diseñadora',
    rating: 4,
    review: "You won't regret it. I would like to personally thank you for your outstanding product. Absolutely wonderful!"
  },
  {
    id: 2,
    image: '/public/images/image2.jpg',
    name: 'Carlos M.',
    role: 'Desarrollador',
    rating: 5,
    review: "Increíble servicio. Superó todas mis expectativas y lo recomendaría sin dudarlo."
  },
  {
    id: 3,
    image: '/public/images/image3.jpg',
    name: 'Laura S.',
    role: 'Marketing',
    rating: 4,
    review: "Muy buen producto, aunque podría mejorar en algunos aspectos. En general, excelente experiencia."
  }
];


export const CardsCommets = () => {
  return (
    <div className="w-full flex items-center justify-center max-w-4xl mx-auto  h-[450px]">
        <Swiper 
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      effect="fade"
      navigation
      speed={2500}
      autoplay={{
        delay: 5000,  
        disableOnInteraction: false,  
      }}
      className="mySwiper w-full max-w-4xl mx-auto  " 
    >
      {reviews.map((review) => (
        <SwiperSlide 
        key={review.id} 
        className="flex justify-center items-center p-6 h-[450px] md:h-[300px]" // Altura fija
      >
        <div className="w-full items-center max-w-3xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-4 h-full">
      
            
            {/* Contenedor de imagen */}
            <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex-shrink-0">
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-full object-cover rounded-full lg:rounded-none"
              />
            </div>

            {/* Contenedor de texto con altura fija */}
            <div className="flex flex-col  justify-center h-full text-center md:text-left flex-grow">
              <p className="text-gray-700 mb-2 text-sm md:text-base overflow-hidden">
                {review.review}
              </p>
              <div className="flex justify-center md:justify-start text-yellow-400 mb-2">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <hr />
              <h3 className="font-bold text-lg">{review.name}</h3>
              <p className="text-gray-500 text-sm">{review.role}</p>
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
    
  );
};

