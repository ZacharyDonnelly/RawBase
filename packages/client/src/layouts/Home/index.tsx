import React, { FC } from 'react'

import { HomepageCanvas } from '../../components/design/Canvas'

import BottomImage from './HomeBottomImage'

import styles from './styles.module.scss'

const Home: FC = () => (
  <div className={styles.container}>
    <HomepageCanvas />
    <BottomImage />
  </div>
)

export default Home
