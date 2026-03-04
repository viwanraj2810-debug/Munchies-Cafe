export default function MarqueeStrip() {
    const text =
        'OPEN DAILY · 12PM TO 11PM · DINE IN · TAKEAWAY · PRIVATE EVENTS · ZOMATO 4.8★ · '

    return (
        <div className="bg-accent overflow-hidden h-9 flex items-center">
            <div className="marquee-inner flex whitespace-nowrap">
                <span className="text-[10px] font-medium tracking-[4px] uppercase text-brand-inverse px-2">
                    {text}
                </span>
                <span className="text-[10px] font-medium tracking-[4px] uppercase text-brand-inverse px-2">
                    {text}
                </span>
                <span className="text-[10px] font-medium tracking-[4px] uppercase text-brand-inverse px-2">
                    {text}
                </span>
                <span className="text-[10px] font-medium tracking-[4px] uppercase text-brand-inverse px-2">
                    {text}
                </span>
            </div>
        </div>
    )
}
