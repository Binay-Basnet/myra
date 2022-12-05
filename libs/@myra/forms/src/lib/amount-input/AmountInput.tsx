import { Box, Input, InputGroup, InputProps } from '@chakra-ui/react';

import { Text } from '@myra-ui/foundations';

import { amountToWordsConverter } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AmountInputProps extends InputProps {
  label?: string | number;
  errorText?: string;
}

export const AmountInput = (props: AmountInputProps) => {
  const { label, value, errorText, ...rest } = props;

  return (
    <Box display="flex" flexDirection="column" gap="s4">
      {label && (
        <Text variant="formLabel" color="gray.700">
          {label}
        </Text>
      )}
      <InputGroup display="flex" flexDirection="column">
        <Input
          onWheel={(e) => e.currentTarget.blur()}
          variant="outline"
          value={value}
          type="number"
          textAlign="right"
          {...rest}
        />
      </InputGroup>

      {(() => {
        if (errorText) {
          return (
            <Text variant="formHelper" color="danger.500">
              {errorText}
            </Text>
          );
        }
        if (value) {
          return (
            <Text
              fontSize="s2"
              fontWeight="Regular"
              color="gray.600"
              textAlign="right"
              fontStyle="Italic"
            >
              {amountToWordsConverter(Number(value))}
            </Text>
          );
        }
        return null;
      })()}
    </Box>
  );
};

export default AmountInput;
