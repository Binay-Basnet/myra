import { useEffect, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { FormProvider, useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import { FormField, FormOption, useUpsertNewOptionMutation } from '@coop/cbs/data-access';
import { FormInput, FormSwitch } from '@coop/shared/form';
import { Box, Icon, Text } from '@coop/shared/ui';
import { GRID2X3 } from '@coop/shared/utils';

/** *************** KYM Settings Field Option Component Start **************** */

interface KYMSettingOptionProps {
  option: Partial<FormOption>;
  field: FormField;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

export const KYMSettingsOption = ({ option, field, dragHandleProps }: KYMSettingOptionProps) => {
  const { mutateAsync: updateOption } = useUpsertNewOptionMutation();

  const methods = useForm<{ name: string; enabled: boolean }>({
    defaultValues: {
      enabled: option.enabled,
      name: option.name?.local,
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
          fieldId: field.id,
          data: {
            id: option.id,
            data: { nameEn: values.name, enabled: values.enabled },
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
        {}
        <Box {...dragHandleProps}>
          <Icon size="md" as={GRID2X3} />
        </Box>
        <FormSwitch name="enabled" size="md" />
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="s8"
        >
          {isEditable || !option.id ? (
            <FormInput type="text" name="name" />
          ) : (
            <Text
              onClick={() => setIsEditable(true)}
              fontSize="r1"
              fontWeight="400"
              color="gray.800"
              my="7.5px"
            >
              {methods.getValues().name}
            </Text>
          )}
        </Box>
      </Box>
    </FormProvider>
  );
};
