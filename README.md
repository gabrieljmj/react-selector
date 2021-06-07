# [@gabrieljmj/react-selector](https://www.npmjs.com/package/@gabrieljmj/react-selector)

Custom select input for React with search field.

[![NPM](https://img.shields.io/npm/v/@gabrieljmj/react-selector.svg?style=flat-square)](https://www.npmjs.com/package/@gabrieljmj/react-selector) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com) ![GitHub](https://img.shields.io/github/license/gabrieljmj/react-selector?style=flat-square)

## Install

```bash
npm install --save @gabrieljmj/react-selector
```

## Preview

[Click here](https://codesandbox.io/s/billowing-rain-vp4gw?file=/src/App.js:99-141) to see a preview.

## Usage

```jsx
import { useState } from 'react'
import Selector from '@gabrieljmj/react-selector'
import '@gabrieljmj/react-selector/dist/index.css' // Include styles

export default function MyApp() {
  const [color, setColor] = useState(undefined);
  const options = [
    { value: 'red', label: 'Red' },
    { value: 'black', label: 'Black' },
    { value: 'green', label: 'Green' },
  ];

  const handleSubmit = (e) => {
      // ...
  };

  return (
    <form onSubmit={hanldeSubmit}>
        <Selector
          label="Pick a color"
          options={options}
          value={color}
          onChange={setColor}
          htmlInputProps={{
            name: 'color',
          }}
        />

        <button type="submit">Save</button>
    </form>
  );
}
```

## Props

| Prop | Default value | Required | Type | Description |
| ---- | ------------- | -------- | ---- | ----------- |
| ```containerProps``` | _empty object_ | ```false``` | ```React.HTMLAttributes<HTMLDivElement>``` | Container element extra props. |
| ```searchInputProps``` | _empty object_ | ```false``` | ```React.HTMLAttributes<HTMLInputElement>``` | Search input element extra properties. |
| ```className``` | _undefined_ | ```false``` | ```string``` | Class name for selector header. |
| ```disabled``` | ```false``` | ```false``` | ```boolean``` | Disable selector |
| ```fullWidth``` | ```false``` | ```false``` | ```boolean``` | Adds CSS property to ocupy 100% of parent element width |
| ```htmlInputProps``` | _empty object_ | ```false``` | ```React.HTMLAttributes<HTMLSelectElement>``` | Native hidden HTML select props. |
| ```label``` | - | ```false``` |```string``` | Selector label that appears when nothing is selected. |
| ```noResultMessage``` | ```Search...``` | ```false``` | ```string``` | Message that shows up when nothing is returned from search |
| ```onChange``` | - | ```false``` | ```function``` | On change value handler. Receives value as unique property. |
| ```options``` | - | ```true``` | ```array``` | List of selector options. |
| ```value``` | - | ```true``` | ```string | number``` | Selected value. "No value" is represented by ```undefined``` |
| ```arrowIcons``` | ```{ up: undefined, down: undefined }``` | ```false``` | ```object``` | Change arrow icons. Pass react nodes to ```up``` and ```down``` properties. |


## License

MIT © [gabrieljmj](https://github.com/gabrieljmj)
