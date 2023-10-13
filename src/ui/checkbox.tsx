import React, { ChangeEvent, useEffect, useState } from 'react';
import './ui.css';

type Props = {
  purpose: {
    name: string;
    description: string;
    defaultConsent: string | boolean;
    key: string;
  };
  airgap: any;
};

function Checkbox({ purpose, airgap }: Props) {
  const [checked, setChecked] = useState(true);

  const checkbox = document.getElementById(purpose.key);
  checkbox?.addEventListener('click', (interaction) => {
    airgap.setConsent(interaction, purpose.key)
  });

  console.log(airgap.getConsent().purposes)
  
  return (
    <div className="flex" style={{ alignItems: 'flex-start' }}>
      <input type="checkbox" checked={checked} id={purpose.key} onChange={() => {
        setChecked(!checked)
        }} />
      <div style={{ paddingLeft: '10px' }}>
        <h4 style={{ margin: 0 }}>{purpose.name}</h4>
        <p>{purpose.description}</p>
      </div>
    </div>
  );
}

export default Checkbox;
