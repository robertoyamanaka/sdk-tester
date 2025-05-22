"use client";

import { TEST_WALLET } from "@/lib/test-wallet";
import { useStakeVesuUsdc } from "@chipi-pay/chipi-sdk";
import { useAuth } from "@clerk/nextjs";
// import { cairo } from "starknet";

export const VESU_USDC_CONTRACT =
  "0x017f19582c61479f2fe0b6606300e975c0a8f439102f43eeecc1d0e9b3d84350";

export const USDC_CONTRACT =
  "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";

export function StakeButton() {
  const { stakeAsync } = useStakeVesuUsdc();
  const { getToken } = useAuth();

  const handleTransferUSDC = async () => {
    const token = await getToken({ template: "chipi-sdk" });
    if (!token) {
      alert("No bearer token found");
      return;
    }
    console.log("running transfer async");
    // const amountBigInt = cairo.uint256(1 * 10 ** 6);
    const transferResponse = await stakeAsync({
      encryptKey: "1234",
      bearerToken: token,
      wallet: TEST_WALLET,
      receiverWallet: TEST_WALLET.publicKey,
      amount: "1",
    });
    console.log("transferResponse", transferResponse);
    alert("Transferred USDC");
    alert(transferResponse);
    if (!transferResponse) {
      alert("Failed to create wallet");
      return;
    }
  };
  return (
    <button
      className="bg-blue-500 text-white p-2 rounded-md"
      onClick={handleTransferUSDC}
    >
      Stakear
    </button>
  );
}
