import { Box, Input, InputGroup, InputProps, Text } from '@chakra-ui/react';

import { amountToWordsConverter } from '@coop/shared/utils';

import TextFields from '../text-fields/TextFields';

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
        <TextFields variant="formLabel" color="gray.700">
          {label}
        </TextFields>
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
            <TextFields variant="formHelper" color="danger.500">
              {errorText}
            </TextFields>
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
