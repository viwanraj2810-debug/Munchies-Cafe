'use client'

import Image from 'next/image'
import { useGSAP } from '@/hooks/useGSAP'
import type { SignatureDishData } from '@/types'

interface SignatureDishProps {
    dish: SignatureDishData
}

export default function SignatureDish({ dish }: SignatureDishProps) {
    useGSAP((gsap) => {
        gsap.from('.sig-image img', {
            scrollTrigger: {
                trigger: '.sig-image',
                start: 'top 85%',
                once: true,
            },
            scale: 1.08,
            duration: 1.4,
            ease: 'power2.out',
        })

        gsap.to('.sig-image img', {
            scrollTrigger: {
                trigger: '.sig-image',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            },
            y: -40,
            ease: 'none',
        })

        gsap.from('.sig-headline', {
            scrollTrigger: {
                trigger: '.sig-headline',
                start: 'top 85%',
                once: true,
            },
            opacity: 0,
            y: 28,
            duration: 0.9,
            ease: 'power2.out',
        })
    }, [])

    return (
        <section className="bg-bg-primary pt-[88px]">
            {/* Label */}
            <div className="px-6">
                <span className="text-[10px] font-body font-medium tracking-[4px] uppercase text-accent block">
                    Chef&apos;s Signature
                </span>
            </div>

            {/* Cinematic image block */}
            <div className="sig-image mx-6 mt-5 relative overflow-hidden h-[64vw] max-h-[400px] rounded-[2px]">
                <Image
                    src={dish.imageUrl}
                    fill
                    alt={dish.name}
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 bg-bg-primary border-l-2 border-accent px-4 py-[10px] z-[2]">
                    <span className="font-display italic text-[18px] text-brand-primary block">
                        {dish.name}
                    </span>
                    <span className="text-[11px] tracking-[1px] text-brand-muted">
                        ₹{dish.price} · Chef&apos;s Recommendation
                    </span>
                </div>
            </div>

            {/* Text block */}
            <div className="px-6 pt-9">
                <h2 className="sig-headline font-display font-light text-[44px] leading-[1.05] text-brand-primary">
                    <em>A dish</em> that has made us famous.
                </h2>

                <p className="text-[13px] font-light text-brand-muted leading-[1.9] mt-4">
                    {dish.description}
                </p>

                <div className="w-12 h-px bg-accent my-5" />
            </div>
        </section>
    )
}
