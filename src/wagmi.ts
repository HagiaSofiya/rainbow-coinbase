import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig } from "wagmi";
import { cookieStorage, createStorage, http } from "wagmi";
import { foundry, mainnet, sepolia } from "wagmi/chains";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, walletConnectWallet, coinbaseWallet],
    },
  ],
  {
    // Name of the application
    appName: "Alkimiya Production",

    // Project ID for WalletConnect, fetched from environment variables
    projectId: `${process.env.NEXT_PUBLIC_WC_PROJECT_ID}`,
  }
);

// Exporting the configuration object for the application
export const config = createConfig({
  connectors,
  // Array of blockchain networks (chains) the application will support
  chains: [mainnet, foundry, sepolia],

  // Enable server-side rendering (SSR)
  ssr: true,

  // Configuration for storage, using cookies in this case
  storage: createStorage({
    storage: cookieStorage,
  }),

  // Transport configurations for different chains
  transports: {
    [sepolia.id]: http(),
    [foundry.id]: http(process.env.NEXT_PUBLIC_STAGING_RPC_URL),
    [mainnet.id]: http(), // Add this line to fix the error
  },
});
