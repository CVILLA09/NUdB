interface HeroProps {
    isNight: boolean;
}

export default function Hero({ isNight }: HeroProps) {
    // Overlay styles based on custom values:
    // Light: bg-white/[0.1] backdrop-blur-[6px]
    // Dark: bg-black/[0.1] backdrop-blur-[6px]
    const overlayStyle = isNight
        ? 'bg-black/[0.15] backdrop-blur-[6px]'
        : 'bg-white/[0.15] backdrop-blur-[6px]';

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Video Background */}
            <video
                key={isNight ? 'night' : 'day'}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-[30%_center] transition-opacity duration-500 ease-in-out"
            >
                <source src={isNight ? '/video/videofusionatnight.mp4' : '/video/videofusionday.mp4'} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className={`absolute inset-0 transition-all duration-500 ${overlayStyle}`} />

            {/* Hero Content */}
            <div className="relative z-10 h-full flex flex-col justify-center pl-[10%] md:pl-[15%]">
                <h1 className={`text-4xl md:text-6xl font-bold uppercase leading-tight max-w-2xl transition-all duration-500 ${isNight ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-black/90 drop-shadow-sm'}`}>
                    Construction<br />
                    Expertise in<br />
                    Los Cabos
                </h1>

                <button className={`mt-8 px-8 py-3 backdrop-blur-md border uppercase text-sm tracking-wider transition-all duration-300 w-fit rounded-sm ${isNight ? 'bg-black/30 border-white/10 text-white hover:bg-black/40' : 'bg-white/30 border-white/40 text-black hover:bg-white/40'}`}>
                    Learn More
                </button>
            </div>
        </div>
    );
}
