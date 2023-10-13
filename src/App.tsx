import React from 'react';
import './App.css';
import type { TranscendAPI } from './@types/airgap.js';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <button
          className = "consent-manager-button"
          onClick = {(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            window?.transcend?.ready?.((transcend: TranscendAPI) =>
              transcend.showConsentManager()
            )
          }}
        >
          Data Collection Preferences
        </button>
      </header>
    </div>
  );
};

export default App;
