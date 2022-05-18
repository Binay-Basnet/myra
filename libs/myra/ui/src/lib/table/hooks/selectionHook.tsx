import { CellProps, HeaderProps, Hooks } from 'react-table';
import { forwardRef, RefObject, useEffect, useRef } from 'react';
import { Checkbox } from '@chakra-ui/react';

interface IIndeterminateInputProps {
  indeterminate?: boolean;
  checked?: boolean;
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IIndeterminateInputProps
>(({ indeterminate, checked, ...rest }, ref) => {
  const defaultRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref || defaultRef) as RefObject<HTMLInputElement>;

  useEffect(() => {
    if (defaultRef?.current?.indeterminate) {
      defaultRef.current.indeterminate = indeterminate ?? false;
    }
  }, [resolvedRef, checked]);

  return (
    <Checkbox
      colorScheme="primary"
      isIndeterminate={indeterminate}
      isChecked={checked}
      {...rest}
    />
  );
});

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export function selectionHook<T extends Record<string, unknown>>(
  hooks: Hooks<T>
) {
  hooks.allColumns.push((columns) => [
    {
      id: '_selector',
      minWidth: 45,
      width: 45,
      maxWidth: 45,

      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<T>) => (
        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
      ),
      Cell: ({ row }: CellProps<T>) => (
        <div>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
      ),
    },
    ...columns,
  ]);
}
