import { useState } from "react";
import { cn } from "@/lib/utils";

const ANNOUNCEMENTS = [
  "Limited Launch Offer: Flat 10% OFF on Fyber",
  "Free Shipping on All Orders",
  "First 100 customers get an exclusive Fiberise Fit gift",
  "Precision Weight Loss Backed by Science",
];

export const AnnouncementMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 right-0 w-full bg-black text-white overflow-hidden border-b border-gray-800 z-[60]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center h-7 md:h-8 relative">
        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative w-full">
          <div
            className={cn(
              "flex items-center gap-8 md:gap-12",
              !isPaused && "animate-marquee"
            )}
          >
            {/* Render announcements multiple times for seamless loop */}
            {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map(
              (announcement, index) => (
                <div
                  key={`${announcement}-${index}`}
                  className="flex items-center whitespace-nowrap text-[10px] md:text-xs font-medium px-3 md:px-4"
                >
                  {announcement}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

