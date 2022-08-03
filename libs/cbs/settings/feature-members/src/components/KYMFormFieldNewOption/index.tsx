import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

import {
  FormField,
  FormOption,
  useUpsertNewOptionMutation,
} from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Icon } from '@coop/shared/ui';

interface KYMFormFieldNewOptionProps {
  field: FormField;
  setFieldOptions: React.Dispatch<React.SetStateAction<Partial<FormOption>[]>>;
  hasNewField: boolean;
  setHasNewField: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KYMFormFieldNewOption = ({
  field,
  setFieldOptions,
  hasNewField,
  setHasNewField,
}: KYMFormFieldNewOptionProps) => {
  const methods = useForm<{ name: string }>();

  const { mutateAsync: addNewOption } = useUpsertNewOptionMutation({
    onMutate: (newOption) => {
      setFieldOptions((prev) => [
        ...prev,
        {
          name: { local: newOption.data.data?.nameEn ?? '', np: '', en: '' },
          enabled: true,
          id: 'loading-id',
        },
      ]);
    },
    onSuccess: (response) => {
      setHasNewField(false);
      methods.reset();

      const newItem = response.settings.form?.option.upsert.record;

      if (newItem) {
        setFieldOptions((prev) =>
          prev.map((option) => (option.id === 'loading-id' ? newItem : option))
        );
      }
    },
  });

  if (!hasNewField || !field) return null;

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
            data: {
              data: {
                nameEn: methods.getValues().name,
                enabled: true,
              },
            },
          });
        }}
      >
        <FormInput
          name="name"
          placeholder="Name of Field"
          rules={{ required: "This field shouldn't be empty" }}
        />
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
