import React from 'react'

export const Tooltip = ({ x, y, text }) => (
  <span
    style={{
      position: 'absolute',
      left: x + 5,
      top: y + 5,
      padding: 10,
      backgroundColor: '#fff',
      zIndex: 1,
    }}
  >
    {text}
  </span>
)
