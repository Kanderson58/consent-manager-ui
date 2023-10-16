import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getAirgap } from './init';
import './ui.css';
import CheckboxContainer from './checkbox';
import svg from './privacy-choices-icon.svg';
import { Button } from '@mui/material';

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
      // allows rerender on open/close
      setShowBanner(initialized);
    }, [initialized]);

    const handleAcceptAll = (e: React.MouseEvent<HTMLButtonElement>) => {
      purposesData.forEach((purpose) =>
        airgap.setConsent(e.nativeEvent, { [purpose.key]: true }),
      );
      // allows rerender on accept or deny all
      setAcceptOrDeny(!acceptOrDeny);
    };

    const handleDenyAll = (e: React.MouseEvent<HTMLButtonElement>) => {
      purposesData.forEach((purpose) =>
        airgap.setConsent(e.nativeEvent, { [purpose.key]: false }),
      );
      // allows rerender on accept or deny all
      setAcceptOrDeny(!acceptOrDeny);
    };

    const finish = () => {
      initialized = false;
      setShowBanner(false);
    };

    return (
      <div className={`${!showBanner && 'hide'}`}>
        <header className="flex">
          <button className="consent-manager-button close" onClick={finish}>
            X
          </button>
        </header>
        <span className="flex title">
          <img src={svg} alt="Data control icon" />
          <h2>You control your data.</h2>
        </span>
        <p>Example Company products are designed to protect your privacy.</p>
        <p>
          We won't collect data about you for advertising, analytics, or other
          non-essential things unless you give us permission to.
        </p>
        <p>
          You can change your preferences at any time from this window or from
          our Privacy Center.
        </p>
        {purposesData.map((purpose) => (
          <CheckboxContainer
            key={purpose.name}
            purpose={purpose}
            airgap={airgap}
            reset={acceptOrDeny}
          />
        ))}
        <p>We also collect information for the following purposes:</p>
        <ul>
          <li>
            <span className="bold">Government-required data collection:</span>{' '}
            We share relevant information with [government agency here] as
            pursuant to [jurisdiction] law.
          </li>
          <li>
            <span className="bold">Cursor Tracking:</span> We share your cursor
            movement with an NGO dedicated to curing Parkinson's Disease.
          </li>
        </ul>
        <footer className="flex">
          <div>
            <Button variant="outlined" onClick={handleAcceptAll}>
              Accept All
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: 2 }}
              onClick={handleDenyAll}
            >
              Deny All
            </Button>
          </div>
          <Button
            variant="contained"
            onClick={finish}
            sx={{ backgroundColor: '#0065ff' }}
          >
            Save Preferences
          </Button>
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
