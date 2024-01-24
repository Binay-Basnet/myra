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

  const handleRenewalPlans = (newVal: SingleValue<SelectOption>) => {
    if (!('amount' in options[0])) {
      return;
    }

    const prevField = schema?.sequence?.[currentSequence - 2]?.responseFieldMapping?.find(
      (prev) => prev?.mapField === fieldName
    );

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
        />
      );

    case 'OPTION':
      return (
        <FormSelect
          name={fieldName as string}
          label={fieldLabel as string}
          options={options}
          isRequired={isRequired === 'Y'}
          onChangeAction={handleRenewalPlans}
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
        />
      );
  }
};
