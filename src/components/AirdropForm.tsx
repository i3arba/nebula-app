"use client"

import InputField from "@/components/ui/InputField";
import { useMemo, useState, useEffect } from "react";
import { useChainId, useConfig, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { CgSpinner } from "react-icons/cg"
import { calculateTotal } from "@/utils";

export default function AirdropForm() {
    // State Hooks
    const [tokenAddress, setTokenAddress] = useState("");
    const [recipients, setRecipients] = useState("");
    const [amounts, setAmounts] = useState("");
    const { data: hash, isPending, error, writeContractAsync } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed, isError } = useWaitForTransactionReceipt({
        hash
    })

    // Wagmi Hook Helper
    const chainId = useChainId();
    const config = useConfig();
    const account = useAccount();
    const total: number = useMemo(() => calculateTotal(amounts), [amounts]);

    // Main Function
    async function handleSubmit() {
        // Query the tSenderAddress accordingly to the chain
        const tSenderAddress = chainsToTSender[chainId]["tsender"]
        // Query the approvedAmount for the tSenderAddress
        const approvedAmount = await getApprovedAmount(tSenderAddress);
        
        if (approvedAmount >= total) {
            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
                ],
            })
        } else {
            const approvalHash = await writeContractAsync({
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "approve",
                args: [tSenderAddress as `0x${string}`, BigInt(total)]
            });

            const approvalReceipt = await waitForTransactionReceipt(config, {
                hash: approvalHash
            })
            console.log("Approval Confirmed", approvalReceipt);

            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amounts.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),
                ],
            })
        }
    }

    // Functions
    // Get Approval Function
    async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
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

    useEffect(() => {
        const savedTokenAddress = localStorage.getItem('tokenAddress');
        const savedRecipients = localStorage.getItem('recipients');
        const savedAmounts = localStorage.getItem('amounts');

        if (savedTokenAddress) setTokenAddress(savedTokenAddress);
        if (savedRecipients) setRecipients(savedRecipients);
        if (savedAmounts) setAmounts(savedAmounts);
    }, []);

    useEffect(() => {
        localStorage.setItem('tokenAddress', tokenAddress)
    }, [tokenAddress])

    useEffect(() => {
        localStorage.setItem('recipients', recipients)
    }, [recipients])

    useEffect(() => {
        localStorage.setItem('amounts', amounts)
    }, [amounts])

    function getButtonContent() {
        if (isPending) {
            return (
                <div className="flex items-center justify-center gap-2 w-full">
                    <CgSpinner className="animate-spin" size={30} />
                    <span>Waiting for approval</span>
                </div>
            )
        } 
        if (isConfirming) {
            return (
                <div className="flex items-center justify-center gap-2 w-full">
                    <CgSpinner className="animate-spin" size={30} />
                    <span>Including transaction...</span>
                </div>
            )
        }
        if (error || isError) {
            console.log(error);
            return (
                <div className="flex items-center justify-center gap-2 w-full">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Error, see the console.
                    </span>
                    {/* Cosmic shimmer effect */}
                    <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-pulse"></div>
                </div>
            )
        }
        if (isConfirmed) {
            return "🎉 Tokens Sent"
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
            <div className="pt-4 flex items-center justify-center">
                <button
                    className="
                        w-40
                        mx-auto block
                        flex items-center
                        justify-center
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
                    onClick={handleSubmit}
                    disabled={isPending}
                >
                    {/* Cosmic shimmer effect */}
                    <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-pulse"></div>
                    {isPending || error || isConfirming
                        ? getButtonContent()
                        : "Send Tokens"
                    }
                </button>
            </div>
        </div>
    )
}