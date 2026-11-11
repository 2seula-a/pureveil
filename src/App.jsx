import { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import Shop from "./components/Shop.jsx";
import Cart from "./components/Cart.jsx";
import { asset, products } from "./data/products.js";

const STORAGE_KEY = "pureveil-cart";
function readCart() {
  try {
    // 기존 정적 버전에서 저장한 쇼핑백도 이어받을 수 있도록 처리합니다.
    const saved =
      JSON.parse(
        localStorage.getItem(STORAGE_KEY) ??
          localStorage.getItem("roselune-cart") ??
          "{}",
      ) || {};
    return Object.fromEntries(
      products
        .filter((p) => Number.isSafeInteger(saved[p.id]) && saved[p.id] > 0)
        .map((p) => [p.id, saved[p.id]]),
    );
  } catch {
    return {};
  }
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(readCart);
  const [toast, setToast] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  function changeQuantity(id, delta) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + delta;
      if (quantity > 0) next[id] = quantity;
      else delete next[id];
      return next;
    });
  }
  function addProduct(id) {
    changeQuantity(id, 1);
    setToast("쇼핑백에 담았어요.");
  }
  return (
    <>
      <a className="skip" href="#main">
        본문으로 건너뛰기
      </a>
      <div className="ribbon">
        THE PURE EDIT <span>✦</span> 맑고 가볍게 시작하는 데일리 케어
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
          <a href="#collection">컬렉션</a>
          <a href="#shop">제품</a>
          <a href="#ritual">뷰티 리추얼</a>
        </nav>
        <button
          type="button"
          className="bag"
          id="bag"
          onClick={() => setCartOpen(true)}
        >
          쇼핑백 <span id="count">{count}</span>
        </button>
      </header>
      <main id="main">
        <Hero />
        <div className="ritual-strip">
          <span>
            <b>01</b> CLEANSE <small>부드럽게 씻기</small>
          </span>
          <span>
            <b>02</b> TREAT <small>촉촉하게 채우기</small>
          </span>
          <span>
            <b>03</b> MOISTURIZE <small>가볍게 마무리</small>
          </span>
        </div>
        <Shop onAdd={addProduct} />
        <section className="editorial" id="ritual">
          <img
            src={asset("ritual.webp")}
            alt="아이보리 린넨 위에 놓인 크림과 푸른빛 세럼"
            loading="lazy"
          />
          <div>
            <h2>
              A moment
              <br />
              <em>for yourself.</em>
            </h2>
            <p>
              미지근한 물로 하루를 씻어내고, 손바닥에 덜어낸 세럼을 얼굴에
              가볍게 눌러보세요. 크림을 천천히 펴 바르는 동안 나만의 속도로
              하루를 마무리해요.
            </p>
            <a className="cta" href="#shop">
              루틴 제품 보기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>
      <footer>
        <a className="logo" href="#">
          PUREVEIL<span>DAILY SKINCARE</span>
        </a>
        <p>피부에 닿는 맑고 가벼운 순간.</p>
        <a href="#">맨 위로 ↑</a>
      </footer>
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onQuantity={changeQuantity}
      />
      <div id="toast" role="status">
        {toast}
      </div>
    </>
  );
}
