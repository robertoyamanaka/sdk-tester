"use client";

import { ChipiProvider } from "@chipi-pay/chipi-sdk";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChipiProvider
      config={{
        apiPublicKey: "pk_prod_5fc889d9527c24b9657b9c28399e91d4",
      }}
    >
      {children}
    </ChipiProvider>
  );
}
