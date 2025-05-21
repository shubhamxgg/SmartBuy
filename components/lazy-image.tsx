import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export const LazyImage = ({
  src,
  alt,
  className,
  sizes,
  fill = true,
  priority = false,
}: LazyImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={ref} className="relative w-full h-full bg-white">
      {isVisible ? (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={
            sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          className={`object-contain  ${className}`}
          loading={priority ? "eager" : "lazy"}
          quality={80}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};
