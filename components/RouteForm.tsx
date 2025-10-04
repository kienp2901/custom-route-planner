'use client';

import React, { useState } from 'react';
import { RouteRequest } from '@/types';

interface RouteFormProps {
  onSubmit: (data: RouteRequest) => void;
  isLoading: boolean;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit, isLoading }) => {
  const [destinations, setDestinations] = useState<string[]>(['', '']);
  const [mode, setMode] = useState<'driving' | 'walking'>('driving');

  const addDestination = () => {
    setDestinations([...destinations, '']);
  };

  const removeDestination = (index: number) => {
    if (destinations.length > 2) {
      setDestinations(destinations.filter((_, i) => i !== index));
    }
  };

  const updateDestination = (index: number, value: string) => {
    const newDestinations = [...destinations];
    newDestinations[index] = value;
    setDestinations(newDestinations);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validDestinations = destinations.filter(dest => dest.trim() !== '');
    
    if (validDestinations.length < 2) {
      alert('Vui lòng nhập ít nhất 2 điểm đến');
      return;
    }

    onSubmit({
      destinations: validDestinations,
      mode
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Lập kế hoạch tuyến đường</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Destinations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Các điểm đến:
          </label>
          {destinations.map((destination, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-600 w-8">
                {index + 1}.
              </span>
              <input
                type="text"
                value={destination}
                onChange={(e) => updateDestination(index, e.target.value)}
                placeholder={`Điểm ${index + 1} (VD: 25T2 Nguyễn Thị Thập)`}
                className="input-field flex-1"
                disabled={isLoading}
              />
              {destinations.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeDestination(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={addDestination}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
            disabled={isLoading}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Thêm điểm đến
          </button>
        </div>

        {/* Transportation Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phương tiện di chuyển:
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as 'driving' | 'walking')}
            className="input-field"
            disabled={isLoading}
          >
            <option value="driving">Ô tô</option>
            <option value="walking">Đi bộ</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Đang tính toán...
            </div>
          ) : (
            'Tạo bản đồ'
          )}
        </button>
      </form>
    </div>
  );
};

export default RouteForm;
