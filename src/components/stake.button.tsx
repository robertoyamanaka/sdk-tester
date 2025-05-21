



"use client";

import { useStakeVesuUsdc } from "@chipi-pay/chipi-sdk";
import { useAuth } from "@clerk/nextjs";
// import { cairo } from "starknet";

export const VESU_USDC_CONTRACT =
  "0x017f19582c61479f2fe0b6606300e975c0a8f439102f43eeecc1d0e9b3d84350";

  export const USDC_CONTRACT =
  "0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8";
  

const wallet = {
  publicKey: "0x675de9d8c806e1ef53e8f36443e2953bc96ccb0fb790092d276e101bd552c41",
  encryptedPrivateKey: "U2FsdGVkX19h2GRdiY8pTIdEFcMCiV1/QzMvL1GcICyGxJhUZfE4rK/4HoEbfHnrkdtdR+JdSa90r8fbP9lsFESZlgqxTnmamTHX8JjOrZuRvxp9oKBneD65cWPrpNKu",
}

export function StakeButton() {
  const { stakeAsync } = useStakeVesuUsdc();
  const { getToken } = useAuth();

  const handleTransferUSDC = async () => {
    const token = await getToken({template: "chipi-sdk"});
    if (!token) {
      alert("No bearer token found");
      return;
    }
    console.log("running transfer async")
    // const amountBigInt = cairo.uint256(1 * 10 ** 6);
    const transferResponse = await stakeAsync({
      encryptKey: "1234",
      bearerToken: token,
      wallet,
      receiverWallet: wallet.publicKey,
      amount: "1",
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
        Stakear
      </button>
      
  );
}
