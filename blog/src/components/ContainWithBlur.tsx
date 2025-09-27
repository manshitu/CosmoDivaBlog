// src/components/ContainWithBlur.tsx
type Props = {
  src: string;
  alt: string;
  /** Height classes for the container (e.g. "h-40", "h-72 md:h-96") */
  height?: string;
  className?: string;
};

export default function ContainWithBlur({
  src,
  alt,
  height = "h-40",
  className = "",
}: Props) {
  if (!src) {
    // graceful fallback if image missing
    return (
      <div
        className={`relative ${height} w-full overflow-hidden rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative ${height} w-full overflow-hidden rounded-2xl bg-gray-100 ${className}`}
    >
      {/* blurred fill so there are no “white bars” */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
      />
      {/* true image, fully visible */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}
