import { SetStateAction, useEffect, useState } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';
import { HStack, Input } from '@chakra-ui/react';

import { Box, Select } from '@coop/shared/ui';

enum AmountConditions {
  amt_between = 'amt_between',
  amt_less = 'amt_less',
  amt_more = 'amt_more',
  amt_equal = 'amt_equal',
}

const options = [
  { label: 'Amount Between (<>)', value: AmountConditions.amt_between },
  { label: 'Amount Less (<>)', value: AmountConditions.amt_less },
  { label: 'Amount More (<>)', value: AmountConditions.amt_more },
  { label: 'Amount Equal (<>)', value: AmountConditions.amt_equal },
];

interface IAmountFilterProps {
  value: { min: string | null; max: string | null };
  onChange: (newValue: { min: string | null; max: string | null }) => void;
}

export const AmountFilter = ({ value, onChange }: IAmountFilterProps) => {
  const [amountCondition, setAmountCondition] = useState(AmountConditions.amt_between);

  useEffect(() => {
    onChange({ min: null, max: null });
  }, [amountCondition]);

  return (
    <Box display="flex" flexDir="column" gap="s16" color="gray.700">
      <Select
        onChange={(newValue: { value: SetStateAction<AmountConditions> }) =>
          setAmountCondition(newValue.value)
        }
        value={options.find((option) => option.value === amountCondition)}
        options={options}
      />
      {(() => {
        if (amountCondition === 'amt_between') {
          return (
            <HStack>
              <Input
                type="number"
                textAlign="right"
                placeholder="Minimum Amount"
                value={value?.min ?? ''}
                onChange={(e) => onChange({ min: e.target.value, max: value?.max ?? null })}
              />

              <span>to</span>

              <Input
                type="number"
                textAlign="right"
                placeholder="Maximum Amount"
                value={value?.max ?? ''}
                onChange={(e) => onChange({ max: e.target.value, min: value?.min ?? null })}
              />
            </HStack>
          );
        }

        if (amountCondition === 'amt_more') {
          return (
            <Input
              type="number"
              textAlign="right"
              placeholder="Maximum Amount"
              value={value?.max ?? ''}
              onChange={(e) => onChange({ max: e.target.value, min: null })}
            />
          );
        }

        if (amountCondition === 'amt_less') {
          return (
            <Input
              type="number"
              textAlign="right"
              placeholder="Minimum Amount"
              value={value?.min ?? ''}
              onChange={(e) => onChange({ min: e.target.value, max: null })}
            />
          );
        }

        if (amountCondition === 'amt_equal') {
          return (
            <Input
              type="number"
              textAlign="right"
              placeholder="Amount"
              value={value?.min ?? ''}
              onChange={(e) => onChange({ min: e.target.value, max: e.target.value })}
            />
          );
        }

        return null;
      })()}
    </Box>
  );
};

interface IFormAmountFilter<T extends Record<string, { min: string | null; max: null }>> {
  name: Path<T>;
}

export const FormAmountFilter = <T extends Record<string, { min: string | null; max: null }>>({
  name,
}: IFormAmountFilter<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <AmountFilter value={value} onChange={onChange} />
      )}
      name={name}
    />
  );
};
