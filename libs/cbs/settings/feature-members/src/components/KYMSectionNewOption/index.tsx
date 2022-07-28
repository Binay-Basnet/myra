import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

import {
  FormCategory,
  FormField,
  FormFieldType,
  FormSection,
  FormSectionType,
  useUpsertSectionOptionMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Icon } from '@coop/shared/ui';

import { GROUPED_FIELD_OPTIONS } from '../../constants/GROUP_FIELD_OPTIONS';
import { UPLOAD_FIELD_OPTIONS } from '../../constants/UPLOAD_FIELD_OPTIONS';

interface KYMFormFieldNewOptionProps {
  section: FormSection;
  setFieldOptions: React.Dispatch<React.SetStateAction<Partial<FormField>[]>>;
  hasNewField: boolean;
  setHasNewField: React.Dispatch<React.SetStateAction<boolean>>;
  kymType: FormCategory;
}

export const KYMSectionNewOption = ({
  section,
  setFieldOptions,
  hasNewField,
  setHasNewField,
  kymType,
}: KYMFormFieldNewOptionProps) => {
  const methods = useForm<{
    name: string;
    fieldType: FormFieldType;
  }>();

  const { mutateAsync: addNewOption } = useUpsertSectionOptionMutation({
    onMutate: (newOption) => {
      setFieldOptions((prev) => [
        ...prev,
        {
          fieldType: FormFieldType.TextInput,
          name: { local: newOption.data.data?.nameEn ?? '', np: '', en: '' },
          enabled: true,
          id: 'loading-id',
        },
      ]);
    },
    onError: () => {
      console.log('ERROR');
    },
    onSuccess: (response) => {
      setHasNewField(false);
      methods.reset();

      const newItem = response.settings.form?.field.upsert.record;

      if (newItem) {
        setFieldOptions((prev) =>
          prev.map((option) => (option.id === 'loading-id' ? newItem : option))
        );
      }
    },
  });

  if (!hasNewField || !section) return null;

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
            sectionId: section.id,
            data: {
              data: {
                hasOtherField: false,
                category: kymType,
                fieldType: methods.getValues().fieldType
                  ? methods.getValues().fieldType
                  : section.sectionType === 'UPLOAD'
                  ? FormFieldType.SingleFile
                  : FormFieldType.TextInput,
                nameEn: methods.getValues().name,
                enabled: true,
              },
            },
          });
        }}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="s8"
        >
          <Box w="66%">
            <FormInput type="text" name="name" />
          </Box>
          <Box w="33%">
            <FormSelect
              form="fieldType"
              name="fieldType"
              options={
                section.sectionType === FormSectionType.Upload
                  ? UPLOAD_FIELD_OPTIONS
                  : GROUPED_FIELD_OPTIONS
              }
            />
          </Box>
        </Box>
        <Icon
          onClick={() => {
            setHasNewField(false);
            methods.reset();
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
