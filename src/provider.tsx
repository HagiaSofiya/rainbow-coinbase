"use client";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useState } from "react";
import { cookieToInitialState, WagmiProvider } from "wagmi";

import { config } from "./wagmi";

export function Providers({
  children,
  cookie,
}: {
  cookie: string;
  children: React.ReactNode;
}) {
  // Initialize a new QueryClient instance using useState hook
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // ✅ globally default to 20 seconds
            staleTime: 1000 * 20,
            retry: 1,
          },
        },
      })
  );

  // Convert cookie to initial state for WagmiProvider
  const initialState = cookieToInitialState(config, cookie);
  return (
    <WagmiProvider config={config} {...(initialState ? { initialState } : {})}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            borderRadius: "none",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
