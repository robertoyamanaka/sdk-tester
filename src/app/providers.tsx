"use client";

import { ChipiProvider } from "@chipi-pay/chipi-sdk";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChipiProvider
      config={{
        apiPublicKey: "pk_prod_8b2b771ad0030c4d8b58ee09a15a6ac4",
      }}
    >
      {children}
    </ChipiProvider>
  );
}
