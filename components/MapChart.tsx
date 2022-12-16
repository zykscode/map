'use client'

import { naijaMap, worldMap } from "#/lib/data/map"
import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart() {
  return (
    <ComposableMap>
      <Geographies geography={naijaMap}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} fill="#AF5533"
            stroke="#00FC00" />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}
