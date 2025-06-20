"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, zksync } from "wagmi/chains";

export default getDefaultConfig({
    // Our App's name
    appName: "Nebula",
    // The WalletConnect's ID to enable Functionality.
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
    // The chains our wallet will work on.
    chains: [anvil, zksync],
    // Server Side Rendering is false because the website is static.
    ssr: false
})