import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Find the Stairs — Building stair and glass-elevator access",description:"Check stair and glass-elevator access at hotels, offices and condo buildings.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
