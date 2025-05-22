



"use client";

import { TEST_WALLET } from "@/lib/test-wallet";
import { useCallAnyContract } from "@chipi-pay/chipi-sdk";
import { useAuth } from "@clerk/nextjs";
// import { cairo } from "starknet";

export const USDC_CONTRACT =
  "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";
  

export function AnyContractButton() {
  const { callAnyContractAsync } = useCallAnyContract();
  const { getToken } = useAuth();

  const handleAnyContract = async () => {
    const token = await getToken({template: "chipi-sdk"});
    if (!token) {
      alert("No bearer token found");
      return;
    }
    console.log("running transfer async")
    // const amountBigInt = cairo.uint256(1 * 10 ** 6);
    const calls = [
      {
        contractAddress: USDC_CONTRACT,
        entrypoint: "transfer",
        calldata: [
          "0x073D8977e888C5167625CF20206dd284F215509F3c0eE284Fe5916ff6769B4e5", // Dirección del destinatario
          "0x0f4240", // 1 USDC
          "0x0"
        ]
      }
    ]
    const transferResponse = await callAnyContractAsync({
      encryptKey: "1234",
      bearerToken: token,
      wallet: TEST_WALLET,
      calls,
      contractAddress: USDC_CONTRACT,
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
        onClick={handleAnyContract}
      >
        Any contract
      </button>
      
  );
}
