import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli, bsc } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { GlobalContextProvider } from "./context";
import "@arco-design/web-react/dist/css/arco.css";
const { chains, publicClient } = configureChains(
  [bsc],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Webcash",
  projectId: "16b5ab87f7364185609096ccbf28abf8",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalContextProvider>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Router>
          <App />
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  </GlobalContextProvider>
);
