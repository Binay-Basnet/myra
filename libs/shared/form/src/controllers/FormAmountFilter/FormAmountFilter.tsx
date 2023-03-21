import React, { ForwardedRef, useEffect, useState } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';
import { HStack, Input } from '@chakra-ui/react';

import { Box, Select } from '@myra-ui';

enum AmountConditions {
  amt_between = '< >',
  amt_less = '<',
  amt_more = '>',
  amt_equal = '=',
}

interface IAmountFilterProps {
  placeholder?: string;
  value: {
    min: string | undefined;
    max: string | undefined;
    condition?: '=' | '<' | '>' | '< >' | null;
  };
  onChange: (
    newValue: { min: string | undefined; max: string | undefined },
    conditon: '=' | '<' | '>' | '< >' | null
  ) => void;
}

export const AmountFilter = React.forwardRef(
  ({ placeholder, value, onChange }: IAmountFilterProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const [amountCondition, setAmountCondition] = useState(
      value?.condition || AmountConditions.amt_between
    );

    const options = [
      {
        label: placeholder ? `${placeholder} Between (< >)` : 'Amount Between (< >)',
        value: AmountConditions.amt_between,
      },
      {
        label: placeholder ? `${placeholder} Less (<)` : 'Amount Less (<)',
        value: AmountConditions.amt_less,
      },
      {
        label: placeholder ? `${placeholder} More (>)` : 'Amount More (>)',
        value: AmountConditions.amt_more,
      },
      {
        label: placeholder ? `${placeholder} Equal (=)` : 'Amount Equal (=)',
        value: AmountConditions.amt_equal,
      },
    ];

    useEffect(() => {
      onChange({ min: undefined, max: undefined }, null);
    }, [amountCondition]);

    return (
      <Box display="flex" flexDir="column" gap="s16" color="gray.700">
        <Select
          ref={ref}
          onChange={(newValue) => {
            const amtCondition =
              newValue && 'value' in newValue
                ? (newValue.value as AmountConditions)
                : AmountConditions.amt_between;

            onChange({ min: undefined, max: undefined }, amtCondition);
            setAmountCondition(amtCondition);
          }}
          value={options.find((option) => option.value === amountCondition)}
          options={options}
        />
        {(() => {
          if (amountCondition === AmountConditions.amt_between) {
            return (
              <HStack>
                <Input
                  type="number"
                  textAlign="right"
                  placeholder={placeholder ? `Minimum ${placeholder}` : 'Minimum Amt'}
                  value={value?.min}
                  onChange={(e) =>
                    onChange(
                      {
                        min: e.target.value,
                        max: value?.max ?? undefined,
                      },
                      '< >'
                    )
                  }
                />

                <span>to</span>

                <Input
                  type="number"
                  textAlign="right"
                  placeholder={placeholder ? `Maximum ${placeholder}` : 'Maximum Amt'}
                  value={value?.max}
                  onChange={(e) =>
                    onChange({ max: e.target.value, min: value?.min ?? undefined }, '< >')
                  }
                />
              </HStack>
            );
          }

          if (amountCondition === AmountConditions.amt_more) {
            return (
              <Input
                type="number"
                textAlign="right"
                placeholder={placeholder ? `Minimum ${placeholder}` : 'Minimum Amt'}
                value={value?.max}
                onChange={(e) => onChange({ max: e.target.value, min: undefined }, '>')}
              />
            );
          }

          if (amountCondition === AmountConditions.amt_less) {
            return (
              <Input
                type="number"
                textAlign="right"
                placeholder={placeholder ? `Maximum ${placeholder}` : 'Maximum Amt'}
                value={value?.min}
                onChange={(e) => onChange({ min: e.target.value, max: undefined }, '<')}
              />
            );
          }

          if (amountCondition === AmountConditions.amt_equal) {
            return (
              <Input
                type="number"
                textAlign="right"
                placeholder={placeholder ? `${placeholder}` : 'Amount'}
                value={value?.min}
                onChange={(e) => onChange({ min: e.target.value, max: e.target.value }, '=')}
              />
            );
          }

          return null;
        })()}
      </Box>
    );
  }
);

interface IFormAmountFilter<
  T extends Record<string, { min: string | undefined; max: string | undefined }>
> {
  name: Path<T>;
  placeholder?: string;
}

export const FormAmountFilter = <
  T extends Record<string, { min: string | undefined; max: string | undefined }>
>({
  name,
  placeholder,
}: IFormAmountFilter<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <AmountFilter placeholder={placeholder} value={value} onChange={onChange} />
      )}
      name={name}
    />
  );
};
