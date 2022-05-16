import React, { FC } from 'react'

import { gql } from '@apollo/client'

import styles from './styles.module.scss'

import { useCreateNewUserMutation } from '@/generated/graphql'

export const CREATE_NEW_USER = gql`
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

const SignupCard: FC = () => {
  // TODO Append form data to mutation -> createNewUserMutation({ variables: { ...formData } })
  const [createNewUserMutation, { data, loading, error }] =
    useCreateNewUserMutation({
      variables: {
        email: '',
        firstName: '',
        lastName: '',
        handle: ''
      }
    })

  return (
    <div className={styles.signupCardContainer}>
      <h1>Card</h1>
    </div>
  )
}

export default SignupCard
