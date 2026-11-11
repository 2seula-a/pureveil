# PUREVEIL — React + Vite

기존 PUREVEIL 정적 웹페이지를 React 컴포넌트와 상태 기반 UI로 변환한 프로젝트입니다.

## 실행
```bash
npm install
npm run dev
```

## 배포
GitHub 저장소 이름 `pureveil`을 기준으로 Vite `base`를 `/pureveil/`로 설정했습니다.
```bash
npm run build
npm run deploy
```

GitHub Pages Settings → Pages에서 `gh-pages` 브랜치와 `/(root)`를 선택하세요.

## 기능
- 메인 이미지 5초 자동 슬라이드, 수동 선택 및 일시 정지
- 카테고리/제품 필터 및 반응형 더보기
- 쇼핑백 수량 조절, 합계 계산, 로컬 저장
- 모바일 메뉴, 기존 이미지 및 CSS 유지

## 구조
- `src/App.jsx`: 전체 레이아웃, 쇼핑백 상태
- `src/components/Hero.jsx`: 메인 이미지 슬라이드
- `src/components/Shop.jsx`: 제품 필터 및 목록
- `src/components/Cart.jsx`: 쇼핑백 모달
- `src/data/products.js`: 상품 데이터 및 이미지 경로
- `public/assets`: 이미지 리소스
