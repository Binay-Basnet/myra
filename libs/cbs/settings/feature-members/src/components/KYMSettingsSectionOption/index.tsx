import { useEffect, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { FormProvider, useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import {
  FormCategory,
  FormField,
  FormFieldType,
  FormSection,
  FormSectionType,
  useUpsertSectionOptionMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Icon, Text } from '@coop/shared/ui';
import { GRID2X3 } from '@coop/shared/utils';

import { GROUPED_FIELD_OPTIONS } from '../../constants/GROUP_FIELD_OPTIONS';
import { UPLOAD_FIELD_OPTIONS } from '../../constants/UPLOAD_FIELD_OPTIONS';

interface KYMSettingOptionProps {
  option: Partial<FormField>;
  section: FormSection;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
  kymType: FormCategory;
}

type OptionForm = {
  name: string;
  enabled: boolean;
  fieldType: FormFieldType;
};

export const KYMSettingsSectionOption = ({
  option,
  section,
  dragHandleProps,
  kymType,
}: KYMSettingOptionProps) => {
  const { mutateAsync: updateOption } = useUpsertSectionOptionMutation();

  const methods = useForm<OptionForm>({
    defaultValues: {
      enabled: option.enabled,
      name: option.name?.local,
      fieldType: option.fieldType,
    },
  });
  const [isEditable, setIsEditable] = useState(!option.id);

  useEffect(() => {
    if (methods.getValues().name === '') {
      setIsEditable(true);
    }
  }, []);

  useEffect(() => {
    const subscription = methods.watch(
      debounce(async (values) => {
        await updateOption({
          sectionId: section.id,
          data: {
            id: option.id,
            data: {
              nameEn: values.name,
              enabled: values.enabled,
              fieldType: values.fieldType,
              hasOtherField: false,
              category: kymType,
            },
          },
        });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [methods.watch]);

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap="s20"
        onSubmit={(e) => {
          setIsEditable(false);
          e.preventDefault();
        }}
      >
        <Box {...dragHandleProps}>
          <Icon size="md" as={GRID2X3} />
        </Box>
        <FormSwitch name="enabled" size="md" isDisabled={option.isDefault} />
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="s8"
        >
          <Box w="66%">
            {isEditable || !option.id ? (
              <FormInput type="text" name="name" />
            ) : (
              <Text
                onClick={() => !option.isDefault && setIsEditable(true)}
                fontSize="r1"
                fontWeight="400"
                color="gray.800"
                my="7.5px"
              >
                {methods.getValues().name}
              </Text>
            )}
          </Box>

          <Box w="33%">
            {isEditable || methods.getValues().name === '' || !methods.getValues().fieldType ? (
              <FormSelect
                form="fieldType"
                name="fieldType"
                options={
                  section.sectionType === FormSectionType.Upload
                    ? UPLOAD_FIELD_OPTIONS
                    : GROUPED_FIELD_OPTIONS
                }
              />
            ) : (
              <Text
                onClick={() => !option.isDefault && setIsEditable(true)}
                fontSize="r1"
                fontWeight="400"
                color="gray.800"
                textAlign="right"
              >
                <em>{methods.getValues().fieldType}</em>
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};
