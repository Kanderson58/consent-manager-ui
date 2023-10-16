import React, { useEffect, useState } from 'react';
import './ui.css';
import type { AirgapAPI } from 'src/@types/airgap.js';
import { Checkbox } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

function CheckboxContainer({ purpose, airgap, reset }: Props) {
  const [checked, setChecked] = useState(
    airgap.getConsent().purposes[purpose.key],
  );
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setChecked(airgap.getConsent().purposes[purpose.key]);
  }, [reset]);

  return (
    <div className="flex checkbox">
      <Checkbox
        checked={checked}
        id={purpose.key}
        onChange={(e) => {
          airgap.setConsent(e.nativeEvent, { [purpose.key]: !checked });
          setChecked(!checked);
        }}
        sx={{padding: 0, '&.Mui-checked': {
          color: "#0065ff",
        }}}
      />
      <div className='purpose'>
        <h4 className='flex purpose-name'>{purpose.name}{purpose.description && <InfoOutlinedIcon onClick={() => setShowInfo(!showInfo)} sx={{color: "#bdc2c7", paddingLeft: 1, marginTop: "-2px"}} />}</h4>
        {showInfo && <p className='description'>{purpose.description}</p>}
      </div>
    </div>
  );
}

export default CheckboxContainer;
