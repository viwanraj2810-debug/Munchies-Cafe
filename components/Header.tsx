'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[900] flex justify-between items-center px-6 transition-all duration-500 ${scrolled
                ? 'bg-bg-primary border-b border-divider py-3'
                : 'bg-transparent py-[18px]'
                }`}
        >
            <a href="#" className="flex items-center gap-1">
                <Image
                    src="/images/logo/logo ICON.png"
                    alt="Munchies Cafe icon"
                    width={150}
                    height={150}
                    className={`object-contain transition-all duration-500 ${scrolled ? 'h-[50px] w-[50px]' : 'h-[150px] w-[150px]'}`}
                    priority
                />
                {/* <Image
                    src="/images/logo/logo.png"
                    alt="Munchies Cafe"
                    width={160}
                    height={48}
                    className={`object-contain transition-all duration-500 ${scrolled ? 'h-[32px] w-auto' : 'h-[42px] w-auto'}`}
                    priority
                /> */}
            </a>

            <a
                href="tel:+919508351404"
                aria-label="Call Munchies Cafe"
                className="bg-accent text-brand-inverse text-[10px] font-medium tracking-[2px] uppercase px-[18px] py-[9px] rounded-[2px] transition-opacity duration-300 hover:opacity-85"
            >
                Call Now
            </a>
        </header>
    )
}
