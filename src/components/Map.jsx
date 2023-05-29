import React, { useState } from 'react'
import DeckGL, { GeoJsonLayer, ArcLayer } from 'deck.gl'
import { StaticMap, MapContext, NavigationControl } from 'react-map-gl'

import rawAirports from '../../data/airports.geojson?raw'

import { Tooltip } from './Tooltip'

const WARSAW_POSITION = { lat: 52.171, long: 20.972 }

const AIRPORTS = JSON.parse(rawAirports)

const INITIAL_VIEW = {
  latitude: WARSAW_POSITION.lat,
  longitude: WARSAW_POSITION.long,
  zoom: 5,
  bearing: 0,
  pitch: 30,
}

const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10,
}

export const Map = () => {
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
      data: AIRPORTS,
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: data => 11 - data.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      pickable: true,
      autoHighlight: true,
      onHover: onObjectHover,
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIRPORTS,
      dataTransform: data => data.features.filter(f => f.properties.scalerank < 4),
      getSourcePosition: () => [WARSAW_POSITION.long, WARSAW_POSITION.lat],
      getTargetPosition: data => data.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1,
      pickable: true,
      autoHighlight: true,
      onHover: onObjectHover,
    }),
  ]

  return (
    <>
      {currentObject && <Tooltip {...currentObject} />}
      <DeckGL
        initialViewState={INITIAL_VIEW}
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
