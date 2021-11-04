import { ApolloClient, InMemoryCache } from "@apollo/client";
import {createUploadLink} from "apollo-upload-client"

const link = createUploadLink({
  uri: "http://localhost:8000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  credentials : "include"
});

export default client;