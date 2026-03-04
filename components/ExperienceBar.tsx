'use client'

import { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import type { RestaurantInfo } from '@/types'

interface ExperienceBarProps {
    info: RestaurantInfo
}

export default function ExperienceBar({ info }: ExperienceBarProps) {
    const sectionRef = useRef<HTMLElement>(null)

    const stats = [
        { value: info.established, label: 'EST. YEAR' },
        { value: `${info.rating} ★`, label: 'ZOMATO RATING' },
        { value: info.covers, label: 'COVERS' },
    ]

    useGSAP((gsap) => {
        if (!sectionRef.current) return

        gsap.from(sectionRef.current.querySelectorAll('.stat-cell'), {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
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
            ref={sectionRef}
            className="bg-bg-surface border-t border-b border-divider mt-12 px-6 py-8"
        >
            <div className="flex justify-between items-center">
                {stats.map((stat, i) => (
                    <div key={stat.label} className="contents">
                        <div className="stat-cell flex-1 flex flex-col items-center text-center">
                            <span className="font-display font-light text-[36px] text-accent">
                                {stat.value}
                            </span>
                            <span className="text-[9px] font-medium tracking-[3px] uppercase text-brand-muted mt-1">
                                {stat.label}
                            </span>
                        </div>
                        {i < stats.length - 1 && (
                            <div className="w-px h-10 bg-divider self-center" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
