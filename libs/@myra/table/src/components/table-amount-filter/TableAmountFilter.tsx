/* eslint-disable-next-line */
import { Box, Button, Flex, Icon, Input, Popover, Portal, Spacer, Text } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import React, { ForwardedRef, useState } from 'react';
import { PopoverContent, PopoverTrigger } from '@myra-ui/components';
import qs from 'qs';
import { URLFilter } from '@coop/shared/utils';
import { useRouter } from 'next/router';
import { AmountFilter } from '@coop/shared/form';

type Condition = '=' | '<' | '>' | '< >';

export interface TableAmountFilterProps {
  column: string;
}

export const TableAmountFilter = ({ column }: TableAmountFilterProps) => {
  const router = useRouter();
  const initialFocusRef = React.useRef<HTMLSelectElement | null>(null);

  const parsedQuery = qs.parse(router.query['filter'] as string, {
    allowDots: true,
    parseArrays: true,
    comma: true,
  }) as URLFilter;

  const { value, compare } = parsedQuery[column] || {};

  const filterCols = Object.keys(parsedQuery);

  return (
    <Popover
      isLazy
      placement="bottom-start"
      initialFocusRef={initialFocusRef}
      colorScheme="primary"
    >
      {({ onClose, isOpen }) => (
        <>
          <PopoverTrigger>
            <Box as="button" display="flex" alignItems="center">
              <Icon
                as={BsFilter}
                w="s20"
                h="s20"
                p="s4"
                rounded="br1"
                _hover={{ bg: 'background.500' }}
                bg={isOpen || filterCols.includes(column) ? 'background.500' : 'transparent'}
                color={isOpen ? 'primary.500' : ''}
              />
            </Box>
          </PopoverTrigger>
          <Portal>
            <PopoverContent w="100%" boxShadow="E2" border="none" borderRadius="br2">
              <TableAmountFilterContent
                value={
                  compare === '< >' && typeof value !== 'string' && 'to' in value
                    ? {
                        max: value.to,
                        min: value.from,
                        condition: compare,
                      }
                    : compare === '=' && typeof value === 'string'
                    ? { max: value, min: value, condition: '=' }
                    : compare === '<' && typeof value === 'string'
                    ? { max: undefined, min: value, condition: '<' }
                    : compare === '>' && typeof value === 'string'
                    ? { max: value, min: undefined, condition: '>' }
                    : undefined
                }
                onClose={onClose}
                onChange={(newValue) => {
                  let queryString;
                  if (newValue.condition === '=') {
                    queryString = qs.stringify(
                      {
                        ...parsedQuery,
                        [column]: {
                          value: newValue.max,
                          compare: '=',
                        },
                      },
                      { allowDots: true, arrayFormat: 'brackets', encode: false }
                    );
                  } else if (newValue.condition === '<') {
                    queryString = qs.stringify(
                      {
                        ...parsedQuery,
                        [column]: {
                          value: newValue.max,
                          compare: '<',
                        },
                      },
                      { allowDots: true, arrayFormat: 'brackets', encode: false }
                    );
                  } else if (newValue.condition === '>') {
                    queryString = qs.stringify(
                      {
                        ...parsedQuery,
                        [column]: {
                          value: newValue.min,
                          compare: '>',
                        },
                      },
                      { allowDots: true, arrayFormat: 'brackets', encode: false }
                    );
                  } else if (newValue.condition === '< >') {
                    queryString = qs.stringify(
                      {
                        ...parsedQuery,
                        [column]: {
                          value: {
                            from: newValue.min,
                            to: newValue.max,
                          },
                          compare: '< >',
                        },
                      },
                      { allowDots: true, arrayFormat: 'brackets', encode: false }
                    );
                  }

                  router.push(
                    {
                      query: {
                        ...router.query,
                        filter: queryString,
                      },
                    },
                    undefined,
                    { shallow: true }
                  );
                }}
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

export default TableAmountFilter;

const isButtonDisabled = (
  buttonMin: string | undefined,
  buttonMax: string | undefined,
  buttonCondition: Condition
) => {
  if (buttonCondition === '< >') {
    return !buttonMin || !buttonMax;
  }

  if (buttonCondition === '>') {
    return !buttonMin;
  }

  return !buttonMax;
};

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

interface IAmountInputProps {
  value: number | string;
  setValue: (value: number) => void;
  placeholder: string;
}

export const AmountInput = React.memo(
  ({ value, setValue, placeholder }: IAmountInputProps) => (
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
  ),
  (prevProps, nextProps) => prevProps.value === nextProps.value
);
