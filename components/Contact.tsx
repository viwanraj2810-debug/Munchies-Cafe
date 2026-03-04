import type { RestaurantInfo } from '@/types'

interface ContactProps {
    info: RestaurantInfo
}

export default function Contact({ info }: ContactProps) {
    const contactRows = [
        { icon: '📍', label: info.address, href: info.mapUrl },
        { icon: '📞', label: info.phone, href: `tel:${info.phone}` },
        {
            icon: '💬',
            label: 'Order on WhatsApp',
            href: `https://wa.me/${info.whatsapp}`,
        },
        { icon: '🕐', label: info.hours, href: null },
    ]

    return (
        <section id="contact" className="bg-bg-surface pt-[88px]">
            {/* Header */}
            <div className="px-6">
                <span className="text-[10px] font-body font-medium tracking-[4px] uppercase text-accent block">
                    Find Us
                </span>
                <h2 className="font-display font-light text-[36px] mt-3 text-brand-primary">
                    <em>Come as guests.</em> Leave as family.
                </h2>
            </div>

            {/* Map */}
            <div className="w-full mt-6 relative h-[56vw] max-h-[320px]">
                <iframe
                    src={info.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Munchies Cafe location on Google Maps"
                />
            </div>

            {/* Contact tiles */}
            <div className="px-6 mt-0">
                {contactRows.map((row, i) => {
                    const inner = (
                        <>
                            <span className="text-accent text-[18px]">{row.icon}</span>
                            <span className="text-[13px] font-light text-brand-primary flex-1">
                                {row.label}
                            </span>
                            {row.href && (
                                <span className="text-accent ml-auto">→</span>
                            )}
                        </>
                    )

                    if (row.href) {
                        return (
                            <a
                                key={i}
                                href={row.href}
                                target={row.href.startsWith('http') ? '_blank' : undefined}
                                rel={
                                    row.href.startsWith('http')
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                className="flex items-center gap-[14px] py-4 border-b border-divider transition-opacity duration-300 hover:opacity-75"
                            >
                                {inner}
                            </a>
                        )
                    }

                    return (
                        <div
                            key={i}
                            className="flex items-center gap-[14px] py-4 border-b border-divider"
                        >
                            {inner}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
