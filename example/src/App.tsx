import React, { useState } from 'react'

import Selector from '@gabrieljmj/react-selector'
import '@gabrieljmj/react-selector/dist/index.css'

const App = () => {
  const [color, setColor] = useState('');
  const options = [
    { value: 'red', label: 'Red' },
    { value: 'black', label: 'Black' },
    { value: 'green', label: 'Green' },
  ];

  return (
    <Selector
      label="Pick a color"
      options={options}
      value={color}
      onChange={setColor}
    />
  )
}

export default App
