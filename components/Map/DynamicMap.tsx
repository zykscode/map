/* eslint-disable no-underscore-dangle */
import 'leaflet/dist/leaflet.css';

import Leaflet from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import * as ReactLeaflet from 'react-leaflet';

import styles from './Map.module.scss';

const { MapContainer, GeoJSON } = ReactLeaflet;

interface MapProps {
  children: (
    ReactLeaflet: any,
    Leaflet: any,
    mapRef: React.Ref<Leaflet.Map>
  ) => React.ReactNode;
  className?: string;
  width?: string;
  height?: string;
  geoJson: any;
  geoJsonStyle: any;
  handleOnEach: any;
  preferCanvas: boolean;
}

const Map: React.FC<MapProps> = ({
  children,
  className,
  geoJson,
  geoJsonStyle,
  handleOnEach,
  preferCanvas,
  ...rest
}) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  const mapRef = useRef<Leaflet.Map>(null);
  const geoJsonLayerRef = useRef<Leaflet.GeoJSON>();
  const [center, setCenter] = useState<Leaflet.LatLng>(Leaflet.latLng(0, 0));

  useEffect(() => {
    (async function init() {
      delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  useEffect(() => {
    if (mapRef.current && geoJson) {
      geoJsonLayerRef.current = Leaflet.geoJSON(geoJson).addTo(mapRef.current);
      setCenter(geoJsonLayerRef.current.getBounds().getCenter());
    }
  }, [geoJson, mapRef]);
  return (
    <MapContainer
      center={center}
      preferCanvas={preferCanvas}
      ref={mapRef}
      className={mapClassName}
      {...rest}
    >
      {children(ReactLeaflet, Leaflet, mapRef)}
      {geoJson && (
        <GeoJSON
          onEachFeature={handleOnEach}
          style={geoJsonStyle}
          data={geoJson}
        />
      )}
    </MapContainer>
  );
};

export default Map;
