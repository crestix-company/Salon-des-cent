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

## GitHub Pagesでの公開

公開先: https://crestix-company.github.io/Salon-des-cent/

GitHubの Settings → Pages → Build and deployment → Source は **GitHub Actions** に設定します。`Deploy from a branch / main / root` は使いません。その設定ではHPではなく、このREADMEが公開されてしまいます。

`main`へのプッシュで `.github/workflows/deploy-pages.yml` が実行され、全4ページの静的HTMLと画像・フォントを検証してから公開します。公開後も実際のURLの本文・画像・予約導線を自動検証します。

- 公開用ビルド: `npm run build:github-pages`
- 公開する成果物: **`dist/github-pages` のみ**（ルートの `index.html` が必須）
- 同じURL構造でローカル確認: `node scripts/serve-static.mjs dist/github-pages /Salon-des-cent 4193`
- 全ページ検証: `node scripts/verify-site.mjs http://127.0.0.1:4193/Salon-des-cent/`

Vinextの静的書き出しを利用し、GitHubのリポジトリ配下用に画像・リンク・フレームワーク素材のURLを統一しています。書き出されたHTMLファイルを各ページの `index.html` として配置します。サーバーやWorker、READMEは公開成果物に含めません。

完了判定はプッシュ成功ではなく、公開URLでHP本体が取得でき、全4ページと参照素材の確認が通ることです。

## Sites / Cloudflare Workers（別の公開方式）

従来のSites・Workers向け構成も保持しています。

- Workersビルド: `npm run build:workers`
- 公開せずWorker構成を検証: `npm run validate:workers`
- 生成される設定: `dist/server/wrangler.json`

**Cloudflare PagesにWorkersの出力をそのまま設定しないでください。** GitHub用成果物も `/Salon-des-cent/` 配下専用です。別のホスト・ドメインへ公開する場合は、そのURLに合わせた書き出しと実際の公開URLの検証を行ってください。
