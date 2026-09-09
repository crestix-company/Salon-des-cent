# サロンデサン

長岡市の美容室「サロンデサン」のサイト。ヒアリングシートと提供された実店舗の写真をもとに制作。

## ローカル確認

- インストール: `npm ci`
- 起動: `npm run dev`
- 検証: `npx tsc --noEmit`、`npm run build`
- Cloudflareと同じ配信方式で確認: `npm run preview:cloudflare-pages`
- 別ターミナルで全ページ・画像・予約リンクを確認: `node scripts/verify-site.mjs http://127.0.0.1:4194/`

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

## Cloudflare Pagesでの公開（推奨）

Cloudflareの **Workers & Pages → 作成 → Pages → Gitに接続** から、このリポジトリを選択し、次の設定で保存・デプロイしてください。

| 項目 | 設定 |
| --- | --- |
| リポジトリ | `crestix-company/Salon-des-cent` |
| 本番ブランチ | `main` |
| フレームワークプリセット | **None（なし）** |
| ビルドコマンド | `npm run build` |
| ビルド出力ディレクトリ | `out` |
| ルートディレクトリ | 空欄（リポジトリ直下） |

Node.js 22系は `.node-version` で指定済みです。独自のAPIキー・トークン・環境変数は不要です。既存の `NODE_VERSION` が22未満なら削除するか22に変更してください。

**「デプロイコマンド」の入力を求められる場合はWorkers側です。今回はPagesを選択してください。** Next.jsサーバー用プリセット・`dist/server`・`dist/client`・`dist/github-pages` は指定しません。

既存のCloudflareプロジェクトに接続する場合も、ダッシュボードのビルドコマンド・出力先を上記に合わせてください。リポジトリの更新だけでは既存ダッシュボード設定は変更されません。

通常の `npm run build` はCloudflare Pages用の静的HTMLを生成します。トップは `out/index.html`、下層ページも個別の `index.html` です。画像・フォント・リンクはドメイン直下用で、`pages.dev` と独自ドメインの双方で利用できます。デザイン・掲載情報・サロン独自の予約先は維持しています。

ビルド中に全4ページとリンク先の画像・フォントを検証し、HP本体がない場合は失敗として止めます。GitHub ActionsでもCloudflare用のビルドと配信チェックを行います。

### コマンドで公開する場合（任意）

`cloudflare/wrangler.json` はCLI用のPages設定です。VinextがPages設定をWorker設定と誤認しないよう、開発用Workerとは分離しています。CloudflareのGit連携では上記のダッシュボード設定を使用します。

- ビルド: `npm run build:cloudflare-pages`
- ローカルのCloudflare Pages確認: `npm run preview:cloudflare-pages`
- Cloudflareへの公開: `npm run deploy:cloudflare-pages`（自分のCloudflareアカウントへのログインが必要）
- CLI設定のプロジェクト名: `salon-des-cent`。別の名前を使う場合は `cloudflare/wrangler.json` の `name` を合わせます。
- 公開後の確認: `node scripts/verify-site.mjs https://実際の公開ドメイン/`

Git連携を設定した後は、`main` へのプッシュでCloudflare側も自動更新されます。公開完了の判定は、Cloudflareが発行した実際のURLでの確認後に行ってください。

設定項目の根拠: [Cloudflare公式ビルド設定](https://developers.cloudflare.com/pages/configuration/build-configuration/)、[Node.jsの指定](https://developers.cloudflare.com/pages/configuration/build-image/)。

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

## Sites / 開発用Cloudflare Workers

Sites用の公開成果物も `out` に揃えています。開発用Worker構成は `wrangler.worker.jsonc` として保持しています。

- Workersビルド: `npm run build:workers`
- 公開せずWorker構成を検証: `npm run validate:workers`
- 生成される設定: `dist/server/wrangler.json`

Workersビルドは通常のCloudflare Pages公開では使用しません。GitHub用成果物も `/Salon-des-cent/` 配下専用です。
