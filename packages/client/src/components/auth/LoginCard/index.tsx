import React, { FC } from 'react'

import { useGetCurrentUserQuery } from '../../../generated/graphql'

import styles from './styles.module.scss'

const LoginCard: FC = () => {
  const { loading, error, data } = useGetCurrentUserQuery()

  return (
    <>
      {loading ? (
        <div> Loading... </div>
      ) : (
        <div className={styles.loginCardContainer}>
          <h1>Card {data?.currentUser.handle}</h1>
        </div>
      )}
    </>
  )
}

export default LoginCard
