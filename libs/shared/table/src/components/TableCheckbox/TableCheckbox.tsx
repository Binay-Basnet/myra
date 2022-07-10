import React from 'react';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';

export interface TableCheckboxProps extends CheckboxProps {
  indeterminate?: boolean;
}

export function TableCheckbox({
  indeterminate,
  checked,
  ...rest
}: TableCheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref?.current?.indeterminate) {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate, checked]);

  return (
    <Checkbox
      colorScheme="primary"
      isChecked={checked}
      isIndeterminate={indeterminate}
      {...rest}
    />
  );
}

export default TableCheckbox;
