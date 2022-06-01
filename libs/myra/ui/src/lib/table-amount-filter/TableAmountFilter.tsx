/* eslint-disable-next-line */
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Popover,
  Select,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { PopoverContent, PopoverTrigger } from '../popover/Popover';
import Icon from '../icon/Icon';
import { BsFilter } from 'react-icons/bs';
import React, { ForwardedRef, useEffect, useState } from 'react';
import Button from '../button/Button';
import { HeaderGroup } from 'react-table';

export interface TableAmountFilterProps {
  data?: string;
}

export function TableAmountFilter() {
  const initialFocusRef = React.useRef<HTMLSelectElement | null>(null);

  return (
    <Popover
      isLazy
      placement="auto-end"
      initialFocusRef={initialFocusRef}
      colorScheme="primary"
    >
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton aria-label={'open'}>
              <Icon as={BsFilter} size="md" />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent _focus={{ boxShadow: 'E2' }}>
            <TableAmountFilterContent ref={initialFocusRef} onClose={onClose} />
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export interface TableAmountFilterContentProps {
  onClose?: () => void;
  column?: HeaderGroup<Record<string, unknown>>;
}

export default TableAmountFilter;

enum AMOUNT_CONDITIONS {
  amt_between = 'amt_between',
  amt_less = 'amt_less',
  amt_more = 'amt_more',
  amt_equal = 'amt_equal',
}

export const TableAmountFilterContent = React.forwardRef(
  (
    { onClose, column }: TableAmountFilterContentProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    const [min, setMin] = useState<number | string>(
      column?.filterValue?.value?.[0] ?? ''
    );
    const [max, setMax] = useState<number | string>(
      column?.filterValue?.value?.[1] ?? ''
    );
    const [amt, setAmt] = useState<number | string>(
      column?.filterValue?.value ?? ''
    );
    const [amountCondition, setAmountCondition] = useState(
      column?.filterValue?.type ?? AMOUNT_CONDITIONS.amt_between
    );

    useEffect(() => {
      if (amountCondition === column?.filterValue?.type) {
        setAmt(column?.filterValue?.value);
      } else {
        setAmt('');
      }
    }, [amountCondition]);

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
        <Select
          fontSize="r1"
          borderColor="gray.500"
          borderRadius="br1"
          focusBorderColor="primary.500"
          value={amountCondition}
          ref={ref}
          onChange={(e) =>
            setAmountCondition(e.target.value as AMOUNT_CONDITIONS)
          }
        >
          <option value={AMOUNT_CONDITIONS.amt_between}>
            Amount Between ({' <> '})
          </option>
          <option value={AMOUNT_CONDITIONS.amt_less}>
            Amount Less Than ({' < '})
          </option>
          <option value={AMOUNT_CONDITIONS.amt_more}>
            Amount Greater Than ({' > '})
          </option>
          <option value={AMOUNT_CONDITIONS.amt_equal}>
            Amount Equal To ({' = '})
          </option>
        </Select>

        {amountCondition === 'amt_more' ? (
          <AmountInput
            placeholder="Maximum Amount"
            value={amt}
            setValue={setAmt}
          />
        ) : amountCondition === 'amt_less' ? (
          <AmountInput
            placeholder="Minimum Amount"
            value={amt}
            setValue={setAmt}
          />
        ) : amountCondition === 'amt_equal' ? (
          <AmountInput value={amt} setValue={setAmt} placeholder="Amount" />
        ) : (
          <HStack>
            <AmountInput
              value={min}
              setValue={setMin}
              placeholder="Minimum Amount"
            />

            <span>to</span>

            <AmountInput
              value={max}
              setValue={setMax}
              placeholder="Maximum Amount"
            />
          </HStack>
        )}

        <Flex alignItems="center" fontSize="r1">
          <Text
            color="neutralColorLight.Gray-80"
            fontWeight="InterMedium"
            paddingX="s8"
            cursor="pointer"
            onClick={() => {
              column?.setFilter(undefined);
              onClose && onClose();
            }}
          >
            Reset To Default
          </Text>
          <Spacer />
          <Button
            paddingX="12"
            onClick={() => {
              if (amountCondition === 'amt_between') {
                column?.setFilter({
                  type: amountCondition,
                  value: [min, max],
                });
              } else {
                column?.setFilter({
                  type: amountCondition,
                  value: amt,
                });
              }

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

interface IAmountInputProps {
  value: number | string;
  setValue: (value: number) => void;
  placeholder: string;
}

export const AmountInput = React.memo(
  ({ value, setValue, placeholder }: IAmountInputProps) => {
    return (
      <Input
        type="number"
        bg="white"
        borderRadius="br1"
        py="12px"
        focusBorderColor="primary.500"
        fontSize="r1"
        border="1px"
        borderColor="gray.500"
        textAlign="right"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
      />
    );
  },
  (prevProps, nextProps) => prevProps.value === nextProps.value
);
