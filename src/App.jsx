import { useEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import Shop from "./components/Shop.jsx";
import Cart from "./components/Cart.jsx";
import { products } from "./data/products.js";
import Header from "./components/Header.jsx";
import RitualStrip from "./components/RitualStrip.jsx";
import Editorial from "./components/Editorial.jsx";
import Footer from "./components/Footer.jsx";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(readCart);
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState("all");
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
      <Header
        count={count}
        onOpenCart={() => setCartOpen(true)}
        onSelectCategory={setFilter}
      />
      <main id="main">
        <Hero />
        <RitualStrip />
        <Shop onAdd={addProduct} filter={filter} setFilter={setFilter} />
        <Editorial />
      </main>
      <Footer />
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
