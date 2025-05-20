import React from 'react';
import Banner, { usePrefilledCustomerData } from './components/Banner';

export default function App() {
  const { prefilledData, loadCustomerData, clearPrefilledData } = usePrefilledCustomerData();

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="mb-4 space-x-2">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white"
          onClick={loadCustomerData}
        >
          Prefill customer
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-300"
          onClick={clearPrefilledData}
        >
          Clear data
        </button>
      </div>
      <Banner prefilledData={prefilledData} />
    </div>
  );
}
