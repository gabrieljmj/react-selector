# @gabrieljmj/react-selector

> React selector component

[![NPM](https://img.shields.io/npm/v/@gabrieljmj/react-selector.svg)](https://www.npmjs.com/package/@gabrieljmj/react-selector) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @gabrieljmj/react-selector
```

## Usage

```tsx
import { useState } from 'react'

import Selector from '@gabrieljmj/react-selector'
import '@gabrieljmj/react-selector/dist/index.css'

export default function MyApp() {
  const [color, setColor] = useState(-1);
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
```

## Props



## License

MIT © [gabrieljmj](https://github.com/gabrieljmj)
