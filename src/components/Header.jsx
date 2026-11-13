import { useState } from "react";

export default function Header({ count, onOpenCart, onSelectCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="ribbon">
        <div className="ribbon-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              className="ribbon-content"
              key={index}
              aria-hidden={index === 1}
            >
              {[
                "피부에 닿는 순수함",
                "매일을 위한 순한 스킨케어",
                "맑고 촉촉하게, 피부 본연의 빛",
              ].map((text, i) => (
                <span className="ribbon-item" key={i}>
                  {text}
                  <span className="ribbon-star">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <header className="header">
        <a className="logo" href="#" aria-label="PUREVEIL 홈">
          PUREVEIL<span>DAILY SKINCARE</span>
        </a>
        <button
          type="button"
          className="menu"
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen((value) => !value)}
        >
          메뉴
        </button>
        <nav
          id="nav"
          aria-label="주 메뉴"
          className={menuOpen ? "open" : ""}
          onClick={(event) => {
            if (event.target.closest("a")) setMenuOpen(false);
          }}
        >
          <a href="#shop" onClick={() => onSelectCategory("all")}>
            전체 제품
          </a>
          <a href="#shop" onClick={() => onSelectCategory("cleanser")}>
            클렌징
          </a>
          <a href="#shop" onClick={() => onSelectCategory("serum")}>
            세럼
          </a>
          <a href="#shop" onClick={() => onSelectCategory("cream")}>
            보습
          </a>
          <a href="#shop" onClick={() => onSelectCategory("balm")}>
            립케어
          </a>
        </nav>
        <button type="button" className="bag" id="bag" onClick={onOpenCart}>
          쇼핑백 <span id="count">{count}</span>
        </button>
      </header>
    </>
  );
}
