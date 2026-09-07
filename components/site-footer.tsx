import { ArrowUp, ArrowUpRight, Phone } from 'lucide-react';
import { SALON_RESERVATION_URL } from '@/lib/reservations';
export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-top">
          <a className="brand" href="/" aria-label="サロンデサン ホーム">
            <span className="brand-wordmark">
              Salon <i>des</i> cent
            </span>
            <span className="brand-jp">サロンデサン</span>
          </a>
          <p>
            髪と頭皮の未来まで考える、
            <br />
            長く通える美容室。
          </p>
          <a className="back-top" href="#main" aria-label="ページの先頭へ">
            <ArrowUp size={22} strokeWidth={1} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Salon des cent</span>
          <nav aria-label="フッターナビゲーション">
            <a href="/concept">サロンの想い</a>
            <a href="/menu">メニュー</a>
            <a href="/owner">オーナー紹介</a>
            <a href="/#access">アクセス</a>
          </nav>
          <span>NAGAOKA, NIIGATA</span>
        </div>
      </footer>
      <div className="mobile-booking">
        <a href="tel:0258773631">
          <Phone size={16} /> 電話する
        </a>
        <a
          href={SALON_RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          公式WEB予約 <ArrowUpRight size={16} />
        </a>
      </div>
    </>
  );
}
