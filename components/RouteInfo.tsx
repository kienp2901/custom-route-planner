'use client';

import React from 'react';
import { RouteResponse } from '@/types';

interface RouteInfoProps {
  routeData: RouteResponse | null;
  destinations: string[];
  mode: 'driving' | 'walking';
}

const RouteInfo: React.FC<RouteInfoProps> = ({ routeData, destinations, mode }) => {
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours} giờ ${mins} phút`;
    }
    return `${mins} phút`;
  };

  const formatDistance = (km: number): string => {
    return `${km.toFixed(1)} km`;
  };

  const generateGoogleMapsUrl = (): string => {
    const encodedDestinations = destinations.map(dest => encodeURIComponent(dest));
    return `https://www.google.com/maps/dir/${encodedDestinations.join('/')}`;
  };

  if (!routeData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin tuyến đường</h2>
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600">Thông tin tuyến đường sẽ hiển thị ở đây</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin tuyến đường</h2>
      
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="font-semibold text-blue-800">Tổng khoảng cách</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{formatDistance(routeData.total_distance_km)}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold text-green-800">Tổng thời gian</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{formatDuration(routeData.total_duration_min)}</p>
        </div>
      </div>

      {/* Route Legs */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Chi tiết từng chặng:</h3>
        <div className="space-y-3">
          {routeData.routes.map((leg, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800">
                    {leg.from} → {leg.to}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-gray-600">Khoảng cách:</span>
                  <span className="font-medium">{formatDistance(leg.distance_km)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">{formatDuration(leg.duration_min)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Maps Button */}
      <div className="border-t pt-4">
        <a
          href={generateGoogleMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Mở Google Maps để dẫn đường
        </a>
      </div>
    </div>
  );
};

export default RouteInfo;
