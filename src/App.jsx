import React from 'react';
import Banner, { usePrefilledCustomerData } from './components/Banner';
import './styles/index.css';

export default function App() {
  const { prefilledData, loadCustomerData, clearPrefilledData } = usePrefilledCustomerData();

  return (
    <div className="app">
      <div className="app-controls">
        <button className="btn-primary" onClick={loadCustomerData}>
          Prefill customer
        </button>
        <button className="btn-secondary" onClick={clearPrefilledData}>
          Clear data
        </button>
      </div>
      <Banner prefilledData={prefilledData} />
    </div>
  );
}
