import { useEffect, useRef, useState } from "react";
import { asset, categories, products, won } from "../data/products.js";

export default function Shop({ onAdd }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [focusNew, setFocusNew] = useState(false);
  const listRef = useRef(null);
  const firstHidden = useRef(null);
  const visible =
    filter === "all" ? products : products.filter((p) => p.category === filter);
  useEffect(() => {
    if (focusNew) {
      firstHidden.current?.focus({ preventScroll: true });
      setFocusNew(false);
    }
  }, [expanded, focusNew]);
  function selectFilter(value, scroll = false) {
    setFilter(value);
    setExpanded(false);
    if (scroll) document.getElementById("shop")?.scrollIntoView();
  }
  function showMore() {
    const first = [...(listRef.current?.children ?? [])].find(
      (el) => el.getClientRects().length === 0,
    );
    firstHidden.current = first?.querySelector("h3") ?? null;
    setFocusNew(true);
    setExpanded(true);
  }
  return (
    <>
      <section className="section" id="collection">
        <div className="heading">
          <h2>
            Shop by <em>Ritual</em>
          </h2>
          <p>오늘의 루틴에 필요한 한 가지를 골라보세요.</p>
        </div>
        <div className="categories" id="categories">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className="category"
              onClick={() => selectFilter(category.id, true)}
            >
              <img src={asset(`${category.id}.webp`)} alt="" loading="lazy" />
              <strong>{category.type}</strong>
              <small>{category.ko}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="section shop" id="shop">
        <div className="heading">
          <h2>
            Everyday <em>Essentials</em>
          </h2>
          <p>클렌징부터 진정과 보습까지, 매일 손이 가는 스킨케어.</p>
        </div>
        <div
          className="filters"
          id="filters"
          role="group"
          aria-label="제품 필터"
        >
          {[{ id: "all", ko: "전체" }, ...categories].map((category) => (
            <button
              type="button"
              key={category.id}
              aria-pressed={filter === category.id}
              onClick={() => selectFilter(category.id)}
            >
              {category.ko}
            </button>
          ))}
        </div>
        <p id="results" className="sr" role="status">
          제품 {visible.length}개
        </p>
        <div
          id="products"
          ref={listRef}
          className={`products${expanded ? " is-expanded" : ""}`}
        >
          {visible.map((p) => (
            <article className="product" key={p.id}>
              <div className="product-photo" data-product={p.id}>
                <img src={asset(`${p.id}.webp`)} alt="" loading="lazy" />
              </div>
              <div className="product-info">
                <span className="tag">{p.label}</span>
                <h3 tabIndex={-1}>{p.name}</h3>
                <p>{p.desc}</p>
                <strong>{won.format(p.price)}</strong>
                <button
                  type="button"
                  className="add"
                  aria-label={`${p.name} 쇼핑백에 담기`}
                  onClick={() => onAdd(p.id)}
                >
                  쇼핑백에 담기 +
                </button>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="products-more"
          id="products-more"
          aria-controls="products"
          onClick={showMore}
        >
          더보기 <span aria-hidden="true">↓</span>
        </button>
      </section>
    </>
  );
}
