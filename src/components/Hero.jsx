import { useEffect, useState } from "react";
import { asset } from "../data/products.js";

const images = [
  {
    name: "hero-model.webp",
    alt: "하늘색 배경에서 볼에 크림을 바르는 모델",
    label: "모델 이미지 보기",
  },
  {
    name: "hero.webp",
    alt: "푸른 물결을 배경으로 놓인 클렌저, 세럼, 보습 크림",
    label: "제품 이미지 보기",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(!document.hidden);
  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = (event) => setPlaying(!event.matches);
    media.addEventListener?.("change", onMotion);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener?.("change", onMotion);
    };
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % images.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [playing, visible]);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span /> THE DAILY COLLECTION
        </p>
        <h1 id="hero-title">
          A fresh
          <br />
          <em>start.</em>
        </h1>
        <p className="hero-line">피부에 닿는 맑고 가벼운 순간.</p>
        <p className="desc">
          부드럽게 씻고, 촉촉하게 채우고, 가볍게 마무리하는
          <br /> 가벼운 데일리 스킨케어를 만나보세요.
        </p>
        <a className="cta" href="#shop">
          컬렉션 쇼핑하기 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div
        className="hero-media"
        role="group"
        aria-label="PUREVEIL 메인 이미지"
      >
        <div className="hero-art" id="hero-slides">
          {images.map((image, i) => (
            <img
              key={image.name}
              className={`hero-slide${i === active ? " is-active" : ""}`}
              src={asset(image.name)}
              alt={image.alt}
              aria-hidden={i !== active}
              fetchPriority={i === 0 ? "high" : undefined}
            />
          ))}
        </div>
        <div className="hero-controls">
          {images.map((image, i) => (
            <button
              key={image.name}
              type="button"
              className="hero-dot"
              aria-controls="hero-slides"
              aria-label={image.label}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span />
            </button>
          ))}
          <button
            className="hero-toggle"
            type="button"
            aria-controls="hero-slides"
            aria-label={playing ? "자동 전환 일시 정지" : "자동 전환 재생"}
            onClick={() => setPlaying((value) => !value)}
          >
            <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
