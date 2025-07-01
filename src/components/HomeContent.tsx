"use client"
import AirdropForm from "./AirdropForm";
import { useAccount } from "wagmi";

export default function HomeContent() {
    const { isConnected } = useAccount();

    return (
        <div>
            {isConnected ? (
                <AirdropForm/>
            ) : (
                <div>Please Connect Your Wallet</div>
            )}
        </div>
    )
}