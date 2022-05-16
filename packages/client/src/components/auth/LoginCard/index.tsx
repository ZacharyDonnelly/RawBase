import { gql } from '@apollo/client'
import React, { FC } from 'react'

import { useGetCurrentUserQuery } from '../../../generated/graphql'

import styles from './styles.module.scss'

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      handle
      createdAt
    }
  }
`

const LoginCard: FC = () => {
  const { loading, error, data } = useGetCurrentUserQuery()

  return (
    <>
      {loading ? (
        <div> Loading... </div>
      ) : (
        <div className={styles.loginCardContainer}>
          <h1>Card {data?.currentUser?.handle}</h1>
        </div>
      )}
    </>
  )
}

export default LoginCard
