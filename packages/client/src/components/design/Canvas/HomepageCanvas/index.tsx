import cn from 'classnames'
import React, { FC, useCallback, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router'

import { CanvasProps } from '..'

import Cloud from '../../../../assets/svg/cloud.svg'
import SmileCloud from '../../../../assets/svg/smile_cloud.svg'
import Sun from '../../../../assets/svg/sun.svg'
import Begin from '../../../../assets/svg/begin.svg'

import styles from './styles.module.scss'

// TODO: Create option for user to choose between different backgrounds
// TODO: Create reusable component for this
const HomepageCanvas: FC<CanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<any>(null)
  const navigate = useNavigate()

  // clear canvas
  const clearCanvas = (ctx: any) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    canvasRef.current = null
  }

  // draws second background
  const animate = useCallback(() => {
    const context = canvasRef.current.getContext('2d')
    const image = new Image()

    clearCanvas(context)

    image.onload = () => {
      context.drawImage(image, 25, 15)
      context.drawImage(image, 135, 40)
      context.drawImage(image, 245, 15)
    }

    image.src = Cloud
  }, [])

  // draws transitioned background
  const _transition = useCallback(() => {
    canvasRef.current = canvasRef.current || document.getElementById('canvas')
    const context = canvasRef.current.getContext('2d')
    const image2 = new Image()
    const image3 = new Image()
    const image4 = new Image()

    clearCanvas(context)

    // draw images to appear after clearing canvas
    image2.onload = () => {
      context.drawImage(image2, 60, -10)
    }

    image2.src = Begin

    image3.onload = () => {
      context.drawImage(image3, 10, 5)
    }

    image3.src = SmileCloud

    image4.onload = () => {
      context.drawImage(image4, 210, -60)
    }

    image4.src = Sun
  }, [])

  useEffect(() => {
    const context = canvasRef.current.getContext('2d')
    const image = new Image()

    // draws initial background
    image.onload = () => {
      context.drawImage(image, 15, 10)
      context.drawImage(image, 115, 35)
      context.drawImage(image, 215, 10)
    }

    image.src = Cloud

    // TODO: create more dynamic background transitions
    setTimeout(() => requestAnimationFrame(animate), 1000)
    setTimeout(() => requestAnimationFrame(_transition), 3000)
  }, [animate, _transition])

  // If user clicks on ready to begin svg routes to signup page (for now)
  setTimeout(() => {
    document.addEventListener('click', (e) => {
      if (
        e.clientX >= 515 &&
        e.clientX <= 1218 &&
        e.clientY >= 141 &&
        e.clientY <= 242
      ) {
        navigate('/signup')
      }
    })
  }, 4000)

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className={cn(styles.canvas, className)}
    />
  )
}

export default HomepageCanvas
