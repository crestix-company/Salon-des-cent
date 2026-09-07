import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/site-header';
import { Footer } from '@/components/site-footer';
import { SALON_RESERVATION_URL } from '@/lib/reservations';
export const metadata: Metadata = { title: 'メニュー・料金｜サロンデサン' };
const categories = [
  {
    en: 'Cut',
    jp: 'カット',
    note: 'ブロー込み。シャンプーは＋¥550で追加できます。',
    rows: [
      ['一般', '¥3,800'],
      ['高校生', '¥3,300'],
      ['中学生', '¥2,700'],
      ['小学生以下', '¥2,200'],
    ],
  },
  {
    en: 'Color',
    jp: 'カラー',
    note: 'シャンプー・ブロー込み。カラーのみロング料金があります。',
    rows: [
      ['ショート', '¥4,300'],
      ['ミディアム', '¥4,900'],
      ['ロング', '¥5,400'],
    ],
  },
  {
    en: 'Perm & Straight',
    jp: 'パーマ・縮毛矯正',
    note: 'カット・シャンプー・ブロー込み。',
    rows: [
      ['パーマ', '¥8,600'],
      ['縮毛矯正', '¥13,000'],
    ],
  },
  {
    en: 'Hair & Scalp care',
    jp: 'トリートメント・ヘッドスパ',
    note: 'トリートメントはクレンジング・ドライ込み。サッパリ＆すっきりコースはカットとヘッドスパのセットです。',
    rows: [
      ['トリートメント', '¥2,200'],
      ['ヘッドスパ', '¥2,200'],
      ['サッパリ＆すっきりコース', '¥5,400'],
    ],
  },
  {
    en: 'Other',
    jp: 'その他',
    note: 'パーソナルカラー診断は、ドレープ（色布）を使用したテストカラーです。',
    rows: [
      ['ヘアセット', '¥3,800'],
      ['シャンプー', '¥1,100'],
      ['ブロー', '¥1,600'],
      ['パーソナルカラー診断', '¥1,600'],
    ],
  },
];
export default function MenuPage() {
  return (
    <>
      <Header />
      <main id="main" className="menu-page">
        <section className="menu-page-heading section-shell">
          <a className="breadcrumb" href="/">
            <ArrowLeft size={15} /> ホーム
          </a>
          <span className="eyebrow">MENU & PRICE</span>
          <h1>
            Beauty, <i>your way.</i>
          </h1>
          <p className="menu-page-jp">メニュー・料金</p>
          <p>
            今の髪に必要なケアと、あなたらしいスタイルを。
            <br />
            施術内容に迷われたら、お気軽にご相談ください。
          </p>
          <span className="tax-label">表示価格はすべて税込です。</span>
        </section>
        <div className="full-menu section-shell">
          {categories.map((c) => (
            <section key={c.en} className="menu-category">
              <h2>{c.en}</h2>
              <p className="category-jp">{c.jp}</p>
              <dl>
                {c.rows.map(([name, price]) => (
                  <div key={name}>
                    <dt>{name}</dt>
                    <dd>{price}</dd>
                  </div>
                ))}
              </dl>
              <p className="category-note">{c.note}</p>
            </section>
          ))}
          <aside className="menu-consultation">
            <p className="eyebrow">LET'S FIND YOUR STYLE</p>
            <h2>
              「私には、どんなケアがいい？」
              <br />
              そんなご相談からでも。
            </h2>
            <p>
              髪質や頭皮の状態、お悩みを伺いながら、
              <br />
              一人ひとりに合わせてご提案します。
            </p>
            <a
              className="button dark"
              href={SALON_RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              サロンの公式WEB予約 <ArrowUpRight size={18} />
            </a>
          </aside>
        </div>
        <div className="menu-source section-shell">
          <p>
            掲載料金は2026年9月7日に確認した基本メニューです。
            <br />
            料金の変更やクーポンの詳細は、
            <a
              href="https://beauty.hotpepper.jp/slnH000240941/coupon/CT00/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HOT PEPPER Beautyのメニューページ ↗
            </a>
            をご確認ください。
          </p>
          <a className="text-link" href="/">
            ホームに戻る <ArrowLeft size={17} />
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
