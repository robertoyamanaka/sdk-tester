



"use client";

import { TEST_WALLET } from "@/lib/test-wallet";
import { useTransfer } from "@chipi-pay/chipi-sdk";
import { useAuth } from "@clerk/nextjs";
// import { cairo } from "starknet";

export const USDC_CONTRACT =
  "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";
  
const RECIPIENT_WALLET_ADDRESS = "0x073D8977e888C5167625CF20206dd284F215509F3c0eE284Fe5916ff6769B4e5"


export function TransferUSDCButton() {
  const { transferAsync } = useTransfer();
  const { getToken } = useAuth();

  const handleTransferUSDC = async () => {
    const token = await getToken({template: "chipi-sdk"});
    if (!token) {
      alert("No bearer token found");
      return;
    }
    console.log("running transfer async")
    // const amountBigInt = cairo.uint256(1 * 10 ** 6);
    const transferResponse = await transferAsync({
      encryptKey: "1234",
      bearerToken: token,
      wallet: TEST_WALLET,
      contractAddress: USDC_CONTRACT,
      recipient: RECIPIENT_WALLET_ADDRESS,
      amount: "1",
      decimals: 6,
    });
    console.log('transferResponse',transferResponse);
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
        Transfer USDC
      </button>
      
  );
}
