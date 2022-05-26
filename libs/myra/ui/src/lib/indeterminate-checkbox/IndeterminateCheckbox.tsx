import {
  Checkbox as IndeterminateChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
  Stack,
} from '@chakra-ui/react';
import { useEffect, forwardRef, useRef } from 'react';

/* eslint-disable-next-line */
export interface IndeterminateCheckboxProps extends ChakraCheckboxProps {
  mt?: number;
  pl?: number;
  colorScheme?: string;
  checkList?: string[];
  spacing: number;
  isIndeterminate: boolean;
  children: React.ReactNode;
  direction: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  ref: React.RefObject<HTMLInputElement>;
}

export function IndeterminateCheckbox(props: IndeterminateCheckboxProps) {
  const {
    children,
    checkList,
    pl,
    mt,
    spacing,
    isIndeterminate,
    direction,
    ref,
    ...rest
  } = props;

  const defaultRef = useRef<HTMLInputElement>(null);
  const resolvedRef = ref || defaultRef;

  console.log('isIndeterminate', resolvedRef, defaultRef, isIndeterminate);
  useEffect(() => {
    if (defaultRef?.current?.indeterminate) {
      //! TODO Forbidden non-null assertion re.. fix this
      defaultRef.current.indeterminate! = isIndeterminate!;
    }
  }, [resolvedRef, isIndeterminate]);
  return (
    <>
      <IndeterminateChakraCheckbox isIndeterminate ref={resolvedRef} {...rest}>
        {children}
      </IndeterminateChakraCheckbox>
      <Stack pl={pl} mt={mt} spacing={spacing} direction={direction}>
        {checkList?.map((item) => (
          <IndeterminateChakraCheckbox
            // isIndeterminate
            ref={resolvedRef}
            id={item}
            value={item}
            {...rest}
          >
            {item}
          </IndeterminateChakraCheckbox>
        ))}
      </Stack>
    </>
  );
}

export default IndeterminateCheckbox;
