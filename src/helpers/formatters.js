export const formatAirportData = ({ properties, geometry }) => ({
  name: properties.name,
  coordinates: {
    long: geometry.coordinates[0],
    lat: geometry.coordinates[1],
  },
  link: properties.wikipedia,
  code: properties.gps_code,
})

export const truncateCoordinate = coordinate => Math.trunc(coordinate * 100) / 100
