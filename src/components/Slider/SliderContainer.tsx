import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SlideCard } from "./SlideCard";
import { SliderControlButton } from "./SliderControlButton";
import { IMG_API_URL, SLIDER_BREAKPOINTS, SLIDER_SPACE_BETWEEN, SLIDER_SLIDES_PER_VIEW } from "./constants";

interface SlideData {
    id: string;
    author: string;
    download_url: string;
}

export const SliderContainer: React.FC = () => {
    const [slides, setSlides] = useState<SlideData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<any>(null);

    useEffect(() => {
        const fetchSlides = async () => {
            setIsLoading(true);
            setIsError(false);
            try {
                const response = await fetch(IMG_API_URL);
                const data = await response.json();
                setSlides(data);
            } catch {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchSlides();
    }, []);

    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            // @ts-ignore
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            // @ts-ignore
            swiperRef.current.navigation.destroy();
            // @ts-ignore
            swiperRef.current.navigation.init();
            // @ts-ignore
            swiperRef.current.navigation.update();
        }
    }, [swiperRef, prevRef, nextRef, slides]);

    if (isLoading) return <div>Loading slides...</div>;
    if (isError) return <div>Error loading slides.</div>;
    if (slides.length === 0) return <div>No slides found.</div>;

    return (
        <section aria-label="Image slider" className="flex items-center justify-center w-full max-w-5xl mx-auto">
            <SliderControlButton
                direction="prev"
                onClick={() => prevRef.current?.click()}
                ref={prevRef}
            />
            <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                spaceBetween={SLIDER_SPACE_BETWEEN}
                slidesPerView={SLIDER_SLIDES_PER_VIEW}
                breakpoints={SLIDER_BREAKPOINTS}
                className="flex-1"
                style={{ padding: "0 0.5rem" }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="flex flex-col">
                        <SlideCard
                            imageUrl={slide.download_url}
                            description={slide.author}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderControlButton
                direction="next"
                onClick={() => nextRef.current?.click()}
                ref={nextRef}
            />
        </section>
    );
};
