# サロンデサン

長岡市の美容室「サロンデサン」のサイト。ヒアリングシートと提供された実店舗の写真をもとに制作。

## ローカル確認

- インストール: `npm ci`
- 起動: `npm run dev`
- 検証: `npx tsc --noEmit`、`npm run build:workers`
- ビルド後の確認: `npm run start -- --port 4191`
- 別ターミナルで全ページ・画像・予約リンクを確認: `node scripts/verify-site.mjs http://localhost:4191`

## ページ構成

- `/`：トップ、ケア、基本メニュー、オーナー、店内、アクセス、予約。
- `/concept`：サロンの想いとケアへのこだわり。
- `/menu`：基本メニュー・料金16項目。
- `/owner`：オーナー紹介。

ヘッダー・トップ・スマホ下部・メニューの主要な予約ボタンは、サロン独自の予約システムへ直接移動します。HOT PEPPER Beautyは補助リンクとして残しています。

## 掲載情報

- 店舗名、営業時間、定休日、住所、電話番号、駐車場、コンセプトはヒアリングシートと打ち合わせメモに準拠。
- 店名は打ち合わせで合意された「サロンデサン」に統一。
- SNS・問い合わせフォームは設置していません。オーナー紹介は追加依頼により作成しています。
- オーナーの情報は提供写真と公開プロフィールに準拠: https://beauty.hotpepper.jp/slnH000240941/stylist/T000183967/
- 料金は2026年9月7日確認の店舗掲載メニューに準拠: https://beauty.hotpepper.jp/slnH000240941/coupon/CT00/
- 店舗予約先: http://salon-de-san.com/pcreserve.php
- 参考デザイン: https://hiroyukimaekawa-lang.github.io/ANT-S/

## 写真

店内・オーナー写真の元データは指定のGoogle Driveフォルダ。DSCF0220とDSCF0269は、構図・家具・実店舗の特徴を維持した画像鮮明化を実施。その他の掲載写真は元データからWebPに変換。レスポンシブ配信と遅延読み込みで軽量化。

トップの髪の写真は、実際の施術事例ではない生成イメージです。制作指示・素材の記録は `DESIGN-NOTES.md` を参照してください。

## ホスティング

現在のビルドはSites / Cloudflare Workers向けのアプリケーションです。`dist/server`のWorkerと`dist/client`の静的素材を使います。

**Cloudflare Pagesの静的ディレクトリとしてそのまま設定しないでください。** Pagesへ移す場合は静的書き出しの設定と、出力ルートの`index.html`を別途検証してください。

- Workersビルド：`npm run build:workers`
- 公開せずWorker構成を検証：`npm run validate:workers`
- ビルドで生成される設定：`dist/server/wrangler.json`

GitHubへのコミット・プッシュはソースの納品です。GitHub Pagesの公開設定やCloudflareへのデプロイは行いません。リポジトリのルートにあるREADMEはホームページ本体ではありません。
