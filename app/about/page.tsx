import Map from '#/components/Map/Map';
import nigeria from '#/data/state.json';
/* eslint-disable tailwindcss/no-custom-classname */
export default async function Home() {
  const handleOnEach = (
    feature: { properties: { name: any } },
    layer: { bindPopup: (arg0: any) => void },
  ) => {
    layer.bindPopup(feature.properties.name);
  };
  return (
    <main className="page full-page index-page">
      <Map
        width="100%"
        height="400px"
        center={[40.7128, -74.0059]}
        zoom={10}
        geoJson={nigeria}
        geoJsonStyle={{ color: 'blue' }}
      >
        {(
          ReactLeaflet: { TileLayer: JSX.IntrinsicAttributes },
          Leaflet: any,
        ) => (
          <ReactLeaflet.TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        )}
      </Map>
    </main>
  );
}
