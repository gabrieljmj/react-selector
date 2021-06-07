import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import Selector from '.'

describe('Selector', () => {
  it('Should show options container when clicked', async () => {
    const options = [
      { value: 1, label: 'Label 1' },
      { value: 2, label: 'Label 2' }
    ]

    const { getByTestId } = render(
      <Selector
        label="Selector"
        options={options}
        value=""
        onChange={console.log}
      />
    )
    const selector = await waitForElement(() => getByTestId('selector'))

    fireEvent.click(selector)

    const optionsContainer = await waitForElement(() =>
      getByTestId('options-container')
    )

    expect(optionsContainer).toBeTruthy()
  })

  it('Should show all options when opened', async () => {
    const options = [
      { value: 1, label: 'Label 1' },
      { value: 2, label: 'Label 2' }
    ]

    const { getByTestId } = render(
      <Selector
        label="Selector"
        options={options}
        value=""
        onChange={console.log}
      />
    )
    const selector = await waitForElement(() => getByTestId('selector'))

    fireEvent.click(selector)

    const optionsContainer = await waitForElement(() =>
      getByTestId('options-container')
    )

    const showedOptions = Array.from<HTMLLIElement>(
      optionsContainer.querySelectorAll('li')
    ).map((value) => value.innerHTML)

    expect(showedOptions).toHaveLength(options.length)

    options.forEach((option) => {
      expect(showedOptions).toContain(option.label)
    })
  })

  it('Should pass chosen value to callback when clicked', async () => {
    const optionText = 'Label 1'
    const optionValue = 1
    const options = [
      { value: optionValue, label: optionText },
      { value: 2, label: 'Label 2' }
    ]
    const handleSelectMock = jest.fn().mockImplementation((value) => value)

    const { getByTestId, getAllByText } = render(
      <Selector
        label="Selector"
        options={options}
        value=""
        onChange={handleSelectMock}
      />
    )

    const selector = await waitForElement(() => getByTestId('selector'))

    fireEvent.click(selector)

    const selectedOption = await waitForElement(() => getAllByText(optionText))

    fireEvent.click(selectedOption[1])

    const mockResultValue = handleSelectMock.mock.results[0].value

    expect(mockResultValue).toEqual(optionValue)
  })

  it('Should show label when empty value passed', async () => {
    const defaultLabel = 'Test label'
    const options = [{ value: 1, label: 'Label 1' }]

    const { getByTestId } = render(
      <Selector
        label={defaultLabel}
        options={options}
        value=""
        onChange={console.log}
      />
    )

    const selector = await waitForElement(() => getByTestId('selector'))
    const label = selector.querySelector('span').innerHTML

    expect(label).toEqual(defaultLabel)
  })

  it('Should show as label selected option label when value its different from -1', async () => {
    const optionText = 'Label 1'
    const optionValue = 1
    const options = [
      { value: optionValue, label: optionText },
      { value: 2, label: 'Label 2' }
    ]
    const handleSelectMock = jest.fn().mockImplementation((value) => value)

    const { getByTestId } = render(
      <Selector
        label="Selector"
        options={options}
        value={optionValue}
        onChange={handleSelectMock}
      />
    )

    const selector = await waitForElement(() => getByTestId('selector'))
    const label = selector.querySelector('span').innerHTML

    expect(label).toEqual(optionText)
  })

  it('Should show custom arrow icons when passed', async () => {
    const options = [
      { value: 1, label: 'Label 1' },
      { value: 2, label: 'Label 2' }
    ]

    const { getByTestId } = render(
      <Selector
        label="Selector"
        options={options}
        value=""
        onChange={console.log}
        arrowIcons={{
          up: <li className="arrow-up">up</li>,
          down: <li className="arrow-down">down</li>
        }}
      />
    )
    const selector = await waitForElement(() => getByTestId('selector'))
    const downIcon = selector.querySelector('.arrow-down')

    expect(downIcon).toBeTruthy()

    fireEvent.click(selector)

    const upIcon = selector.querySelector('.arrow-up')

    expect(upIcon).toBeTruthy()
  })

  it('Should show only options that label passes search', async () => {
    const search = 'Label'
    const invalidLabel = 'Maybe 3'
    const options = [
      { value: 1, label: 'Label 1' },
      { value: 2, label: 'Label 2' },
      { value: 3, label: invalidLabel }
    ]

    const { getByTestId } = render(
      <Selector
        label="Selector"
        options={options}
        value=""
        onChange={console.log}
        arrowIcons={{
          up: <li className="arrow-up">up</li>,
          down: <li className="arrow-down">down</li>
        }}
      />
    )
    const selector = await waitForElement(() => getByTestId('selector'))

    fireEvent.click(selector)

    const optionsContainer = await waitForElement(() =>
      getByTestId('options-container')
    )
    const showedOptions = Array.from<HTMLLIElement>(
      optionsContainer.querySelectorAll('li')
    ).map((value) => value.innerHTML)

    options.forEach((option) => {
      expect(showedOptions).toContain(option.label)
    })

    const searchInput = await waitForElement(
      () => getByTestId('search-input'),
      { container: selector }
    )

    fireEvent.change(searchInput, { target: { value: search } })

    const newShowedOptions = Array.from<HTMLLIElement>(
      optionsContainer.querySelectorAll('li')
    ).map((value) => value.innerHTML)

    expect(newShowedOptions).toHaveLength(2)
    expect(newShowedOptions).not.toContain(invalidLabel)
  })
})
