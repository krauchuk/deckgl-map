import React, { useState } from 'react'

import rawAirports from '../../data/airports.geojson?raw'
import { formatAirportData } from '../helpers/formatters'

export const AIRPORTS_GEO = JSON.parse(rawAirports)

const allAirports = AIRPORTS_GEO.features.map(formatAirportData).filter(data => !!data.code)
const WARSAW = allAirports.find(({ code }) => code === 'EPWA')

export const Context = React.createContext()

const Provider = props => {
  const [selectedAirport, setSelectedAirport] = useState(WARSAW)

  return (
    <Context.Provider
      value={{
        allAirports,
        selectedAirport,
        selectAirport: airport => setSelectedAirport(airport),
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default Provider
