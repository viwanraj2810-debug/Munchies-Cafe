export default function Footer() {
    const navLinks = [
        { label: 'Menu', href: '#menu' },
        { label: 'About', href: '#about' },
        { label: 'Reviews', href: '#reviews' },
        { label: 'Contact', href: '#contact' },
    ]

    const socials = [
        {
            label: 'Instagram',
            href: '#',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
            ),
        },
        {
            label: 'Google Maps',
            href: '#',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
            ),
        },
        {
            label: 'Zomato',
            href: '#',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
            ),
        },
    ]

    return (
        <footer className="bg-bg-footer pt-[88px] pb-10 px-6">
            {/* Brand signature */}
            <h2 className="font-display font-light text-[52px] tracking-[2px] text-brand-primary leading-none">
                Munchies Cafe
            </h2>

            <p className="text-[13px] font-light italic text-brand-muted mt-2">
                Crafted with care. Served with love.
            </p>

            <div className="h-px bg-divider my-9" />

            {/* Navigation */}
            <nav className="flex flex-wrap gap-6">
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="text-[11px] font-normal tracking-[2px] uppercase text-brand-muted hover:text-accent transition-colors duration-300"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>

            {/* Social icons */}
            <div className="flex gap-[10px] mt-6">
                {socials.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-9 h-9 border border-border flex items-center justify-center rounded-[2px] text-brand-muted hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
                        title={social.label}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>

            {/* Copyright */}
            <p className="text-[11px] font-light text-brand-muted opacity-40 mt-10">
                © 2025 Munchies Cafe. All rights reserved.
            </p>
            <p className="text-[11px] font-light text-brand-muted opacity-40 mt-2 text-2xl font-bold">
                Designed and developed by <a href="https://www.meetshubham.site" target="_blank" className="hover:text-accent transition-colors duration-300">: Shubham Kumar Mishra</a>
            </p>
        </footer>
    )
}
