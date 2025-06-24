"use client"

import InputField from "@/components/ui/InputField";
import { useMemo, useState } from "react";
import { useChainId, useConfig, useAccount } from "wagmi";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import { readContract } from "@wagmi/core";

export default function AirdropForm() {
    // State Hooks
    const [tokenAddress, setTokenAddress ] = useState("");
    const [recipients, setRecipients] = useState("");
    const [amounts, setAmounts] = useState("");

    // Wagmi Hook Helper
    const chainId = useChainId();
    const config = useConfig();
    const account = useAccount();
    const total: number = useMemo(() => calculateTotal(amounts), [amounts]);

    // Functions
    // Get Approval Function
    async function getApprovedAmount(tSenderAddress: string | null): Promise<number>{
        if(!tSenderAddress) {
            alert("No TSender address found. Please, use a supported chain");
            return 0;
        }
        // Now, we can read the contract's allowance
        const response = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "allowance",
            args: [account.address, tSenderAddress as `0x${string}`]
        });

        return response as number;
    }

    // Main Function
    async function handleSubmit(){
        // Query the tSenderAddress accordingly to the chain
        const tSenderAddress = chainsToTSender[chainId]["tsender"]
        // Query the approvedAmount for the tSenderAddress
        const approvedAmount = getApprovedAmount(tSenderAddress);

        if(approvedAmount < totalAmount){

        }
    }

    return (
        <div>
            <InputField
                label="Token Address"
                placeholder="0x"
                value={tokenAddress}
                // This means that, every time the input field receives a new value, we must update the `tokenAddress` variable.
                onChange={e => setTokenAddress(e.target.value)}
            />
            <InputField
                label="Recipients"
                placeholder="0x77, 0x777"
                value={recipients}
                // This means that, every time the input field receives a new value, we must update the `recipients` variable.
                onChange={e => setRecipients(e.target.value)}
                large={true}
            />
            <InputField
                label="Amounts"
                placeholder="7, 77, 777, ..."
                value={amounts}
                // This means that, every time the input field receives a new value, we must update the `amounts` variable.
                onChange={e => setAmounts(e.target.value)}
                large={true}
            />
            <div className="pt-4">
                <button 
                    onClick={handleSubmit}
                    className="
                        w-40
                        mx-auto block
                        bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700
                        hover:from-purple-500 hover:via-blue-500 hover:to-indigo-600
                        text-white font-semibold
                        px-3 py-3 rounded-lg
                        shadow-lg hover:shadow-xl
                        transform hover:scale-105
                        transition-all duration-300 ease-in-out
                        border border-purple-400/30
                        relative overflow-hidden
                        group
                    "
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                        />
                    </svg>
                    Send Tokens
                    </span>
                    
                    {/* Cosmic shimmer effect */}
                    <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-pulse"></div>
                </button>
            </div>
        </div>
    )
}