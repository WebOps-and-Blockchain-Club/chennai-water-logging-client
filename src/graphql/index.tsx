import { ApolloClient, InMemoryCache } from "@apollo/client";
import {createUploadLink} from "apollo-upload-client"
import dotenv from 'dotenv';

dotenv.config();
const link = createUploadLink({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  credentials: "include",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  credentials : "include"
});

export default client;