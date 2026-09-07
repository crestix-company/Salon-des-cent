# サロンデサン — ローカルリデザイン記録

2026-09-07のリデザイン・素材の記録。GitHubへのソース納品と、公開サイトへのデプロイは別工程です。

## 構成

- /：トップ。髪のイメージビジュアル、想い、ケア、基本メニュー、オーナー、実店舗、アクセス、予約。
- /concept：サロンの想いと4つのケアの考え方。
- /menu：既存の基本メニュー16項目を維持。
- /owner：実際のオーナー写真と公開プロフィールをもとにした紹介。

Sites制作スキルに沿って、既存の構成・予約機能を維持しながら、濃いチャコールと明朝体、非対称の写真配置へ再設計。写真は実店舗・提供素材を優先。トップの髪のみ、実際の施術事例ではない生成イメージ。

## オーナーの情報

確認元：https://beauty.hotpepper.jp/slnH000240941/stylist/T000183967/

氏名：栃原 康彦（トチハラ ヤスヒコ）。
会社員経験、忙しい朝に扱いやすいスタイルの提案、ナチュラルなイメージ、シャンプーを得意とする情報をもとに編集。架空の受賞歴・資格・インタビュー・実績は追加していない。年数は一覧ページと詳細ページの表示に差があるため掲載していない。

写真：提供素材 originals/staff-2.jpg を使用。顔や服装を生成で置き換えていない。

## 新規トップ画像

方式：標準の組み込み imagegen（imagegenスキル）。1回生成、バリエーションや再生成なし。

保存した原本：
/Users/apple/Documents/Codex/2026-08-24/https-drive-google-com-drive-folders/work/salon-de-sun-assets/editorial/salon-des-cent-editorial-hero.png

実際の出力サイズ：1672 × 941 px。

サイト内のファイル：
- public/images/editorial-1920.webp（原寸1672px、約90KB）
- public/images/editorial-1280.webp（約60KB）
- public/images/editorial-640.webp（約18KB）
- public/images/editorial-mobile-960.webp（縦画面向け、約69KB）
- public/images/editorial-mobile-640.webp（縦画面向け、約43KB）
- public/images/owner-1280.webp（約125KB）
- public/images/owner-640.webp（約32KB）

元の生成画像と実店舗写真を混同しないよう、トップ画像の代替テキストと小さな注記にイメージビジュアルと明記。WebP化と画面幅に合う読み込みで軽量化。

### 使用プロンプト（原文）

Use case: ads-marketing
Asset type: conceptual editorial website hero photograph for luxury Japanese hair salon Salon des cent.
Primary request: ONE landscape 16:9 image, approximately 2560 × 1440 pixels, of close-up abstract sculptural flowing long dark-chocolate hair.
Scene/backdrop: deep espresso to near-black background, seamless and quiet.
Subject: organic photorealistic long hair arranged in broad elegant S-curves across the right 65% of the frame. Exceptionally fine, natural individual strands, soft volume, subtle organic irregularity and believable hair texture.
Style/medium: luxurious beauty campaign editorial photograph, restrained cinematic realism.
Composition/framing: close-up, sweeping sculptural curves with hair extending beyond the image edges; the left 35% must be rich, dark, uncluttered negative space suitable for a white website headline.
Lighting/mood: quiet cinematic champagne rimlight, restrained warm highlights along the curves, deep soft shadows, elegant and calm.
Color palette: near-black espresso, dark chocolate, subtle champagne.
Constraints: this is a conceptual campaign visual, not a customer result. Hair must look like real organic hair, not plastic ribbons.
Avoid: face, hands, people, salon interior, text, letters, logos, watermark, objects, plastic appearance, metallic surfaces, bright gold, excessive shine.
