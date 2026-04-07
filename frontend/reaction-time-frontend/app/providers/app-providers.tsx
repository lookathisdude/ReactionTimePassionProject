// app/providers/app-providers.tsx
"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../utils/apolloClient";
import ThemeProvider from "./theme-provider";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloProvider>
  );
}