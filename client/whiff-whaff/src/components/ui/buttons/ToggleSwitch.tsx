import React, { useState } from 'react';
import {Switch} from '@material-tailwind/react';

const ToggleSwitch: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center ">
    <Switch checked={checked} onChange={handleChange} className={!checked ? 'bg-black' : 'bg-GreenishYellow'} color='yellow'>
    
    </Switch>
  </div>
  );
};

export default ToggleSwitch;