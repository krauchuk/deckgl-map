import React, { useState } from 'react'
import DeckGL, { GeoJsonLayer, ArcLayer } from 'deck.gl'
import { StaticMap, MapContext, NavigationControl } from 'react-map-gl'

import { Tooltip } from './Tooltip'
import { Search } from './Search'
import { useAirportStore, AIRPORTS_GEO } from '../store/airport'
import { formatAirportData } from '../helpers/formatters'

const INITIAL_VIEW = { zoom: 5, bearing: 0, pitch: 30 }
const NAV_CONTROL_STYLE = { position: 'absolute', top: 10, left: 10 }

export const Map = () => {
  const { selectedAirport, selectAirport } = useAirportStore()
  const [currentObject, setCurrentObject] = useState(null)

  const onObjectHover = info => {
    if (info.object) {
      const text = `${info.layer.id === 'airports' ? 'Airport:' : 'Flight: Warsaw -'} ${info.object.properties.name}`
      setCurrentObject({ x: info.x, y: info.y, text })
    }
  }

  const layers = [
    new GeoJsonLayer({
      id: 'airports',
      data: AIRPORTS_GEO,
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: data => 11 - data.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      pickable: true,
      autoHighlight: true,
      onHover: onObjectHover,
      onClick: data => selectAirport(formatAirportData(data.object))
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIRPORTS_GEO,
      dataTransform: data => data.features.filter(f => f.properties.scalerank < 4),
      getSourcePosition: () => [selectedAirport.coordinates.long, selectedAirport.coordinates.lat],
      getTargetPosition: data => data.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1,
      pickable: true,
      autoHighlight: true,
      onHover: onObjectHover,
      updateTriggers: {
        getSourcePosition: [selectedAirport],
      },
    }),
  ]

  return (
    <>
      <Search />
      {currentObject && <Tooltip {...currentObject} />}
      <DeckGL
        initialViewState={{
          ...INITIAL_VIEW,
          latitude: selectedAirport.coordinates.lat,
          longitude: selectedAirport.coordinates.long,
        }}
        ContextProvider={MapContext.Provider}
        layers={layers}
        onHover={info => {
          if (!info.layer) {
            setCurrentObject(null)
          }
        }}
        controller
      >
        <StaticMap mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} />
        <NavigationControl style={NAV_CONTROL_STYLE} />
      </DeckGL>
    </>
  )
}
