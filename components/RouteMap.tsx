'use client';

import React from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';
import { RouteResponse } from '@/types';

interface RouteMapProps {
  routeData: RouteResponse | null;
  destinations: string[];
  isLoading: boolean;
}

const RouteMap: React.FC<RouteMapProps> = ({ routeData, destinations, isLoading }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const defaultCenter = {
    lat: 21.0285, // Hanoi coordinates
    lng: 105.8542
  };

  const libraries: ("geometry" | "drawing" | "places" | "visualization")[] = ["geometry"];

  // Decode polyline for rendering
  const decodePolyline = (encoded: string) => {
    const poly = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      poly.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
    return poly;
  };

  const polylineOptions = {
    strokeColor: '#3b82f6',
    strokeOpacity: 0.8,
    strokeWeight: 4,
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bản đồ tuyến đường</h2>
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải bản đồ...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!routeData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bản đồ tuyến đường</h2>
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-gray-600">Nhập các điểm đến và nhấn "Tạo bản đồ" để xem tuyến đường</p>
          </div>
        </div>
      </div>
    );
  }

  const polylinePath = decodePolyline(routeData.map_polyline);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Bản đồ tuyến đường</h2>
      
      <div className="rounded-lg overflow-hidden">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={polylinePath.length > 0 ? polylinePath[0] : defaultCenter}
            zoom={12}
            options={{
              streetViewControl: false,
              mapTypeControl: true,
              fullscreenControl: true,
            }}
          >
            {/* Route polyline */}
            <Polyline
              path={polylinePath}
              options={polylineOptions}
            />
            
            {/* Markers for destinations */}
            {destinations.map((destination, index) => (
              <Marker
                key={index}
                position={polylinePath[index] || defaultCenter}
                label={{
                  text: (index + 1).toString(),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
                title={destination}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default RouteMap;
