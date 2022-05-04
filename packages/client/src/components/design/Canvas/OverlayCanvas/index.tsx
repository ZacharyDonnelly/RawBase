import React, { FC, useRef } from 'react'

import { CanvasProps } from '..'

const OverlayCanvas: FC<CanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef(null)

  return <canvas id="canvas" ref={canvasRef} />
}

export default OverlayCanvas
