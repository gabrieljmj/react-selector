import clsx from 'clsx'
import * as React from 'react'
import classes from './styles.module.css'
import { compareValues } from './utils/comparison'

export interface Option {
  label: string
  value: string | number
}

export interface Icons {
  up: React.ReactNode
  down: React.ReactNode
}

export interface Props {
  containerProps?: React.HTMLAttributes<HTMLDivElement>
  searchInputProps?: React.HTMLAttributes<HTMLInputElement>
  className?: React.ClassAttributes<HTMLDivElement>
  disabled?: boolean
  fullWidth?: boolean
  htmlInputProps?: React.HTMLAttributes<HTMLSelectElement>
  label: string
  noResultMessage?: string
  onChange: CallableFunction
  options: Option[]
  searchInputPlaceholder?: string
  showSearchInput?: boolean
  value: string | number
  arrowIcons?: Icons
  strictComparison?: boolean
}

const Selector: React.FC<Props> = ({
  label: inputLabel,
  options,
  value = '',
  onChange,
  disabled,
  htmlInputProps = {},
  containerProps = {},
  searchInputProps = {},
  fullWidth = false,
  showSearchInput = true,
  searchInputPlaceholder = 'Search...',
  noResultMessage = 'No results.',
  className = undefined,
  arrowIcons = { up: undefined, down: undefined },
  strictComparison = true
}: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [search, setSearch] = React.useState<string>('')
  const foundOptions = React.useMemo<Option[]>(() => {
    return options.filter((option: Option) => {
      if (!search) {
        return true
      }

      return option.label.toLowerCase().search(search.toLowerCase()) > -1
    })
  }, [options, search])
  const maskRef = React.useRef<HTMLDivElement>(null)

  const handleMaskClick: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (e) => {
        if (e.target === maskRef.current) {
          setIsOpen(false)
        }
      },
      [maskRef]
    )

  const toggling = React.useCallback(() => {
    if (disabled) {
      setIsOpen(false)

      return
    }

    setIsOpen((prev) => !prev)
  }, [disabled])

  const findOptionLabel = (optionValue: string | number) =>
    options?.filter((option: Option) =>
      compareValues(option.value, optionValue, strictComparison)
    )[0]?.label

  const label = value !== '' ? findOptionLabel(value) : inputLabel

  const onClickChange = React.useCallback(
    (newValue: string | number) => () => {
      onChange(newValue)
      setIsOpen(false)
    },
    []
  )

  React.useEffect(() => {
    setIsOpen(false)
  }, [options])

  React.useEffect(() => {
    if (!isOpen) {
      setSearch('')
    }
  }, [isOpen])

  const arrowUp = React.useMemo(
    () => arrowIcons.up || <i className={classes.arrowUp} />,
    [arrowIcons.up]
  )
  const arrowDown = React.useMemo(
    () => arrowIcons.down || <i className={classes.arrowDown} />,
    [arrowIcons.down]
  )

  return (
    <div>
      {isOpen && (
        <div ref={maskRef} onClick={handleMaskClick} className={classes.mask} />
      )}

      <div
        className={clsx(classes.dropDownContainer, {
          [classes.fullWidth]: fullWidth
        })}
        {...containerProps}
      >
        <select
          className={classes.hiddenInput}
          value={value}
          onChange={() => {}}
          disabled={disabled}
          {...htmlInputProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div
          data-testid="selector"
          className={clsx(classes.dropDownHeader, className, {
            [classes.dropDownDisabled]: disabled
          })}
          onClick={toggling}
        >
          <span>{label}</span>
          {isOpen ? arrowUp : arrowDown}
        </div>
        {isOpen && (
          <div
            className={classes.dropDownListContainer}
            data-testid="options-container"
          >
            <ul className={classes.dropDownList}>
              {showSearchInput && (
                <div className={classes.searchInputContainer}>
                  <input
                    data-testid="search-input"
                    type="text"
                    className={classes.searchInput}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={searchInputPlaceholder}
                    autoFocus
                    {...searchInputProps}
                  />
                </div>
              )}
              {!foundOptions.length && (
                <div className={classes.empty}>{noResultMessage}</div>
              )}
              {foundOptions?.map((option) => (
                <li
                  key={option.value}
                  className={classes.listItem}
                  onClick={onClickChange(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Selector
