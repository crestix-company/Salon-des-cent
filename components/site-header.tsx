'use client';
import { sitePath } from '@/lib/site-path';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { SALON_RESERVATION_URL } from '@/lib/reservations';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';

const links = [
  ['CONCEPT', 'サロンの想い', '/concept'],
  ['MENU', 'メニュー', '/menu'],
  ['OWNER', 'オーナー紹介', '/owner'],
  ['ACCESS', 'アクセス', '/#access'],
];
export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <a href="#main" className="skip-link">
        本文へ移動
      </a>
      <header className={`site-header ${overlay ? 'header-overlay' : ''}`}>
        <a
          className="brand"
          href={sitePath('/')}
          aria-label="サロンデサン ホーム"
        >
          <span className="brand-wordmark">
            Salon <i>des</i> cent
          </span>
          <span className="brand-jp">サロンデサン</span>
        </a>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {links.map(([en, jp, url]) => (
            <a
              href={sitePath(url)}
              key={en}
              aria-label={jp}
              aria-current={
                pathname?.replace(/\/$/, '') ===
                  sitePath(url).replace(/\/$/, '') || pathname === url
                  ? 'page'
                  : undefined
              }
            >
              {en}
            </a>
          ))}
        </nav>
        <a
          className="header-booking"
          href={SALON_RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            RESERVATION<small>公式WEB予約</small>
          </span>
          <ArrowUpRight size={19} strokeWidth={1} />
        </a>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="mobile-nav-trigger"
            aria-label="メニューを開く"
          >
            <Menu size={26} strokeWidth={1} />
          </SheetTrigger>
          <SheetContent className="mobile-sheet" showCloseButton={false}>
            <div className="sheet-top">
              <SheetTitle>Salon des cent</SheetTitle>
              <SheetClose className="close-menu" aria-label="メニューを閉じる">
                <X strokeWidth={1} />
              </SheetClose>
            </div>
            <SheetDescription>
              髪と頭皮の未来を考える、サロンデサン。
            </SheetDescription>
            <nav aria-label="モバイルナビゲーション">
              <a href={sitePath('/')} onClick={() => setOpen(false)}>
                <span>HOME</span>
                <small>トップ</small>
                <ArrowUpRight size={18} />
              </a>
              {links.map(([en, jp, url]) => (
                <a href={sitePath(url)} onClick={() => setOpen(false)} key={en}>
                  <span>{en}</span>
                  <small>{jp}</small>
                  <ArrowUpRight size={18} />
                </a>
              ))}
            </nav>
            <a
              className="button dark"
              href={SALON_RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              サロンの公式WEB予約 <ArrowUpRight size={18} />
            </a>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
