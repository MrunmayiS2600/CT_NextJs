import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "CleverTap Next.js Web App",
  description: "CleverTap Integration Example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* CleverTap Web SDK */}
        <Script
          id="clevertap-web-sdk"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.clevertap = {
                event: [],
                profile: [],
                account: [],
                onUserLogin: [],
                notifications: [],
                privacy: [],
                region: 'eu1', // Europe
                spa: true
              };
              
              clevertap.account.push({ "id": "TEST-6Z8-W9R-R47Z" }, "eu1");
              clevertap.privacy.push({ optOut: false });
              clevertap.privacy.push({ useIP: true });

              (function() {
                var wzrk = document.createElement("script");
                wzrk.type = "text/javascript";
                wzrk.async = true;
                wzrk.src = ("https:" == document.location.protocol 
                  ? "https://d2r1yp2w7bby2u.cloudfront.net" 
                  : "http://static.clevertap.com") + "/js/clevertap.min.js";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(wzrk, s);
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
