import cn from 'classnames'
import React, { ReactNode, FC, useEffect, useState } from 'react'

import styles from './styles.module.scss'

interface LoadingProps {
  timeout?: number
  children?: ReactNode
  show?: boolean
  spinner?: boolean
  className?: string
  placeholderClassName?: string
}

// TODO FIXME: This is a placeholder for a loading component.
const Loading: FC<LoadingProps> = React.memo(
  ({
    children = 'Loading...',
    timeout = 250,
    show = false,
    spinner = false,
    className = '',
    placeholderClassName = ''
  }) => {
    const [showState, setShowState] = useState(show)

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowState(true)
      }, timeout)

      return () => clearTimeout(timer)
    }, [timeout])

    return !showState ? (
      <div className={cn(placeholderClassName)} />
    ) : (
      <div
        className={cn(styles.fadeIn, className, {
          [styles.spinnerContainer]: spinner
        })}
      >
        {spinner ? <div>Loading...</div> : children}
      </div>
    )
  }
)

export default Loading
