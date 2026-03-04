'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import type { Review } from '@/types'

interface ReviewsProps {
    reviews: Review[]
}

export default function Reviews({ reviews }: ReviewsProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const heroReview = reviews.find((r) => r.isHero)
    const compactReviews = reviews.filter((r) => !r.isHero)

    useGSAP((gsap) => {
        if (!sectionRef.current) return

        gsap.from(sectionRef.current.querySelectorAll('.review-card'), {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                once: true,
            },
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
        })
    }, [])

    return (
        <section
            id="reviews"
            ref={sectionRef}
            className="bg-bg-primary py-[88px] px-6"
        >
            <span className="text-[10px] font-body font-medium tracking-[4px] uppercase text-accent block">
                What Guests Say
            </span>

            {/* Hero Review */}
            {heroReview && (
                <div className="relative mt-6">
                    <span className="absolute -top-4 -left-2 font-display text-[80px] font-light text-accent opacity-30 leading-none select-none">
                        &ldquo;
                    </span>

                    <div className="text-accent text-[14px] tracking-[2px]">
                        {'★'.repeat(heroReview.rating)}
                    </div>

                    <p className="font-display italic font-light text-[26px] leading-[1.4] text-brand-primary mt-4 relative z-10">
                        {heroReview.quote}
                    </p>

                    <p className="text-[12px] font-normal text-brand-muted mt-4">
                        {heroReview.reviewer}
                        <span className="text-[9px] tracking-[2px] uppercase text-accent ml-2">
                            {heroReview.source}
                        </span>
                    </p>
                </div>
            )}

            {/* Compact Review Cards */}
            {compactReviews.map((review) => (
                <div
                    key={review.id}
                    className="review-card bg-bg-card border border-border rounded-[2px] p-[18px] mt-4"
                >
                    <div className="text-[12px] text-accent tracking-[1px]">
                        {'★'.repeat(review.rating)}
                    </div>

                    <p className="text-[13px] font-light text-brand-muted mt-2 line-clamp-2">
                        {review.quote}
                    </p>

                    <p className="text-[11px] text-brand-muted mt-3">
                        {review.reviewer}
                        <span className="text-[9px] tracking-[2px] uppercase text-accent ml-2">
                            {review.source}
                        </span>
                    </p>
                </div>
            ))}
        </section>
    )
}
