import React, { ForwardedRef, ReactNode, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Flex, Popover, PopoverContent, PopoverTrigger, Portal, Spacer } from '@chakra-ui/react';

import { Box, Button, Text } from '@myra-ui';

import { AmountFilter } from '@coop/shared/form';

type Condition = '=' | '<' | '>' | '< >';

interface IFormAmountFilterPopoverProps {
  name: string;
  trigger: ReactNode;
}

export const FormAmountFilterPopover = ({ name, trigger }: IFormAmountFilterPopoverProps) => {
  const methods = useFormContext();

  const {
    // formState: { errors },
    control,
  } = methods;

  const initialFocusRef = useRef<HTMLSelectElement | null>(null);

  return (
    <Popover
      isLazy
      placement="bottom-start"
      initialFocusRef={initialFocusRef}
      colorScheme="primary"
    >
      {({ onClose }) => (
        <>
          <PopoverTrigger>{trigger}</PopoverTrigger>
          <Portal>
            <PopoverContent w="100%" boxShadow="E2" border="none" borderRadius="br2">
              <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                  <TableAmountFilterContent
                    // value={
                    //   compare === '< >' && typeof value !== 'string' && 'to' in value
                    //     ? {
                    //         max: value.to,
                    //         min: value.from,
                    //         condition: compare,
                    //       }
                    //     : compare === '=' && typeof value === 'string'
                    //     ? { max: value, min: value, condition: '=' }
                    //     : compare === '<' && typeof value === 'string'
                    //     ? { max: undefined, min: value, condition: '<' }
                    //     : compare === '>' && typeof value === 'string'
                    //     ? { max: value, min: undefined, condition: '>' }
                    //     : undefined
                    // }
                    value={value}
                    onClose={onClose}
                    onChange={(newValue) => {
                      onChange(newValue);
                    }}
                  />
                )}
              />
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};

export interface TableAmountFilterContentProps {
  onClose?: () => void;

  value: { min: string | undefined; max: string | undefined; condition: Condition } | undefined;
  onChange: (newValue: {
    min: string | undefined;
    max: string | undefined;
    condition: Condition;
  }) => void;
}

export const TableAmountFilterContent = React.forwardRef(
  (
    { onClose, value, onChange }: TableAmountFilterContentProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const [min, setMin] = useState<string | undefined>(value?.min || undefined);
    const [max, setMax] = useState<string | undefined>(value?.max || undefined);
    const [amountCondition, setAmountCondition] = useState<Condition>(value?.condition || '< >');

    React.useEffect(() => {
      setMin(value?.min);
      setMax(value?.max);
      setAmountCondition(value?.condition || '< >');
    }, []);

    return (
      <Box
        borderRadius="br1"
        shadow="E2"
        width="360px"
        display="flex"
        flexDirection="column"
        gap="s16"
        padding="s16"
        bg="white"
      >
        <AmountFilter
          ref={ref}
          value={{
            min,
            max,
            condition: amountCondition,
          }}
          onChange={(newValue, condition) => {
            if (condition) {
              setAmountCondition(condition);
            }
            setMin(newValue.min);
            setMax(newValue.max);
          }}
        />

        <Flex alignItems="center" fontSize="r1">
          <Text
            color="neutralColorLight.Gray-80"
            fontWeight="InterMedium"
            paddingX="s8"
            cursor="pointer"
            onClick={() => {
              onClose && onClose();
            }}
          >
            Reset To Default
          </Text>
          <Spacer />
          <Button
            paddingX="12"
            isDisabled={isButtonDisabled(min, max, amountCondition)}
            onClick={() => {
              onChange({ min, max, condition: amountCondition });
              onClose && onClose();
            }}
          >
            Apply
          </Button>
        </Flex>
      </Box>
    );
  }
);

const isButtonDisabled = (
  buttonMin: string | undefined,
  buttonMax: string | undefined,
  buttonCondition: Condition
) => {
  if (buttonCondition === '< >') {
    return !buttonMin || !buttonMax;
  }

  if (buttonCondition === '>') {
    return !buttonMax;
  }

  return !buttonMin;
};
