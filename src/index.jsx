import React from 'react'
import { createRoot } from 'react-dom/client'

import { Map } from './components/Map'
import Provider from './store/Provider'

const container = document.body.appendChild(document.createElement('div'))
createRoot(container).render(
  <Provider>
    <Map />
  </Provider>,
)
