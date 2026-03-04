'use client'

import Image from 'next/image'
import { useGSAP } from '@/hooks/useGSAP'

export default function About() {
    useGSAP((gsap) => {
        gsap.from('.about-heading', {
            scrollTrigger: {
                trigger: '.about-heading',
                start: 'top 85%',
                once: true,
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
        })

        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: '.about-image',
                start: 'top 85%',
                once: true,
            },
            opacity: 0,
            y: 32,
            duration: 0.9,
            ease: 'power2.out',
        })
    }, [])

    return (
        <section id="about" className="bg-bg-surface py-[88px] px-6">
            {/* Beat 1 */}
            <span className="text-[10px] font-body font-medium tracking-[4px] uppercase text-accent block">
                Our Story
            </span>

            <h2 className="about-heading font-display italic font-light text-[34px] leading-[1.2] text-brand-primary mt-3">
                Born in a small cafe. Served with a big heart.
            </h2>

            <div className="w-10 h-px bg-accent my-5" />

            {/* Beat 2 */}
            <p className="text-[14px] font-light text-brand-muted leading-[1.9]">
                We cook the way our mothers taught us — slowly, with whole spices, and
                no shortcuts. Every dish carries a memory. Every guest leaves with one.
            </p>

            {/* Beat 3 */}
            <div className="about-image -mx-6 mt-8">
  <Image
    src="/images/ResturantInnerLook/2025-02-06.webp"
    alt="cafe at Munchies Cafe"
    width={1200}
    height={1600}
    className="w-full h-auto object-cover"
  />
</div>
            <p className="text-[11px] font-normal text-brand-muted tracking-[1px] mt-3">
                Chef Arjun · Head of cafe since 2014
            </p>
        </section>
    )
}
