import { useState } from 'react';
import { Box, Input, InputGroup, InputProps, InputRightElement, Text } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface AccountInputProps extends InputProps {
  labelColor?: string;
  label?: string | number;
  __placeholder?: string;
}

export const AccountInput = (props: AccountInputProps) => {
  const { labelColor, label, ...rest } = props;
  const [isDebit, setIsDebit] = useState(true);
  const handleClick = () => setIsDebit(!isDebit);

  return (
    <>
      <Text fontWeight="500" color={labelColor ?? 'gray.700'} fontSize="s2" mb="s4">
        {' '}
        {label ?? 'Amount'}
      </Text>
      <InputGroup h="s44">
        <Input
          pr="58px"
          variant="outline"
          type="number"
          fontSize="s2"
          textAlign="right"
          // __placeholder={__placeholder ?? '0.00'}
          {...rest}
        />
        <InputRightElement
          // pointerEvents={'none'}
          width="fit-content"
          onClick={handleClick}
          pr="s16"
          cursor="pointer"
        >
          <Box w="30px">
            <Text fontSize="s2" fontWeight="500" color={isDebit ? '#143E9F' : '#FC814A'}>
              {isDebit ? 'DR' : 'CR'}
            </Text>
          </Box>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default AccountInput;
