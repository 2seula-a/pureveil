import { asset } from "../data/products.js";

export default function Editorial() {
  return (
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
  );
}
