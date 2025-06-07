import React, { useState } from 'react';
import Banner, { usePrefilledCustomerData } from './components/Banner';
import './styles/index.css';

export default function App() {
  const { prefilledData, loadCustomerData, clearPrefilledData } = usePrefilledCustomerData();
  const [isPrefillChecked, setIsPrefillChecked] = useState(false);

  const handlePrefillToggle = (checked) => {
    setIsPrefillChecked(checked);
    if (checked) {
      loadCustomerData();
    } else {
      clearPrefilledData();
    }
  };

  const handleClearData = () => {
    setIsPrefillChecked(false);
    clearPrefilledData();
  };

  return (
    <div className="app">
      <div className="app-controls">
        <div className="control-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={isPrefillChecked}
              onChange={(e) => handlePrefillToggle(e.target.checked)}
            />
            Prefill customer
          </label>
        </div>
        <button className="btn-secondary" onClick={handleClearData}>
          Clear data
        </button>
      </div>
      <Banner prefilledData={prefilledData} />
    </div>
  );
}
