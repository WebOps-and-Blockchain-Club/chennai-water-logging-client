import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type FloodData = {
  depth: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  location: Scalars['String'];
};

export type GetFloodDatasOutput = {
  count: Scalars['Float'];
  datas: Array<FloodData>;
};

export type Mutation = {
  addData: Scalars['String'];
};


export type MutationAddDataArgs = {
  depth: Scalars['String'];
  image: Scalars['Upload'];
  location: Scalars['String'];
};

export type Query = {
  getDataByID: FloodData;
  getDatas: GetFloodDatasOutput;
};


export type QueryGetDataByIdArgs = {
  ID: Scalars['String'];
};


export type QueryGetDatasArgs = {
  Password: Scalars['String'];
  limit?: Maybe<Scalars['Float']>;
  skip?: Maybe<Scalars['Float']>;
};

export type GetDataByIdQueryVariables = Exact<{
  ID: Scalars['String'];
}>;


export type GetDataByIdQuery = { getDataByID: { depth: string, location: string, image: string } };

export type GetDatasQueryVariables = Exact<{
  Password: Scalars['String'];
}>;


export type GetDatasQuery = { getDatas: { count: number, datas: Array<{ location: string, image: string, depth: string }> } };

export type AddDataMutationVariables = Exact<{
  location: Scalars['String'];
  depth: Scalars['String'];
  image: Scalars['Upload'];
}>;


export type AddDataMutation = { addData: string };


export const GetDataByIdDocument = gql`
    query getDataByID($ID: String!) {
  getDataByID(ID: $ID) {
    depth
    location
    image
  }
}
    `;

/**
 * __useGetDataByIdQuery__
 *
 * To run a query within a React component, call `useGetDataByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataByIdQuery({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function useGetDataByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetDataByIdQuery, GetDataByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetDataByIdQuery, GetDataByIdQueryVariables>(GetDataByIdDocument, options);
      }
export function useGetDataByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDataByIdQuery, GetDataByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetDataByIdQuery, GetDataByIdQueryVariables>(GetDataByIdDocument, options);
        }
export type GetDataByIdQueryHookResult = ReturnType<typeof useGetDataByIdQuery>;
export type GetDataByIdLazyQueryHookResult = ReturnType<typeof useGetDataByIdLazyQuery>;
export type GetDataByIdQueryResult = ApolloReactCommon.QueryResult<GetDataByIdQuery, GetDataByIdQueryVariables>;
export function refetchGetDataByIdQuery(variables?: GetDataByIdQueryVariables) {
      return { query: GetDataByIdDocument, variables: variables }
    }
export const GetDatasDocument = gql`
    query getDatas($Password: String!) {
  getDatas(Password: $Password) {
    count
    datas {
      location
      image
      depth
    }
  }
}
    `;

/**
 * __useGetDatasQuery__
 *
 * To run a query within a React component, call `useGetDatasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDatasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDatasQuery({
 *   variables: {
 *      Password: // value for 'Password'
 *   },
 * });
 */
export function useGetDatasQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetDatasQuery, GetDatasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetDatasQuery, GetDatasQueryVariables>(GetDatasDocument, options);
      }
export function useGetDatasLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDatasQuery, GetDatasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetDatasQuery, GetDatasQueryVariables>(GetDatasDocument, options);
        }
export type GetDatasQueryHookResult = ReturnType<typeof useGetDatasQuery>;
export type GetDatasLazyQueryHookResult = ReturnType<typeof useGetDatasLazyQuery>;
export type GetDatasQueryResult = ApolloReactCommon.QueryResult<GetDatasQuery, GetDatasQueryVariables>;
export function refetchGetDatasQuery(variables?: GetDatasQueryVariables) {
      return { query: GetDatasDocument, variables: variables }
    }
export const AddDataDocument = gql`
    mutation addData($location: String!, $depth: String!, $image: Upload!) {
  addData(location: $location, depth: $depth, image: $image)
}
    `;
export type AddDataMutationFn = ApolloReactCommon.MutationFunction<AddDataMutation, AddDataMutationVariables>;

/**
 * __useAddDataMutation__
 *
 * To run a mutation, you first call `useAddDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDataMutation, { data, loading, error }] = useAddDataMutation({
 *   variables: {
 *      location: // value for 'location'
 *      depth: // value for 'depth'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useAddDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddDataMutation, AddDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddDataMutation, AddDataMutationVariables>(AddDataDocument, options);
      }
export type AddDataMutationHookResult = ReturnType<typeof useAddDataMutation>;
export type AddDataMutationResult = ApolloReactCommon.MutationResult<AddDataMutation>;
export type AddDataMutationOptions = ApolloReactCommon.BaseMutationOptions<AddDataMutation, AddDataMutationVariables>;