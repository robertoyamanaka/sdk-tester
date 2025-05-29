"use client";

import { useCreateWallet, WalletData } from "@chipi-pay/chipi-sdk";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const ENCRYPT_KEY = "1234";

export function CreateWalletButton() {
  const { createWalletAsync } = useCreateWallet();
  const { getToken } = useAuth();
  const [createdWallet, setCreatedWallet] = useState<WalletData | null>(null);

  const handleCreateWallet = async () => {
    const token = await getToken({template: "chipi-sdk-2"});
    if (!token) {
      alert("No bearer token found");
      return;
    }
    const createWalletResponse = await createWalletAsync({
      encryptKey: ENCRYPT_KEY,
      bearerToken: token,
    });
    console.log('createWalletResponse',createWalletResponse);
    if (!createWalletResponse) {
      alert("Failed to create wallet");
      return;
    }
    setCreatedWallet(createWalletResponse.wallet);
  };
  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleCreateWallet}
      >
        Create Wallet
      </button>
      {createdWallet && (
        <div>
          <p>Wallet created</p>
          <p>Public key: {createdWallet.publicKey}</p>
          <p>Encrypted private key: {createdWallet.encryptedPrivateKey}</p>
        </div>
      )}
    </div>
  );
}
