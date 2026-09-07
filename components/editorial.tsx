import { ArrowUpRight } from 'lucide-react';
import { SALON_RESERVATION_URL, HOTPEPPER_URL } from '@/lib/reservations';

export function SalonImage({
  name,
  alt,
  className = '',
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const dimensions: Record<string, [number, number]> = {
    care: [1086, 1448],
    light: [960, 1280],
    owner: [1280, 1707],
  };
  const [width, height] = dimensions[name] ?? [1280, 960];
  return (
    <img
      className={className}
      src={`/images/${name}-1280.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp ${width}w`}
      sizes="(max-width: 700px) 100vw, 50vw"
      alt={alt}
      width={width}
      height={height}
      loading={priority ? undefined : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
    />
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}
export function Reservation() {
  return (
    <section className="reservation" id="reservation">
      <div className="reservation-heading">
        <p className="eyebrow">YOUR TIME, YOUR BEAUTY.</p>
        <h2>
          その先のきれいを、
          <br />
          ここから。
        </h2>
        <p>
          WEB予約は、サロンの公式予約システムから。
          <br />
          お電話でもご予約を承ります。
        </p>
      </div>
      <div className="reservation-actions">
        <a
          className="reservation-main"
          href={SALON_RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <small>SALON DIRECT RESERVATION</small>サロンの公式WEB予約
          </span>
          <ArrowUpRight size={26} strokeWidth={1} />
        </a>
        <a
          className="reservation-other"
          href={HOTPEPPER_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          HOT PEPPER Beautyをご利用の方はこちら <ArrowUpRight size={17} />
        </a>
        <div className="phone-block">
          <span className="eyebrow">TELEPHONE</span>
          <a href="tel:0258773631">0258-77-3631</a>
          <p>9:00〜19:00 ／ 毎週月曜日・第1火曜日定休</p>
        </div>
      </div>
    </section>
  );
}
export function PageIntro({
  number,
  english,
  title,
  children,
}: {
  number: string;
  english: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro section-shell">
      <a className="breadcrumb" href="/">
        HOME <span>/</span> {english}
      </a>
      <SectionLabel number={number}>{english}</SectionLabel>
      <h1>{title}</h1>
      {children && <p className="page-intro-copy">{children}</p>}
    </section>
  );
}
