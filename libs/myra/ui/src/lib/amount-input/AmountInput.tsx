import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Text,
  InputProps,
} from '@chakra-ui/react';
import { useState } from 'react';

import { forwardRef } from 'react';

/* eslint-disable-next-line */
export interface AmountInputProps extends InputProps {
  labelColor?: string;
  label?: string;
  placeholder?: string;
}

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (props, ref) => {
    const { labelColor, label, placeholder, ...rest } = props;
    const [isDebit, setIsDebit] = useState(true);
    const handleClick = () => setIsDebit(!isDebit);

    return (
      <>
        <Text
          fontWeight={'500'}
          color={labelColor ?? 'gray.700'}
          fontSize="s2"
          mb="s4"
        >
          {' '}
          {label ?? 'Amount'}
        </Text>
        <InputGroup h="44px">
          <Input
            pr="58px"
            variant={'outline'}
            type="number"
            fontSize={'s2'}
            textAlign={'right'}
            placeholder={placeholder ?? '0.00'}
            ref={ref}
            {...rest}
          />
          <InputRightElement
            // pointerEvents={'none'}
            width="fit-content"
            onClick={handleClick}
            pr="s16"
            cursor={'pointer'}
          >
            <Box w="30px">
              <Text
                fontSize="s2"
                fontWeight={'500'}
                color={isDebit ? '#143E9F' : '#FC814A'}
              >
                {isDebit ? 'DR' : 'CR'}
              </Text>
            </Box>
          </InputRightElement>
        </InputGroup>
      </>
    );
  }
);

export default AmountInput;
