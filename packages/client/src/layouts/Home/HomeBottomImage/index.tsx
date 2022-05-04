import React, { FC } from 'react'

import Forest from '../../../assets/images/forest_floor.png'

import styles from './styles.module.scss'

// TODO: Turn this into canvas component
const BottomImage: FC = () => (
  <img src={Forest} alt="forest" className={styles.bottom} />
)

export default BottomImage
