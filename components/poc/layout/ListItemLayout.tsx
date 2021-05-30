import { Button } from '@material-ui/core'
import { PropsWithChildren, useCallback } from 'react'

export interface ListItemLayoutProps<T extends { id: string }> {
  item: T
  onChange: (func: (items: T[]) => T[]) => void
  disabled: boolean
  classes: { root: string; formControl: string }
  canAdd: boolean
  canRemove: boolean
  newItem: (list: T[]) => T
}

export function ListItemLayout<T extends { id: string }>({
  item,
  onChange,
  disabled,
  classes,
  canAdd,
  canRemove,
  newItem,
  children,
}: PropsWithChildren<ListItemLayoutProps<T>>) {
  const onAdd = useCallback(() => {
    onChange((list) => [...list, newItem(list)])
  }, [onChange, newItem])
  const onRemove = useCallback(() => {
    onChange((list) => list.filter((old) => old.id !== item.id))
  }, [onChange, item])
  return (
    <div className={`flex ${classes.formControl}`}>
      <div className="flex-grow">{children}</div>
      <div className="flex-grow-0">
        <Button
          disabled={disabled || !canAdd}
          variant="outlined"
          className="h-full"
          onClick={onAdd}
        >
          Add
        </Button>
        <Button
          disabled={disabled || !canRemove}
          variant="outlined"
          className="h-full"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}
