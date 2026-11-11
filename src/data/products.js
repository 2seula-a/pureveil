export const categories = [
  { id: "cleanser", type: "Cleanse", ko: "클렌징" },
  { id: "serum", type: "Treat", ko: "세럼" },
  { id: "cream", type: "Moisturize", ko: "보습" },
  { id: "balm", type: "Finish", ko: "립 케어" },
];

export const products = [
  { id: "cleanser", category: "cleanser", label: "01 / CLEANSE", name: "Daily Cleanser", desc: "데일리 클렌저 · 120 mL", price: 24000 },
  { id: "calm-cleanser", category: "cleanser", label: "피부 진정", name: "Soft Calm Cleanser", desc: "소프트 캄 클렌저 · 120 mL", price: 26000 },
  { id: "hydrate-cleanser", category: "cleanser", label: "수분 보습", name: "Dew Moisture Cleanser", desc: "듀 모이스처 클렌저 · 120 mL", price: 26000 },
  { id: "serum", category: "serum", label: "02 / TREAT", name: "Water Serum", desc: "워터 세럼 · 30 mL", price: 38000 },
  { id: "calm-serum", category: "serum", label: "피부 진정", name: "Soft Calm Serum", desc: "소프트 캄 세럼 · 30 mL", price: 39000 },
  { id: "hydrate-serum", category: "serum", label: "수분 보습", name: "Dew Moisture Serum", desc: "듀 모이스처 세럼 · 30 mL", price: 39000 },
  { id: "cream", category: "cream", label: "03 / MOISTURIZE", name: "Daily Moisturizer", desc: "데일리 모이스처라이저 · 50 mL", price: 34000 },
  { id: "calm", category: "cream", label: "피부 진정", name: "Soft Calm Gel", desc: "소프트 캄 보습 젤 · 40 mL", price: 29000 },
  { id: "hydrate", category: "cream", label: "수분 보습", name: "Dew Barrier Cream", desc: "듀 배리어 크림 · 50 mL", price: 36000 },
  { id: "balm", category: "balm", label: "04 / FINISH", name: "Daily Lip Balm", desc: "데일리 립밤 · 4 g", price: 18000 },
];

export const won = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" });
export const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`;
