import React, { FC } from 'react'

import styles from './styles.module.scss'

import LoginCard from '@/components/auth/LoginCard'

const Login: FC = () => (
  <div className={styles.loginContainer}>
    <LoginCard />
  </div>
)

export default Login
