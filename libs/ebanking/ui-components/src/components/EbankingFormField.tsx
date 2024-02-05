import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { SingleValue } from 'chakra-react-select';

import { SelectOption } from '@myra-ui';

import { RequiredFields, Utility } from '@coop/ebanking/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';

type IEbankingFormFieldProps = RequiredFields & {
  options: { label: string; value: string }[];
  schema: Utility;
  currentSequence: number;
};

export const EbankingFormField = (props: IEbankingFormFieldProps) => {
  const { fieldType, fieldName, fieldLabel, isRequired, options, schema, currentSequence } = props;

  const { setValue } = useFormContext();

  const prevField = useMemo(
    () =>
      schema?.sequence?.[currentSequence - 2]?.responseFieldMapping?.find(
        (prev) => prev?.mapField === fieldName
      ),
    [schema, currentSequence]
  );

  const populateAmountField = (newVal: SingleValue<SelectOption>) => {
    if (!('amount' in options[0])) {
      return;
    }

    const selectedOption = (options as Record<string, string>[])?.find(
      (opt) => opt?.[prevField?.options?.key as string] === newVal?.value
    );

    if (selectedOption) {
      setValue('amount', selectedOption?.['amount'] || 0);
    }
  };

  switch (fieldType) {
    case 'TEXTFIELD':
      return (
        <FormInput
          name={fieldName as string}
          label={fieldLabel as string}
          isRequired={isRequired === 'Y'}
          rules={isRequired === 'Y' ? { required: `${fieldLabel} is required` } : {}}
          isDisabled={!!prevField?.mapField}
        />
      );

    case 'OPTION':
      return (
        <FormSelect
          name={fieldName as string}
          label={fieldLabel as string}
          options={options}
          isRequired={isRequired === 'Y'}
          onChangeAction={populateAmountField}
          rules={isRequired === 'Y' ? { required: `${fieldLabel} is required` } : {}}
        />
      );
    default:
      return (
        <FormInput
          name={fieldName as string}
          label={fieldLabel as string}
          isRequired={isRequired === 'Y'}
          rules={isRequired === 'Y' ? { required: `${fieldLabel} is required` } : {}}
          isDisabled={!!prevField?.mapField}
        />
      );
  }
};
