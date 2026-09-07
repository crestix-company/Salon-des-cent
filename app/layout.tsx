import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';
const cormorant=Cormorant_Garamond({variable:'--font-editorial',subsets:['latin'],weight:['400','500'],style:['normal','italic'],display:'swap'});
export const metadata:Metadata={metadataBase:new URL('https://salon-des-cent.s-nishita.chatgpt.site'),title:'サロンデサン｜髪と頭皮の未来を考える、長岡市の美容室',description:'新潟県長岡市西宮内のプライベートサロン、サロンデサン。髪と頭皮へのやさしさを大切に、カット・カラー・ヘッドスパをご提案。営業時間9:00〜19:00。駐車場3台。'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="ja"><body className={cormorant.variable}>{children}</body></html>}
