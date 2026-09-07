import { sitePath } from '@/lib/site-path';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/site-header';
import { Footer } from '@/components/site-footer';
import { SalonImage, SectionLabel, Reservation } from '@/components/editorial';
export const metadata: Metadata = {
  title: 'オーナー紹介｜栃原康彦｜サロンデサン',
  description:
    'サロンデサンのオーナースタイリスト、栃原康彦。忙しい朝の扱いやすさと、一人ひとりに似合うナチュラルなスタイルを大切にしています。',
};
export default function OwnerPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="owner-profile section-shell">
          <div className="profile-heading">
            <a className="breadcrumb" href={sitePath('/')}>
              HOME <span>/</span> OWNER
            </a>
            <SectionLabel number="02">THE PERSON BEHIND THE SALON</SectionLabel>
            <h1>
              毎日の髪に、
              <br />
              向き合う人。
            </h1>
            <div className="profile-name">
              <p className="eyebrow">OWNER / STYLIST</p>
              <h2>栃原 康彦</h2>
              <p className="profile-roman">
                Yasuhiko
                <br />
                <i>Tochihara</i>
              </p>
            </div>
          </div>
          <figure className="profile-photo">
            <SalonImage
              name="owner"
              alt="オーナースタイリスト 栃原康彦"
              priority
            />
            <figcaption>サロンデサン ／ オーナー紹介</figcaption>
          </figure>
        </section>
        <section className="owner-story section-shell">
          <p className="section-label">
            <span>01</span>HIS APPROACH
          </p>
          <div>
            <h2>
              サロンでの一日より、
              <br />
              そのあとの毎日のために。
            </h2>
            <p>
              会社員として働いた経験から、忙しい朝にも整えやすいスタイルを大切にする栃原。日々の生活になじむ、ナチュラルなデザインを提案しています。
            </p>
            <p>
              髪質や生え癖、骨格、そして一人ひとりの好み。
              <br />
              お話を伺いながら、あなただけの「似合う」を一緒に見つけていきます。
            </p>
            <p>
              カットやカラーだけでなく、シャンプーの時間も丁寧に。髪を整えるひとときが、日々の心地よさにつながるように。
            </p>
            <a
              className="text-link"
              href="https://beauty.hotpepper.jp/slnH000240941/stylist/T000183967/"
              target="_blank"
              rel="noopener noreferrer"
            >
              HOT PEPPER Beautyでプロフィールを見る <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="owner-values dark-section">
          <div className="section-shell">
            <p className="eyebrow">A PERSONAL APPROACH</p>
            <div className="owner-value-grid">
              <article>
                <span>01 / NATURAL</span>
                <h2>自然体の、似合わせ。</h2>
                <p>
                  あなたの個性を活かした、
                  <br />
                  暮らしになじむスタイルに。
                </p>
              </article>
              <article>
                <span>02 / EVERYDAY</span>
                <h2>朝の扱いやすさ。</h2>
                <p>
                  毎日の身支度が、
                  <br />
                  少し心地よくなるように。
                </p>
              </article>
              <article>
                <span>03 / ONE TO ONE</span>
                <h2>ずっと相談できる距離。</h2>
                <p>
                  一人のスタイリストが、
                  <br />
                  髪のお悩みと希望に向き合います。
                </p>
              </article>
            </div>
          </div>
        </section>
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
