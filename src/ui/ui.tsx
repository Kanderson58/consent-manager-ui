import React from 'react';
import ReactDOM from 'react-dom';
import { config } from './config';
import { getAirgap } from './init';
import './ui.css';
import Checkbox from './checkbox';

let initialized = false;
// UI root node in DOM
let root: Element | undefined;

const setupConsentManagerUI = async (): Promise<void> => {
  // console.log('Initializing Consent Manager UI...');

  const airgap = await getAirgap();
  // console.log('Purpose types config:', airgap.getPurposeTypes());
  // console.log('Consent Manager UI config:', config);

  // TODO: Setup your consent manager UI DOM here
  const App: React.FC = () => {
    const trackingPurposes = airgap.getConsent().purposes;
    const trackingTypes = airgap.getPurposeTypes();
    const purposesData = Object.keys(trackingPurposes).map((key) => {
      return {...trackingTypes[key], key: key};
    });
    console.log(purposesData);

    return (
      <div>
        <header className='flex'>
          <h2>Consent Manager</h2>
          <button>X</button>
        </header>
        <h3>Please select all data tracking that you consent to:</h3>
        {purposesData.map((purpose) => (
          <Checkbox key={purpose.name} purpose={purpose} airgap={airgap} />
        ))}
        <footer className='flex'>
          <div>
            <button className='footer-btn'>Accept All</button>
            <button className='footer-btn' style={{marginLeft:"5px"}}>Deny All</button>
          </div>
          <button className='footer-btn'>Finish</button>
        </footer>
        {/* <h3>
          Consent Manager UI config
          </h3>
          <pre>
            {JSON.stringify(config, null, 2)}
          </pre> */}
      </div>
    );
  };

  root = document.createElement('div');
  root.className = 'ConsentManager';
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root,
  );
  document.body.firstElementChild?.before(root);
  // END: TODO: Setup your consent manager UI DOM here

  initialized = true;
  // console.log('Consent Manager UI initialized');
};

const showConsentManagerUI = async () => {
  const airgap = await getAirgap();
  // console.log('Current consent:', airgap.getConsent());

  // TODO: Display your consent manager UI here
};

export const showConsentManager = async () => {
  // console.log('transcend.showConsentManager() called');
  if (!initialized) {
    await setupConsentManagerUI();
  }
  await showConsentManagerUI();
};
