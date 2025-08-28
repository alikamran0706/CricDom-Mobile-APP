import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql` || "http://localhost:1337/graphql", 
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
