'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { MenuItem, MenuCategory } from '@/types'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface MenuProps {
    items: MenuItem[]
    categories: MenuCategory[]
}

const categoryLabels: Record<string, string> = {
    veg: 'Vegetarian',
    'non-veg': 'Non-Vegetarian',
    'south-indian': 'South Indian',
    beverages: 'Beverages',
    salads: 'Salads',
}

export default function Menu({ items, categories }: MenuProps) {
    const [activeCategory, setActiveCategory] = useState<string>('all')
    const menuContainerRef = useRef<HTMLDivElement>(null)
    const hasRevealedRef = useRef(false)
    const isFirstRender = useRef(true)
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [customerName, setCustomerName] = useState('')
    const [address, setAddress] = useState('')
    const [quantity, setQuantity] = useState(1)

    const [plate, setPlate] = useState<Record<string, { item: MenuItem; qty: number }>>({})
    const [isPlateOpen, setIsPlateOpen] = useState(false)

    const PLATE_STORAGE_KEY = 'munchies-plate-v1'
    const WHATSAPP_PHONE_NUMBER = '919508351404' // Change to your WhatsApp number (with country code, no +)

    const plateCount = Object.values(plate).reduce((sum, entry) => sum + entry.qty, 0)
    const plateTotal = Object.values(plate).reduce((sum, entry) => sum + entry.item.price * entry.qty, 0)

    const removeFromPlate = (itemId: string) => {
        setPlate((prev) => {
            const copy = { ...prev }
            delete copy[itemId]
            return copy
        })
    }

    const updatePlateQty = (itemId: string, qty: number) => {
        setPlate((prev) => {
            const entry = prev[itemId]
            if (!entry) return prev
            return { ...prev, [itemId]: { ...entry, qty: Math.max(1, qty) } }
        })
    }

    const openPlate = () => setIsPlateOpen(true)

    const closePlate = () => {
        setIsPlateOpen(false)
        setCustomerName('')
        setAddress('')
    }

    const toggleItemInPlate = (item: MenuItem) => {
        setPlate((prev) => {
            if (prev[item.id]) {
                const copy = { ...prev }
                delete copy[item.id]
                return copy
            }
            const current = prev[item.id]
            const nextQty = (current?.qty || 0) + 1
            return { ...prev, [item.id]: { item, qty: nextQty } }
        })
    }

    /* Restore plate from localStorage on mount */
    useEffect(() => {
        if (typeof window === 'undefined') return
        try {
            const stored = window.localStorage.getItem(PLATE_STORAGE_KEY)
            if (stored) {
                const parsed = JSON.parse(stored) as Record<
                    string,
                    { item: MenuItem; qty: number }
                >
                if (parsed && typeof parsed === 'object') {
                    setPlate(parsed)
                }
            }
        } catch {
            // ignore corrupted storage
        }
    }, [])

    /* Persist plate to localStorage whenever it changes and notify listeners */
    useEffect(() => {
        if (typeof window === 'undefined') return
        try {
            window.localStorage.setItem(PLATE_STORAGE_KEY, JSON.stringify(plate))
        } catch {
            // storage may be unavailable; fail silently
        }

        try {
            const detail = { count: plateCount, total: plateTotal }
            window.dispatchEvent(
                new CustomEvent('munchies:plate-updated', { detail }),
            )
        } catch {
            // ignore if CustomEvent is not available
        }
    }, [plate, plateCount, plateTotal])

    /* Listen for global request to open plate (from sticky bottom bar) */
    useEffect(() => {
        if (typeof window === 'undefined') return

        const handler = () => {
            if (Object.values(plate).length > 0) {
                setIsPlateOpen(true)
            }
        }

        window.addEventListener(
            'munchies:open-plate',
            handler as unknown as EventListener,
        )

        return () => {
            window.removeEventListener(
                'munchies:open-plate',
                handler as unknown as EventListener,
            )
        }
    }, [plate])

    const openItemModal = (item: MenuItem) => {
        setSelectedItem(item)
        setIsModalOpen(true)
        setShowOrderForm(false)
        setCustomerName('')
        setAddress('')
        setQuantity(1)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedItem(null)
        setShowOrderForm(false)
        setCustomerName('')
        setAddress('')
        setQuantity(1)
    }

    const handleOrderNowClick = () => {
        setShowOrderForm(true)
    }

    const handlePlaceOrder = () => {
        if (!selectedItem) return
        if (!customerName.trim()) {
            alert('Please enter your name to continue.')
            return
        }
        if (!address.trim()) {
            alert('Please enter your address to continue.')
            return
        }

        const totalPrice = selectedItem.price * quantity

        const messageLines = [
            'Hello, I would like to place an order 👇',
            '',
            `Name: ${customerName}`,
            `Dish: ${selectedItem.name}`,
            `Category: ${categoryLabels[selectedItem.category] || selectedItem.category}`,
            `Type: ${selectedItem.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}`,
            `Price (per item): ₹${selectedItem.price}`,
            `Quantity: ${quantity}`,
            `Total: ₹${totalPrice}`,
            '',
            'Customer details:',
            `Address: ${address}`,
        ]

        const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
            messageLines.join('\n'),
        )}`

        window.open(whatsappUrl, '_blank')
        // Remove this item from plate once ordered from the single-dish flow
        setPlate((prev) => {
            if (!selectedItem || !prev[selectedItem.id]) return prev
            const copy = { ...prev }
            delete copy[selectedItem.id]
            return copy
        })
        closeModal()
    }

    const handlePlacePlateOrder = () => {
        const entries = Object.values(plate)
        if (entries.length === 0) {
            alert('Your plate is empty. Please add items first.')
            return
        }
        if (!customerName.trim()) {
            alert('Please enter your name to continue.')
            return
        }
        if (!address.trim()) {
            alert('Please enter your address to continue.')
            return
        }

        const lines: string[] = []
        lines.push('Hello, I would like to place an order 👇')
        lines.push('')
        lines.push(`Name: ${customerName}`)
        lines.push('')
        lines.push('Order items:')

        entries.forEach(({ item, qty }, idx) => {
            const lineTotal = item.price * qty
            lines.push(`${idx + 1}) ${item.name} — ₹${item.price} x ${qty} = ₹${lineTotal}`)
        })

        lines.push('')
        lines.push(`Grand total: ₹${plateTotal}`)
        lines.push('')
        lines.push('Customer details:')
        lines.push(`Address: ${address}`)

        const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
            lines.join('\n'),
        )}`

        window.open(whatsappUrl, '_blank')
        setPlate({})
        closePlate()
    }

    /* Lock body scroll when any modal is open */
    useEffect(() => {
        if (typeof document === 'undefined') return

        const originalOverflow = document.body.style.overflow

        if (isModalOpen || isPlateOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = originalOverflow || ''
        }

        return () => {
            document.body.style.overflow = originalOverflow || ''
        }
    }, [isModalOpen, isPlateOpen])
    const filtered =
        activeCategory === 'all'
            ? items
            : items.filter((i) => i.category === activeCategory)

    /* Group by category */
    const grouped = filtered.reduce<Record<string, MenuItem[]>>((acc, item) => {
        if (!acc[item.category]) acc[item.category] = []
        acc[item.category].push(item)
        return acc
    }, {})

    /* Initial scroll-triggered reveal */
    useEffect(() => {
        const container = menuContainerRef.current
        if (!container || hasRevealedRef.current) return

        const cards = container.querySelectorAll('.menu-card')
        if (cards.length === 0) return

        gsap.set(cards, { opacity: 0, y: 30, scale: 0.95 })

        ScrollTrigger.create({
            trigger: container,
            start: 'top 82%',
            once: true,
            onEnter: () => {
                hasRevealedRef.current = true
                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power2.out',
                })
            },
        })

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === container) {
                    st.kill()
                }
            })
        }
    }, [])

    /* Animate on category change (not the first render) */
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (!menuContainerRef.current) return
        const cards = menuContainerRef.current.querySelectorAll('.menu-card')
        if (cards.length === 0) return

        gsap.from(cards, {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.7,
            stagger: 0.06,
            ease: 'power2.out',
        })
    }, [activeCategory])

    return (
        <section id="menu" className="bg-bg-primary py-[88px]">
            {/* Header */}
            <div className="px-6 text-center">
                <span className="text-[10px] font-body font-medium tracking-[4px] uppercase text-accent block">
                    About Our Food
                </span>
                <h2 className="font-display font-light text-[40px] md:text-[52px] leading-[1.05] text-brand-primary mt-3">
                    <em>Delicious</em> dishes, crafted with love
                </h2>
                <p className="text-[13px] font-light text-brand-muted leading-[1.8] mt-3 max-w-md mx-auto">
                    Every dish on our menu is prepared with the freshest ingredients and authentic spices
                </p>
            </div>

            {/* Category pills */}
            <div className="flex gap-2 justify-center flex-wrap px-6 pb-5 mt-8">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`border text-[10px] font-medium tracking-[2px] uppercase px-5 py-[10px] rounded-[2px] whitespace-nowrap transition-all duration-300 ${activeCategory === cat.slug
                            ? 'bg-accent text-brand-inverse border-accent'
                            : 'border-border text-brand-muted hover:border-accent hover:text-accent'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-divider mx-6 mb-8" />

            {/* Menu items — showcase grid */}
            <div ref={menuContainerRef}>
                {Object.entries(grouped).map(([category, categoryItems]) => (
                    <div key={category} className="mb-12">
                        <h3 className="font-display italic font-light text-[28px] text-brand-primary border-l-2 border-accent pl-[14px] mx-6 mb-8">
                            {categoryLabels[category] || category}
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-6">
                            {categoryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="menu-card group flex flex-col items-center text-center cursor-pointer"
                                    onClick={() => openItemModal(item)}
                                >
                                    {/* Circular image */}
                                    <div className="relative w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-full overflow-hidden border-2 border-accent/20 group-hover:border-accent/50 transition-all duration-500">
                                        <Image
                                            src={item.imageUrl}
                                            fill
                                            alt={item.name}
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            sizes="(max-width: 768px) 140px, 170px"
                                        />
                                    </div>

                                    {/* Veg/Non-veg indicator + Name */}
                                    <div className="mt-4 flex items-center justify-center gap-1.5">
                                        <div className={`w-2 h-2 border flex-shrink-0 ${item.isVeg
                                            ? 'border-green-600 bg-green-600'
                                            : 'border-red-600 bg-red-600'
                                            }`}
                                        />
                                        <h4 className="text-[13px] font-medium tracking-[1px] uppercase text-brand-primary">
                                            {item.name}
                                        </h4>
                                    </div>

                                    {/* Description */}
                                    <p className="text-[11px] font-light text-brand-muted leading-[1.6] mt-2 line-clamp-2 px-1 max-w-[200px]">
                                        {item.description}
                                    </p>

                                    {/* Price */}
                                    <span className="text-[14px] font-medium text-accent mt-2">
                                        ₹{item.price}
                                    </span>

                                    {(() => {
                                        const inPlate = !!plate[item.id]
                                        return (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleItemInPlate(item)
                                                }}
                                                className={`mt-3 inline-flex items-center justify-center px-4 py-2 rounded-[2px] border text-[10px] font-semibold tracking-[2px] uppercase transition-colors ${inPlate
                                                    ? 'bg-accent text-brand-inverse border-accent'
                                                    : 'border-accent/40 text-accent hover:bg-accent hover:text-brand-inverse hover:border-accent'
                                                    }`}
                                            >
                                                {inPlate ? 'In Plate' : 'Add to Plate'}
                                            </button>
                                        )
                                    })()}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Dish detail + order modal */}
            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/70 px-4 overflow-y-auto pt-24 pb-28 md:pt-28 md:pb-28">
                    <div className="relative w-full max-w-sm md:max-w-md rounded-md bg-bg-primary border border-border shadow-2xl px-5 py-6 max-h-[calc(100vh-220px)] overflow-y-auto">
                        <button
                            onClick={closeModal}
                            className="absolute right-4 top-3 text-brand-muted hover:text-accent text-xl"
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden border-2 border-accent/30 mb-4">
                                <Image
                                    src={selectedItem.imageUrl}
                                    alt={selectedItem.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div
                                    className={`w-2.5 h-2.5 border flex-shrink-0 ${selectedItem.isVeg
                                        ? 'border-green-600 bg-green-600'
                                        : 'border-red-600 bg-red-600'
                                        }`}
                                />
                                <h3 className="text-[15px] font-semibold tracking-[1.2px] uppercase text-brand-primary">
                                    {selectedItem.name}
                                </h3>
                            </div>

                            <p className="text-[12px] text-brand-muted leading-relaxed mb-2">
                                {selectedItem.description}
                            </p>
                            <p className="text-[11px] text-brand-muted mb-3 italic">
                                {categoryLabels[selectedItem.category] || selectedItem.category}
                            </p>

                            <span className="text-[18px] font-semibold text-accent mb-4">
                                ₹{selectedItem.price}
                            </span>

                            {!showOrderForm && (
                                <div className="mt-2 flex w-full gap-3">
                                    <button
                                        type="button"
                                        onClick={() => toggleItemInPlate(selectedItem)}
                                        className={`flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-[2px] border text-[11px] font-semibold tracking-[2px] uppercase transition-colors ${plate[selectedItem.id]
                                            ? 'bg-accent text-brand-inverse border-accent'
                                            : 'border-accent/40 text-accent hover:bg-accent hover:text-brand-inverse hover:border-accent'
                                            }`}
                                    >
                                        {plate[selectedItem.id] ? 'In Plate' : 'Add to Plate'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleOrderNowClick}
                                        className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-[2px] bg-accent text-[11px] font-semibold tracking-[2px] uppercase text-brand-inverse hover:bg-accent/90 transition-colors"
                                    >
                                        Order Now
                                    </button>
                                </div>
                            )}

                            {showOrderForm && (
                                <div className="mt-4 w-full text-left">
                                    <label className="block text-[11px] font-medium text-brand-muted tracking-[1px] uppercase mb-2">
                                        Name
                                    </label>
                                    <input
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full rounded-[2px] bg-bg-secondary border border-border outline-none text-[12px] text-brand-primary px-3 py-2 focus:border-accent/80"
                                        placeholder="Your name"
                                    />

                                    <label className="block text-[11px] font-medium text-brand-muted tracking-[1px] uppercase mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows={3}
                                        className="w-full rounded-[2px] bg-bg-secondary border border-border outline-none text-[12px] text-brand-primary px-3 py-2 resize-none focus:border-accent/80"
                                        placeholder="Enter your full delivery address"
                                    />

                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <span className="block text-[11px] font-medium text-brand-muted tracking-[1px] uppercase mb-1">
                                                Quantity
                                            </span>
                                            <div className="inline-flex items-center rounded-[2px] border border-border bg-bg-secondary">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setQuantity((q) => (q > 1 ? q - 1 : 1))
                                                    }
                                                    className="px-3 py-1.5 text-[14px] text-brand-muted hover:text-accent"
                                                >
                                                    −
                                                </button>
                                                <span className="px-4 text-[13px] text-brand-primary">
                                                    {quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setQuantity((q) => q + 1)}
                                                    className="px-3 py-1.5 text-[14px] text-brand-muted hover:text-accent"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <span className="block text-[11px] text-brand-muted uppercase tracking-[1px] mb-1">
                                                Total
                                            </span>
                                            <span className="text-[15px] font-semibold text-accent">
                                                ₹{selectedItem.price * quantity}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handlePlaceOrder}
                                        className="mt-5 w-full inline-flex items-center justify-center px-6 py-2.5 rounded-[2px] bg-emerald-500 text-[11px] font-semibold tracking-[2px] uppercase text-white hover:bg-emerald-600 transition-colors"
                                    >
                                        Continue on WhatsApp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Plate modal (multi-dish checkout) */}
            {isPlateOpen && (
                <div className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/70 px-4 overflow-y-auto pt-24 pb-28 md:pt-28 md:pb-28">
                    <div className="relative w-full max-w-lg rounded-md bg-bg-primary border border-border shadow-2xl p-6 max-h-[calc(100vh-220px)] overflow-y-auto">
                        <button
                            onClick={closePlate}
                            className="absolute right-4 top-3 text-brand-muted hover:text-accent text-xl"
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-[14px] font-semibold tracking-[2px] uppercase text-brand-primary">
                                    Your Plate
                                </h3>
                                <p className="text-[11px] text-brand-muted mt-1">
                                    Items added: <span className="text-brand-primary">{plateCount}</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] uppercase tracking-[1px] text-brand-muted">
                                    Total
                                </p>
                                <p className="text-[16px] font-semibold text-accent">₹{plateTotal}</p>
                            </div>
                        </div>

                        {Object.values(plate).length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-[12px] text-brand-muted">
                                    Your plate is empty. Add dishes from the menu.
                                </p>
                            </div>
                        ) : (
                            <div className="max-h-[320px] overflow-auto pr-1">
                                {Object.values(plate).map(({ item, qty }) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between gap-3 py-3 border-b border-divider"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-[12px] font-semibold text-brand-primary truncate">
                                                {item.name}
                                            </p>
                                            <p className="text-[11px] text-brand-muted mt-1">
                                                ₹{item.price} each
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="inline-flex items-center rounded-[2px] border border-border bg-bg-secondary">
                                                <button
                                                    type="button"
                                                    onClick={() => updatePlateQty(item.id, qty - 1)}
                                                    className="px-3 py-1.5 text-[14px] text-brand-muted hover:text-accent"
                                                >
                                                    −
                                                </button>
                                                <span className="px-4 text-[13px] text-brand-primary">
                                                    {qty}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => updatePlateQty(item.id, qty + 1)}
                                                    className="px-3 py-1.5 text-[14px] text-brand-muted hover:text-accent"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromPlate(item.id)}
                                                className="text-[10px] font-semibold tracking-[2px] uppercase text-brand-muted hover:text-accent"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-5">
                            <label className="block text-[11px] font-medium text-brand-muted tracking-[1px] uppercase mb-2">
                                Name
                            </label>
                            <input
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full rounded-[2px] bg-bg-secondary border border-border outline-none text-[12px] text-brand-primary px-3 py-2 focus:border-accent/80"
                                placeholder="Your name"
                            />

                            <label className="block text-[11px] font-medium text-brand-muted tracking-[1px] uppercase mb-2 mt-4">
                                Address
                            </label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows={3}
                                className="w-full rounded-[2px] bg-bg-secondary border border-border outline-none text-[12px] text-brand-primary px-3 py-2 resize-none focus:border-accent/80"
                                placeholder="Enter your full delivery address"
                            />

                            <button
                                type="button"
                                onClick={handlePlacePlateOrder}
                                className="mt-5 w-full inline-flex items-center justify-center px-6 py-2.5 rounded-[2px] bg-emerald-500 text-[11px] font-semibold tracking-[2px] uppercase text-white hover:bg-emerald-600 transition-colors disabled:opacity-60"
                                disabled={Object.values(plate).length === 0}
                            >
                                Continue on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
