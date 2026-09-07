# サロンデサン

長岡市の美容室「サロンデサン」のサイト。ヒアリングシートと提供された実店舗の写真をもとに制作。

## ローカル確認

- インストール: `npm ci`
- 起動: `npm run dev`
- 検証: `npx tsc --noEmit`、`npm run build`

## 掲載情報

- 店舗名、営業時間、定休日、住所、電話番号、駐車場、コンセプトはヒアリングシートと打ち合わせメモに準拠。
- 店名は打ち合わせで合意された「サロンデサン」に統一。
- SNS・問い合わせフォーム・スタッフ紹介は依頼シートに従い設置していません。
- 料金は2026年9月7日確認の店舗掲載メニューに準拠: https://beauty.hotpepper.jp/slnH000240941/coupon/CT00/
- 店舗予約先: http://salon-de-san.com/pcreserve.php
- 参考デザイン: https://hiroyukimaekawa-lang.github.io/ANT-S/

## 写真

元データは指定のGoogle Driveフォルダ。DSCF0220とDSCF0269は、構図・家具・実店舗の特徴を維持した画像鮮明化を実施。その他の掲載写真は元データからWebPに変換。レスポンシブ配信と遅延読み込みで軽量化。

## ホスティング

現在のビルドはSites / Cloudflare Workers向けのアプリケーションです。`dist/server`のWorkerと`dist/client`の静的素材を使います。

**Cloudflare Pagesの静的ディレクトリとしてそのまま設定しないでください。** Pagesへ移す場合は静的書き出しの設定と、出力ルートの`index.html`を別途検証してください。
