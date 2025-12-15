"use client";

export default function SignupButton() {
  return (
    <button
      className="
        flex items-center gap-6
        px-2 py-2
        bg-[#0e0e0e]
        rounded-md
        shadow-lg
        bg-white
        hover:shadow-2xl
        transition-all duration-200
        cursor-pointer
      "
    >
      {/* YELLOW BOX */}
      <div
        className="
          w-[55px] h-[55px]
          bg-[#FFD84D]
          rounded-md
          flex items-center justify-center
          overflow-hidden
        "
      >
        {/* VIDEO CIRCLE */}
        <div
          className="
            w-[48px] h-[48px]
            rounded-full
            overflow-hidden
            bg-black
          "
        >
          <video
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* TEXT */}
<span
  className="
    text-black
    text-xs sm:text-sm
    tracking-[0.2em]
    font-medium
    whitespace-nowrap
  "
>
  SIGN UP NOW
</span>

    </button>
  );
}
