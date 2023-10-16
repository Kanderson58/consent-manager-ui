import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getAirgap } from './init';
import './ui.css';
import Checkbox from './checkbox';
let root: Element | undefined;

let initialized = false;

const setupConsentManagerUI = async (): Promise<void> => {
  const airgap = await getAirgap();
  const App: React.FC = () => {
    const trackingPurposes = airgap.getConsent().purposes;
    const trackingTypes = airgap.getPurposeTypes();
    const purposesData = Object.keys(trackingPurposes).map((key) => {
      return { ...trackingTypes[key], key: key };
    });
    const [acceptOrDeny, setAcceptOrDeny] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
      setShowBanner(initialized);
    }, [initialized]);

    const handleAcceptAll = (e: React.MouseEvent<HTMLButtonElement>) => {
      purposesData.forEach((purpose) =>
        airgap.setConsent(e.nativeEvent, { [purpose.key]: true }),
      );
      setAcceptOrDeny(!acceptOrDeny);
    };

    const handleDenyAll = (e: React.MouseEvent<HTMLButtonElement>) => {
      purposesData.forEach((purpose) =>
        airgap.setConsent(e.nativeEvent, { [purpose.key]: false }),
      );
      setAcceptOrDeny(!acceptOrDeny);
    };

    const finish = () => {
      initialized = false;
      setShowBanner(false);
    };

    return (
      <div className={`${!showBanner && 'hide'}`}>
        <header className="flex">
          <h2>Consent Manager</h2>
          <button className="consent-manager-button" onClick={finish}>
            X
          </button>
        </header>
        <h3>Please select all data tracking that you consent to:</h3>
        {purposesData.map((purpose) => (
          <Checkbox
            key={purpose.name}
            purpose={purpose}
            airgap={airgap}
            reset={acceptOrDeny}
          />
        ))}
        <footer className="flex">
          <div>
            <button className="footer-btn" onClick={handleAcceptAll}>
              Accept All
            </button>
            <button
              className="footer-btn deny-all"
              onClick={handleDenyAll}
            >
              Deny All
            </button>
          </div>
          <button className="footer-btn" onClick={finish}>
            Finish
          </button>
        </footer>
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
  initialized = true;
};

const showConsentManagerUI = async () => {
  const airgap = await getAirgap();
};

export const showConsentManager = async () => {
  if (!initialized) {
    await setupConsentManagerUI();
  }
  await showConsentManagerUI();
};
