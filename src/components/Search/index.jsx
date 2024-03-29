import React from 'react'

import { truncateCoordinate } from '../../helpers/formatters'
import { useAirportStore } from '../../store/airport'
import styles from './styles'

export const Search = () => {
  const { allAirports, selectedAirport, selectAirport } = useAirportStore()

  const onChange = ({ target }) => {
    const newValue = allAirports.find(data => data.code === target.value)
    selectAirport(newValue)
  }

  return (
    <div style={styles.containerStyle}>
      <label htmlFor="airports">Choose a airport:</label>
      <select name="airports" id="airports" value={selectedAirport.code} onChange={onChange}>
        {allAirports.map(({ name, code }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      <div style={styles.infoStyle}>
        <strong>Current airport info</strong>
        <div>Name | {selectedAirport.name}</div>
        <div>
          Coordinates | {truncateCoordinate(selectedAirport.coordinates.long)} /{' '}
          {truncateCoordinate(selectedAirport.coordinates.lat)}
        </div>
        {selectedAirport.link && (
          <div>
            About |{' '}
            <a href={selectedAirport.link} target="_blank">
              Wikipedia
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
