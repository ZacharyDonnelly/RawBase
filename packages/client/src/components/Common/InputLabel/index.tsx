import cn from 'classnames'
import React, { FC, ReactNode } from 'react'

import styles from './styles.module.scss'

interface InputLabelProps {
  text?: ReactNode
  className?: string
  children?: ReactNode
}

const InputLabel: FC<InputLabelProps> = ({
  text = '',
  className = '',
  children = null
}) => (
  <div className={cn(styles.label, className)}>
    <div className={styles.textContainer}>
      <span>{text}</span>
    </div>
    {children}
  </div>
)

export default InputLabel
