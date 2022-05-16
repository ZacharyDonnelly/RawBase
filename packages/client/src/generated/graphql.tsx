/* eslint-disable no-use-before-define */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<User>
}

export type MutationCreateUserArgs = {
  email?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  handle?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  currentUser?: Maybe<User>
  user: User
  users: Array<User>
}

export type QueryUserArgs = {
  id?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  firstName: Scalars['String']
  handle: Scalars['String']
  id?: Maybe<Scalars['ID']>
  lastName: Scalars['String']
}

export type CreateNewUserMutationVariables = Exact<{
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  handle: Scalars['String']
}>

export type CreateNewUserMutation = {
  __typename?: 'Mutation'
  createUser?: {
    __typename?: 'User'
    email: string
    handle: string
    firstName: string
    lastName: string
  } | null
}

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type GetCurrentUserQuery = {
  __typename?: 'Query'
  currentUser?: {
    __typename?: 'User'
    id?: string | null
    email: string
    handle: string
  } | null
}

export const CreateNewUserDocument = gql`
  mutation CreateNewUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $handle: String!
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      handle: $handle
    ) {
      email
      handle
      firstName
      lastName
    }
  }
`
export type CreateNewUserMutationFn = Apollo.MutationFunction<
  CreateNewUserMutation,
  CreateNewUserMutationVariables
>

/**
 * __useCreateNewUserMutation__
 *
 * To run a mutation, you first call `useCreateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewUserMutation, { data, loading, error }] = useCreateNewUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      handle: // value for 'handle'
 *   },
 * });
 */
export function useCreateNewUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewUserMutation,
    CreateNewUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<
    CreateNewUserMutation,
    CreateNewUserMutationVariables
  >(CreateNewUserDocument, options)
}
export type CreateNewUserMutationHookResult = ReturnType<
  typeof useCreateNewUserMutation
>
export type CreateNewUserMutationResult =
  Apollo.MutationResult<CreateNewUserMutation>
export type CreateNewUserMutationOptions = Apollo.BaseMutationOptions<
  CreateNewUserMutation,
  CreateNewUserMutationVariables
>
export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      handle
    }
  }
`

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  )
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  )
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>
