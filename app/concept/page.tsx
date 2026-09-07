import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/site-header';
import { Footer } from '@/components/site-footer';
import { PageIntro, SalonImage, Reservation } from '@/components/editorial';
export const metadata: Metadata = {
  title: 'サロンの想い｜サロンデサン',
  description:
    '髪と頭皮をいたわり、何年先も好きな髪型を楽しむために。サロンデサンが大切にするケアと似合わせへの想い。',
};
const care = [
  {
    id: 'gentle',
    en: 'Gentle care',
    title: '美しさの土台から、丁寧に。',
    body: 'ハリ・コシの変化や、カラー後の頭皮の違和感。そんなお悩みに寄り添えるよう、髪と頭皮への負担に配慮した商材を中心に使用。一人ひとりの状態に合うケアをご提案します。',
  },
  {
    id: 'color',
    en: 'Thoughtful color',
    title: '繰り返すカラーに、思いやりを。',
    body: '定期的に続ける白髪染めやヘアカラーだからこそ、これからの髪まで考えて。今の髪と頭皮の状態を確かめながら、いたわることと、自分らしい色を楽しむことの両方を大切にしています。',
  },
  {
    id: 'design',
    en: 'Personal design',
    title: 'あなたらしさを、暮らしの中に。',
    body: '髪質・骨格・生え癖に加え、パーソナルカラーも踏まえたスタイルをご提案。サロンでの仕上がりだけでなく、ご自宅で扱いやすいことも大切に、一人のスタイリストが丁寧に向き合います。',
  },
  {
    id: 'scalp',
    en: 'Scalp & relaxation',
    title: '頭皮をいたわる、ひと休み。',
    body: '低刺激のシャンプーを用いたヘッドスパで、頭皮をケアする時間を。髪の細さやハリ・コシ、頭皮環境の変化が気になり始めた方も、お気軽にご相談ください。',
  },
];
export default function ConceptPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageIntro
          number="01"
          english="OUR PHILOSOPHY"
          title="何年先も、自分らしく。"
        >
          髪と頭皮の未来まで考える、
          <br />
          長く通える美容室でありたい。
        </PageIntro>
        <section className="philosophy-story section-shell">
          <figure>
            <SalonImage
              name="light"
              alt="サロンの窓辺に飾られた花と、やわらかな光"
            />
            <figcaption>A QUIET MOMENT, JUST FOR YOU.</figcaption>
          </figure>
          <div>
            <p className="editorial-note">
              Beauty is
              <br />
              <i>a lasting relationship.</i>
            </p>
            <h2>
              今日のきれいを、
              <br />
              明日の髪につなげる。
            </h2>
            <p>
              大切にしているのは、
              <br />
              「今日きれいになること」だけではありません。
            </p>
            <p>
              カラーやパーマを繰り返しても、できるだけ髪や頭皮への負担を抑えながら、これから先もヘアスタイルを楽しんでいただきたい。
            </p>
            <p>
              年齢とともに変わるお悩みも、これから楽しみたいスタイルも。小さなことからお聞かせください。
            </p>
          </div>
        </section>
        <section className="philosophy-care dark-section">
          <div className="section-shell">
            <div className="care-page-heading">
              <p className="eyebrow">WHAT WE VALUE</p>
              <h2>
                丁寧であること。
                <br />
                あなたに合うこと。
              </h2>
            </div>
            {care.map((item, i) => (
              <article className="philosophy-item" id={item.id} key={item.id}>
                <span className="large-index">0{i + 1}</span>
                <div>
                  <p className="point-en">{item.en}</p>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="next-story section-shell">
          <div>
            <p className="eyebrow">MEET YOUR STYLIST</p>
            <h2>
              その想いを、
              <br />
              一人のスタイリストが。
            </h2>
          </div>
          <a className="text-link" href="/owner">
            オーナー紹介へ <ArrowUpRight size={21} />
          </a>
        </section>
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
