// src/components/CaseStudySlider.tsx
import { useState, useRef, useEffect, useCallback } from 'react'
import styles from '~/styles/caseStudy.module.scss'

interface Slide {
  heading: string;
  paragraph: string;
  link?: string;
}

interface CaseStudySliderProps {
  slides: Slide[];
}

export default function CaseStudySlider({ slides }: CaseStudySliderProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle slide navigation
  const navigateSlide = useCallback((direction: 'next' | 'prev' | number) => {
    setActiveSlide((current) => {
      if (direction === 'next') return (current + 1) % slides.length
      if (direction === 'prev') return (current - 1 + slides.length) % slides.length
      if (typeof direction === 'number') return direction // bullet click
      return current // safety fallback
    })
  }, [slides.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateSlide('prev')
      } else if (e.key === 'ArrowRight') {
        navigateSlide('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [navigateSlide])

  return (
    <>
      {/* Slides Container */}
      <div className={styles.slideContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === activeSlide ? styles.activeSlide : ''}`}
            data-slide={index}
          >
            <h2 className={styles.slide__heading}>
              {slide.heading}
            </h2>
            <p className={styles.slide__paragraph}>
              {slide.paragraph}
            </p>
            {slide.link && (
              <div className={styles.slide__link}>
                {slide.link}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className={styles.slider__controls}>
        {/* Navigation Arrows */}
        <div className={styles.slider__arrows}>
          <button
            type="button"
            className={styles.previousBtn}
            onClick={() => navigateSlide('prev')}
            aria-label="Previous slide"
          >
            <div className={styles.previousBtnContent}>
              <div className={styles.arrowLeft} />
              <div className={styles.text}>Previous</div>
            </div>
          </button>

          <button
            type="button"
            className={styles.nextBtn}
            onClick={() => navigateSlide('next')}
            aria-label="Next slide"
          >
            <div className={styles.nextBtnContent}>
              <div className={styles.text}>Next</div>
              <div className={styles.arrowRight} />
            </div>
          </button>
        </div>

        {/* Bullets/Indicators */}
        <nav className={styles.slider__bullets} aria-label="Slide navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.bullet__wrapper} ${index === activeSlide ? styles.active : ''}`}
              onClick={() => navigateSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide}
              data-bullet={index}
            >
              <div className={styles.bullet__event_wrapper}>
                <div className={styles.slide__number}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className={styles.bullet} />
              </div>
            </button>
          ))}
        </nav>

        {/* Current Slide Index */}
        <div className={styles.slider__index_container}>
          {String(activeSlide + 1).padStart(2, '0')}
        </div>
      </div>
    </>
  )
}