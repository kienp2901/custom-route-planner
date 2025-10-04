'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import RouteForm from '@/components/RouteForm';
import RouteMap from '@/components/RouteMap';
import RouteInfo from '@/components/RouteInfo';
import { RouteRequest, RouteResponse } from '@/types';
import { routeApi } from '@/lib/api';

export default function Home() {
  const [routeData, setRouteData] = useState<RouteResponse | null>(null);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [mode, setMode] = useState<'driving' | 'walking'>('driving');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRouteSubmit = async (data: RouteRequest) => {
    setIsLoading(true);
    setError(null);
    setDestinations(data.destinations);
    setMode(data.mode);

    try {
      const response = await routeApi.calculateRoute(data);
      setRouteData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tính toán tuyến đường');
      setRouteData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Custom Route Planner</title>
        <meta name="description" content="Ứng dụng lập kế hoạch tuyến đường thông minh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Custom Route Planner
            </h1>
            <p className="text-lg text-gray-600">
              Lập kế hoạch tuyến đường thông minh với Google Maps
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-800 font-medium">Lỗi:</span>
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <RouteForm onSubmit={handleRouteSubmit} isLoading={isLoading} />

          {/* Map */}
          <RouteMap 
            routeData={routeData} 
            destinations={destinations} 
            isLoading={isLoading} 
          />

          {/* Route Info */}
          <RouteInfo 
            routeData={routeData} 
            destinations={destinations} 
            mode={mode} 
          />

          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm mt-12">
            <p>© 2024 Custom Route Planner. Được xây dựng với Next.js và Google Maps API.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
