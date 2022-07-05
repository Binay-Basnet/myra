import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

import { useUpsertKymOptionMutation } from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Icon } from '@coop/shared/ui';

import { GROUPED_FIELD_OPTIONS } from '../../constants/GROUPED_FIELD_OPTIONS';
import { UPLOAD_FIELD_OPTIONS } from '../../constants/UPLOAD_FIELD_OPTIONS';
import {
  KymField,
  KymFieldType,
  KymOption,
  KymOptionFieldType,
} from '../../types';

interface KYMNewOptionInputProps {
  field: KymField;
  setFieldOptions: React.Dispatch<React.SetStateAction<Partial<KymOption>[]>>;
  hasNewField: boolean;
  setHasNewField: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KYMNewOptionInput = ({
  field,
  setFieldOptions,
  setHasNewField,
  hasNewField,
}: KYMNewOptionInputProps) => {
  const methods = useForm<{
    name: string;
    fieldType?: KymOptionFieldType | null;
  }>({
    defaultValues: {
      fieldType: KymOptionFieldType.TextInput,
    },
  });

  const { mutateAsync: addNewOption } = useUpsertKymOptionMutation({
    onMutate: (newOption) => {
      const fieldType = newOption?.option?.fieldType;

      setFieldOptions((prev) => [
        ...prev,
        {
          name: {
            local: newOption.option.name,
            en: '',
            np: '',
          },
          enabled: true,
          id: 'loading-id',
          fieldType: fieldType ?? KymOptionFieldType.TextInput,
        },
      ]);
    },
    onError: () => {
      console.log('ERROR');
    },
    onSuccess: (response) => {
      setHasNewField(false);
      methods.reset();
      const newItem = response.settings.kymForm.option.upsert.record;
      if (newItem) {
        setFieldOptions((prev) =>
          prev.map((option) => (option.id === 'loading-id' ? newItem : option))
        );
      }
    },
  });

  if (!hasNewField) return null;

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        display="flex"
        alignItems="center"
        gap="s16"
        onSubmit={async (e) => {
          e.preventDefault();
          await addNewOption({
            fieldId: field.id,
            option: {
              name: methods.getValues()['name'],
              enabled: true,
              fieldType: methods.getValues()['fieldType'],
            },
          });
        }}
      >
        <Box width={field.fieldType !== 'GROUP' ? '100%' : '66%'}>
          <FormInput
            name="name"
            placeholder="Name of Field"
            rules={{ required: "This field shouldn't be empty" }}
          />
        </Box>

        <Box
          display={
            field.fieldType === KymFieldType.Group ||
            field.fieldType === KymFieldType.Upload
              ? 'block'
              : 'none'
          }
          width={
            field.fieldType === KymFieldType.Group ||
            field.fieldType === KymFieldType.Upload
              ? '33%'
              : '0%'
          }
        >
          <FormSelect
            form="fieldType"
            name="fieldType"
            placeholder="Type of Field"
            rules={{ required: 'Please select' }}
            options={
              field.fieldType === 'GROUP'
                ? GROUPED_FIELD_OPTIONS
                : UPLOAD_FIELD_OPTIONS
            }
          />
        </Box>
        <Icon
          onClick={() => {
            setHasNewField(false);
          }}
          as={IoClose}
          size="md"
          color="gray.500"
          cursor="pointer"
          _hover={{ color: 'gray.800' }}
        />
      </Box>
    </FormProvider>
  );
};
