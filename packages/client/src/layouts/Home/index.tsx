import React, { FC } from 'react'

import BottomImage from './HomeBottomImage'

import styles from './styles.module.scss'

import { HomepageCanvas } from '@/components/design/Canvas'

const Home: FC = () => (
  <div className={styles.container}>
    <HomepageCanvas />
    <BottomImage />
  </div>
)

export default Home
