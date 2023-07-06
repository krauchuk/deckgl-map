import { create } from 'zustand'

import rawAirports from '../../data/airports.geojson?raw'
import { formatAirportData } from '../helpers/formatters'

export const AIRPORTS_GEO = JSON.parse(rawAirports)

const allAirports = AIRPORTS_GEO.features.map(formatAirportData).filter(data => !!data.code)
const WARSAW = allAirports.find(({ code }) => code === 'EPWA')

export const useAirportStore = create(set => ({
  allAirports,
  selectedAirport: WARSAW,
  selectAirport: airport => set(() => ({ selectedAirport: airport })),
}))
