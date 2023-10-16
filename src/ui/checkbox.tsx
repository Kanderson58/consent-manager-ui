import React, { useEffect, useState } from 'react';
import './ui.css';
import type { AirgapAPI } from 'src/@types/airgap.js';

type Props = {
  purpose: {
    name: string;
    description: string;
    defaultConsent: string | boolean;
    key: string;
  };
  airgap: AirgapAPI;
  reset: boolean;
};

function Checkbox({ purpose, airgap, reset }: Props) {
  const [checked, setChecked] = useState(
    airgap.getConsent().purposes[purpose.key],
  );

  useEffect(() => {
    setChecked(airgap.getConsent().purposes[purpose.key]);
  }, [reset]);

  return (
    <div className="flex checkbox">
      <input
        type="checkbox"
        checked={checked}
        id={purpose.key}
        onChange={(e) => {
          airgap.setConsent(e.nativeEvent, { [purpose.key]: !checked });
          setChecked(!checked);
        }}
      />
      <div className='purpose'>
        <h4 className='purpose-name'>{purpose.name}</h4>
        <p>{purpose.description}</p>
      </div>
    </div>
  );
}

export default Checkbox;
