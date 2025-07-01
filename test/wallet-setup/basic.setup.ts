import { defineWalletSetup } from "@synthetixio/synpress";
import { MetaMask } from "@synthetixio/synpress/playwright";

// Define a mock seed phrase ad password
const SEED_PHRASE = 'test test test test test test test test test test test junk';
const PASSWORD = 'Tester@1234'

// Define the basic Wallet setup
export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
    // Create a new MetaMask instance
    const metamask = new MetaMask(context, walletPage, PASSWORD);

    await metamask.importWallet(SEED_PHRASE);
});