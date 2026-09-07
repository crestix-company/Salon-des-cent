import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/site-header';
import { Footer } from '@/components/site-footer';
import { SalonImage, SectionLabel, Reservation } from '@/components/editorial';
import { SALON_RESERVATION_URL } from '@/lib/reservations';

export default function Home() {
  return (
    <>
      <Header overlay />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-photo">
            <picture>
              <source
                media="(max-width: 700px)"
                srcSet="/images/editorial-mobile-640.webp 640w, /images/editorial-mobile-960.webp 960w"
                sizes="100vw"
              />
              <img
                src="/images/editorial-1920.webp"
                srcSet="/images/editorial-1280.webp 1280w, /images/editorial-1920.webp 1672w"
                sizes="100vw"
                alt="艶やかな髪の曲線を表現したイメージビジュアル"
                width="1672"
                height="941"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">SALON DES CENT — NAGAOKA, NIIGATA</p>
            <h1 id="hero-title">
              髪の未来まで、
              <br />
              <em>美しく。</em>
            </h1>
            <p className="hero-description">
              今日のきれいも、その先も。
              <br />
              髪と頭皮に、丁寧に向き合う
              <br className="mobile-break" />
              プライベートサロン。
            </p>
            <a
              className="text-link light-link"
              href={SALON_RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              サロンの公式サイトから予約する{' '}
              <ArrowUpRight size={20} strokeWidth={1} />
            </a>
          </div>
          <div className="hero-bottom">
            <span>Beauty, beyond today.</span>
            <a href="#concept">
              EXPLORE <ArrowDown size={16} strokeWidth={1} />
            </a>
            <span className="hero-image-note">HAIR VISUAL — IMAGE</span>
          </div>
        </section>
        <section className="home-concept section-shell" id="concept">
          <SectionLabel number="01">OUR PHILOSOPHY</SectionLabel>
          <div className="concept-layout">
            <div className="concept-title">
              <span className="editorial-note">
                For the beauty
                <br />
                <i>that stays.</i>
              </span>
              <h2>
                何年先も、
                <br />
                好きな髪型を
                <br />
                楽しむために。
              </h2>
            </div>
            <div className="concept-body">
              <p className="lead-copy">
                美しさは、一度きりではなく、
                <br />
                積み重ねていくもの。
              </p>
              <p>
                髪と頭皮をいたわりながら、
                <br />
                自分らしいスタイルを楽しみ続ける。
                <br />
                それが、サロンデサンの考えるヘアケアです。
              </p>
              <p>
                一人のスタイリストが、あなたの髪に向き合う。
                <br />
                小さな変化にも気づける距離で、
                <br />
                これからのきれいを、一緒に考えていきます。
              </p>
              <a className="text-link" href="/concept">
                サロンの想いを読む <ArrowUpRight size={20} strokeWidth={1} />
              </a>
            </div>
            <figure className="concept-photo">
              <SalonImage
                name="sofa"
                alt="窓からの光に包まれるサロンデサンのグリーンのソファ"
              />
              <figcaption>光が差し込む、いつもの場所で。</figcaption>
            </figure>
          </div>
        </section>
        <section className="home-care dark-section" id="care">
          <div className="care-image">
            <SalonImage
              name="care"
              alt="サロンデサンの鏡とブラウンのセット椅子"
            />
            <span className="image-index">THE ART OF PERSONAL CARE</span>
          </div>
          <div className="care-story">
            <SectionLabel number="02">OUR APPROACH</SectionLabel>
            <h2>
              似合う、その先の
              <br />
              心地よさまで。
            </h2>
            <p>
              髪質や骨格、頭皮の状態。
              <br />
              そして、毎日の暮らし方。
              <br />
              一人ひとりに合う理由のある提案を。
            </p>
            <div className="care-summary">
              <a href="/concept#gentle">
                <span>01</span>髪と頭皮への配慮
                <ArrowUpRight size={18} />
              </a>
              <a href="/concept#color">
                <span>02</span>繰り返すカラーへの思いやり
                <ArrowUpRight size={18} />
              </a>
              <a href="/concept#design">
                <span>03</span>日常になじむ、似合わせ
                <ArrowUpRight size={18} />
              </a>
            </div>
            <a className="text-link light-link" href="/concept">
              こだわりを詳しく <ArrowUpRight size={20} strokeWidth={1} />
            </a>
          </div>
        </section>
        <section className="home-menu section-shell" id="menu">
          <div className="menu-intro">
            <SectionLabel number="03">MENU & PRICE</SectionLabel>
            <h2 className="display-serif">
              Your kind
              <br />
              of <i>beautiful.</i>
            </h2>
            <p className="lead-copy">
              今のあなたに、
              <br />
              心地よい選択を。
            </p>
            <a className="text-link" href="/menu">
              メニュー・料金を見る <ArrowUpRight size={20} strokeWidth={1} />
            </a>
          </div>
          <div className="menu-list">
            <p className="price-note">
              基本メニュー <span>すべて税込</span>
            </p>
            {[
              ['Cut', 'カット', '¥3,800', 'ブロー込み'],
              ['Color', 'カラー', '¥4,300〜', 'シャンプー・ブロー込み'],
              ['Perm', 'パーマ', '¥8,600', 'カット・シャンプー・ブロー込み'],
              [
                'Head spa',
                'ヘッドスパ',
                '¥2,200',
                '頭皮をいたわる、リラックスタイム',
              ],
              [
                'Treatment',
                'トリートメント',
                '¥2,200',
                'クレンジング・ドライ込み',
              ],
            ].map(([en, jp, price, note]) => (
              <div className="menu-row" key={en}>
                <div>
                  <h3>
                    <span>{en}</span>
                    {jp}
                  </h3>
                  <p>{note}</p>
                </div>
                <span className="price">{price}</span>
              </div>
            ))}
            <p className="menu-footnote">
              カラーは髪の長さによって料金が異なります。
              <br />
              施術内容や料金は、ご予約時にもご確認ください。
            </p>
          </div>
        </section>
        <section className="home-owner section-shell" id="owner">
          <figure className="owner-photo">
            <SalonImage
              name="owner"
              alt="サロンデサンのオーナースタイリスト 栃原康彦"
            />
            <figcaption>YASUHIKO TOCHIHARA</figcaption>
          </figure>
          <div className="owner-intro">
            <SectionLabel number="04">MEET YOUR STYLIST</SectionLabel>
            <h2>
              髪のことを、
              <br />
              ずっと話せる人に。
            </h2>
            <p>
              あなたに似合うこと。
              <br />
              忙しい朝にも、扱いやすいこと。
              <br />
              サロンを出たあとの毎日まで考えて、
              <br />
              スタイルをご提案します。
            </p>
            <div className="owner-name">
              <span>OWNER / STYLIST</span>
              <h3>栃原 康彦</h3>
              <small>Yasuhiko Tochihara</small>
            </div>
            <a className="text-link" href="/owner">
              オーナーについて <ArrowUpRight size={20} strokeWidth={1} />
            </a>
          </div>
        </section>
        <section className="home-salon" id="salon">
          <div className="salon-top section-shell">
            <SectionLabel number="05">THE SALON</SectionLabel>
            <h2>
              自分のための、
              <br />
              静かなひととき。
            </h2>
            <p>
              白い壁、木の温もり、やわらかな光。
              <br />
              長岡・西宮内の小さなサロンで、
              <br />
              肩の力を抜いて、お過ごしください。
            </p>
          </div>
          <figure className="salon-panorama">
            <img
              src="/images/salon-1920.webp"
              srcSet="/images/salon-640.webp 640w, /images/salon-1280.webp 1280w, /images/salon-1920.webp 1920w"
              sizes="100vw"
              alt="白い壁と木の床、ブラウンの椅子が並ぶサロンデサンの店内"
              width="2048"
              height="1536"
              loading="lazy"
            />
            <figcaption>
              Salon des cent <span>PRIVATE HAIR SALON</span>
            </figcaption>
          </figure>
        </section>
        <section className="access-section section-shell" id="access">
          <div className="access-title">
            <SectionLabel number="06">ACCESS</SectionLabel>
            <h2 className="display-serif">
              See you
              <br />
              <i>in Nagaoka.</i>
            </h2>
            <SalonImage
              name="exterior"
              alt="新潟県長岡市西宮内2-4にあるサロンデサンの外観"
            />
          </div>
          <div className="access-info">
            <span className="eyebrow">SALON INFORMATION</span>
            <h3>サロンデサン</h3>
            <p className="salon-en">Salon des cent</p>
            <dl>
              <div>
                <dt>住所</dt>
                <dd>
                  新潟県長岡市西宮内2-4
                  <br />
                  <small>クスリのアオキ西宮内店様 向かい</small>
                </dd>
              </div>
              <div>
                <dt>営業時間</dt>
                <dd>9:00〜19:00</dd>
              </div>
              <div>
                <dt>定休日</dt>
                <dd>毎週月曜日・第1火曜日</dd>
              </div>
              <div>
                <dt>電話番号</dt>
                <dd>
                  <a href="tel:0258773631">0258-77-3631</a>
                </dd>
              </div>
              <div>
                <dt>駐車場</dt>
                <dd>3台</dd>
              </div>
            </dl>
            <a
              className="button"
              href="https://www.google.com/maps/search/?api=1&query=%E3%82%B5%E3%83%AD%E3%83%B3%E3%83%87%E3%82%B5%E3%83%B3%20%E6%96%B0%E6%BD%9F%E7%9C%8C%E9%95%B7%E5%B2%A1%E5%B8%82%E8%A5%BF%E5%AE%AE%E5%86%852-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Mapsで見る <ArrowUpRight size={19} />
            </a>
          </div>
        </section>
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
