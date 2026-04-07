//This file is responsible for creating the Apollo Client instance.
//It exports the client instance and the type definitions for the GraphQL schema.
// Veraion 1.1.2

"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8080/graphql" }),
  cache: new InMemoryCache(),
});

export default client;