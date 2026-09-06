"use client";

import { useEffect, useRef, useState } from "react";
import { Inter, Dancing_Script } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const stars = [
  { x: 8, y: 12, size: 8, duration: 3.2, delay: 0 },
  { x: 18, y: 28, size: 5, duration: 4.1, delay: 1.2 },
  { x: 31, y: 9, size: 10, duration: 3.7, delay: 2.1 },
  { x: 44, y: 18, size: 6, duration: 4.8, delay: 0.7 },
  { x: 57, y: 7, size: 8, duration: 3.5, delay: 1.8 },
  { x: 72, y: 15, size: 5, duration: 4.3, delay: 2.7 },
  { x: 87, y: 9, size: 9, duration: 3.9, delay: 0.4 },

  { x: 5, y: 42, size: 6, duration: 4.5, delay: 1.6 },
  { x: 16, y: 55, size: 9, duration: 3.4, delay: 2.4 },
  { x: 27, y: 39, size: 5, duration: 4.7, delay: 0.9 },
  { x: 39, y: 52, size: 8, duration: 3.8, delay: 2.9 },
  { x: 51, y: 43, size: 5, duration: 4.2, delay: 1.1 },
  { x: 64, y: 57, size: 9, duration: 3.6, delay: 0.3 },
  { x: 78, y: 44, size: 6, duration: 4.9, delay: 2.2 },
  { x: 92, y: 51, size: 8, duration: 3.3, delay: 1.4 },

  { x: 10, y: 73, size: 9, duration: 4.4, delay: 2.5 },
  { x: 22, y: 87, size: 5, duration: 3.5, delay: 0.6 },
  { x: 35, y: 69, size: 7, duration: 4.6, delay: 1.9 },
  { x: 48, y: 82, size: 5, duration: 3.9, delay: 2.8 },
  { x: 61, y: 72, size: 9, duration: 4.1, delay: 0.2 },
  { x: 74, y: 89, size: 6, duration: 3.7, delay: 1.5 },
  { x: 86, y: 70, size: 8, duration: 4.8, delay: 2.3 },
  { x: 96, y: 84, size: 5, duration: 3.4, delay: 0.8 },

  { x: 3, y: 94, size: 6, duration: 4.3, delay: 1.7 },
  { x: 29, y: 96, size: 8, duration: 3.6, delay: 2.6 },
  { x: 55, y: 94, size: 5, duration: 4.7, delay: 1.0 },
  { x: 81, y: 97, size: 7, duration: 3.8, delay: 2.0 },
];

export default function DigitalCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.5;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, []);

  const startMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {}
  };

  const flipCard = async () => {
    await startMusic();
    setIsFlipped((prev) => !prev);
  };

  const toggleMusic = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {}
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main
      className={`${inter.className} relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-12 transition-colors duration-1000 ${
        isFlipped ? "bg-[#09090f]" : "bg-[#f5f2ed]"
      }`}
    >
      {/* INFINITE BACKGROUND SPARKLES */}
      <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        {stars.map((star, i) => (
          <span
            key={i}
            className={`sparkle absolute transition-colors duration-1000 ${
              isFlipped ? "text-white/40" : "text-black/20"
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          >
            {i % 5 === 0
              ? "✦"
              : i % 5 === 1
                ? "✧"
                : i % 5 === 2
                  ? "⋆"
                  : i % 5 === 3
                    ? "·"
                    : "✦"}
          </span>
        ))}
      </div>

      {/* MUSIC */}
      <audio ref={audioRef} src='/music/card-music.mp3' loop preload='auto' />

      {/* MUSIC BUTTON */}
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={`fixed right-5 top-5 z-50 flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur transition hover:scale-105 active:scale-95 ${
          isFlipped ? "bg-white/10 text-white" : "bg-white/80 text-black"
        }`}
      >
        {isPlaying ? "♫" : "♪"}
      </button>

      {/* HEADER */}
      <div
        className={`relative z-10 mb-8 text-center transition-colors duration-1000 ${
          isFlipped ? "text-white" : "text-black"
        }`}
      >
        <p
          className={`text-xs uppercase tracking-[0.2em] transition-colors duration-1000 ${
            isFlipped ? "text-white/50" : "text-black/50"
          }`}
        >
          A little s(🎂)mething for you
        </p>

        <h1 className='mt-3 text-3xl font-medium tracking-tight md:text-4xl'>
          Tap the card
        </h1>

        <p
          className={`mt-2 text-sm transition-colors duration-1000 ${
            isFlipped ? "text-white/60" : "text-black/60"
          }`}
        >
          There&apos;s a message waiting on the other side. 🎉
        </p>
      </div>

      {/* CARD */}
      <div
        onClick={flipCard}
        className='relative z-10 aspect-[3/4] w-full max-w-[420px] cursor-pointer [perspective:1200px]'
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flipCard();
          }
        }}
        aria-label='Flip digital card'
      >
        <div
          className={`relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* FRONT */}
          <div className='absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-neutral-200 shadow-xl [backface-visibility:hidden]'>
            <img
              src='/images/card-front.jpg'
              alt='Card artwork'
              className='absolute inset-0 h-full w-full object-cover'
            />
          </div>

          {/* BACK */}
          <div className='absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#fffaf3] p-8 shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] md:p-12'>
            <div className='max-w-sm text-center'>
              <h2
                className={`${dancingScript.className} mt-6 text-xs font-normal leading-8 tracking-normal text-black md:text-base`}
              >
                My beautiful princess. Our very own Saraswati!! You&apos;re so{" "}
                <strong>incredible</strong> to the people around you; and
                extremely <strong>lovely</strong> to me too.{" "}
                <strong>Often</strong>, I&apos;m genuinely grateful for every
                laugh, conversation and little moment we&apos;ve shared.{" "}
                <strong>Very</strong> few people have the kind of presence that
                makes an ordinary day feel different. <strong>Even</strong> the
                smallest moments with you somehow stay with me.{" "}
                <strong>You</strong>&apos;re truly a blessing in ways words
                can&apos;t describe. <strong>Only</strong> on the days when
                you&apos;re not around, I hope you know that a little piece of
                my day feels missing too. <strong>Until</strong> we meet again,
                I hope you carry with you just how special you are to me.
                <br />
                Happy Birthday, Princess Sharon 💕
              </h2>

              <p className='mt-3 text-[5px] leading-7 text-black/60'>
                P.S I might have been keeping a little secret. You’ll find out
                soon enough.
              </p>

              <p
                className={`${dancingScript.className} mt-3 text-xs text-black/60`}
              >
                With love,
                <br />
                Miles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
