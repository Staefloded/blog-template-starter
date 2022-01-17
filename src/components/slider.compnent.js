import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

SwiperCore.use([Navigation, Pagination]);

const Slider = ({ images }) => {
  return (
    <div className="mt-8">
      {images?.length === 0 ? (
        <strong>No Images Found</strong>
      ) : (
        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {images?.map((image, index) => (
            <SwiperSlide className="w-full h-full">
              <div className="px-20">
                <img src={image?.image} className="w-auto  object-cover" key={image?.id} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Slider;
