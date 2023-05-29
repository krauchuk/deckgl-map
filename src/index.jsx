import React from 'react'
import { createRoot } from 'react-dom/client'

import { Map } from './components/Map'

const container = document.body.appendChild(document.createElement('div'))
createRoot(container).render(<Map />)
