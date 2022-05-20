import React, { FC } from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'

export interface HorizontalRuleProps {
  className?: string
}

const HorizontalRule: FC<HorizontalRuleProps> = React.memo(({ className }) => (
  <div className={cn(styles.hr, className)} />
))

export default HorizontalRule
