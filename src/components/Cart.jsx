import { useEffect, useRef } from "react";
import { asset, products, won } from "../data/products.js";

export default function Cart({ open, onClose, cart, onQuantity }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  const items = products.filter((p) => cart[p.id]);
  const total = items.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  return (
    <dialog
      id="drawer"
      ref={dialogRef}
      aria-labelledby="drawer-title"
      onClose={onClose}
    >
      <div className="drawer-head">
        <h2 id="drawer-title">쇼핑백</h2>
        <button
          type="button"
          aria-label="쇼핑백 닫기"
          onClick={() => dialogRef.current?.close()}
        >
          ✕
        </button>
      </div>
      <div id="cart-items">
        {items.length ? (
          items.map((p) => (
            <div className="cart-row" key={p.id}>
              <img src={asset(`${p.id}.webp`)} alt="" />
              <div>
                <strong>{p.name}</strong>
                <small>{won.format(p.price)}</small>
              </div>
              <div className="qty">
                <button
                  type="button"
                  aria-label={`${p.name} 수량 줄이기`}
                  onClick={() => onQuantity(p.id, -1)}
                >
                  −
                </button>
                <span>{cart[p.id]}</span>
                <button
                  type="button"
                  aria-label={`${p.name} 수량 늘리기`}
                  onClick={() => onQuantity(p.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>쇼핑백이 비어 있어요.</p>
        )}
      </div>
      <div id="cart-total">
        <strong>합계</strong>
        <strong>{won.format(total)}</strong>
      </div>
    </dialog>
  );
}
