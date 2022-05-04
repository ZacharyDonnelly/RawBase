import React, { FC } from 'react'

import styles from './styles.module.scss'

interface InputProps {
  type?: string
}

const Input: FC<InputProps> = ({ type = 'text' }) => (
  <div className={styles.input}>
    <input type={type} />
  </div>
)

export default Input
