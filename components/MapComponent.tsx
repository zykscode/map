/* eslint-disable unused-imports/no-unused-vars */
import { GeoJSON, Map, TileLayer } from 'leaflet';
import React, { useState } from 'react';

import geojson from '#/data/state.json';

const candidates = [
  { name: 'Candidate A', color: '#ff0000' },
  { name: 'Candidate B', color: '#0000ff' },
  { name: 'Candidate C', color: '#00ff00' },
];

function MapComponent() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  function handleCandidateChange(event: {
    target: { value: React.SetStateAction<null> };
  }) {
    setSelectedCandidate(event.target.value);
  }

  function getStateStyle(feature: { properties: { name: any } }) {
    const stateName = feature.properties.name;
    const winningCandidate = getWinningCandidate(stateName);
    const color = winningCandidate ? winningCandidate.color : '#cccccc';

    return {
      fillColor: color,
      fillOpacity: 0.7,
      color: '#ffffff',
      weight: 1,
      opacity: 1,
    };
  }

  return (
    <div>
      <select title="candidate" onChange={handleCandidateChange}>
        <option value="">Select a candidate</option>
        {candidates.map((candidate) => (
          <option key={candidate.name} value={candidate.name}>
            {candidate.name}
          </option>
        ))}
      </select>
      <Map center={[37.8, -96]} zoom={4}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data © OpenStreetMap contributors"
        />
        {geojson.features.map((feature) => (
          <GeoJSON
            key={feature.properties.name}
            data={feature}
            style={getStateStyle}
          />
        ))}
      </Map>
    </div>
  );
}

export default MapComponent;
