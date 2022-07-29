import React, { useEffect, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { FormProvider, useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import {
  FormField,
  FormOption,
  useUpsertNewOptionMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSwitch } from '@coop/shared/form';
import { Box, Icon, Text } from '@coop/shared/ui';

/***************** KYM Settings Field Option Component Start *****************/

interface KYMSettingOptionProps {
  option: Partial<FormOption>;
  field: FormField;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

export const KYMSettingsOption = ({
  option,
  field,
  dragHandleProps,
}: KYMSettingOptionProps) => {
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
              color={'gray.800'}
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
const GRID2X3 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
    >
      <path
        d="M4.16659 11.9997C4.16659 12.9163 3.41659 13.6663 2.49992 13.6663C1.58325 13.6663 0.833252 12.9163 0.833252 11.9997C0.833252 11.083 1.58325 10.333 2.49992 10.333C3.41659 10.333 4.16659 11.083 4.16659 11.9997ZM2.49992 5.33301C1.58325 5.33301 0.833252 6.08301 0.833252 6.99967C0.833252 7.91634 1.58325 8.66634 2.49992 8.66634C3.41659 8.66634 4.16659 7.91634 4.16659 6.99967C4.16659 6.08301 3.41659 5.33301 2.49992 5.33301ZM2.49992 0.333008C1.58325 0.333008 0.833252 1.08301 0.833252 1.99967C0.833252 2.91634 1.58325 3.66634 2.49992 3.66634C3.41659 3.66634 4.16659 2.91634 4.16659 1.99967C4.16659 1.08301 3.41659 0.333008 2.49992 0.333008ZM7.49992 3.66634C8.41659 3.66634 9.16659 2.91634 9.16659 1.99967C9.16659 1.08301 8.41659 0.333008 7.49992 0.333008C6.58325 0.333008 5.83325 1.08301 5.83325 1.99967C5.83325 2.91634 6.58325 3.66634 7.49992 3.66634ZM7.49992 5.33301C6.58325 5.33301 5.83325 6.08301 5.83325 6.99967C5.83325 7.91634 6.58325 8.66634 7.49992 8.66634C8.41659 8.66634 9.16659 7.91634 9.16659 6.99967C9.16659 6.08301 8.41659 5.33301 7.49992 5.33301ZM7.49992 10.333C6.58325 10.333 5.83325 11.083 5.83325 11.9997C5.83325 12.9163 6.58325 13.6663 7.49992 13.6663C8.41659 13.6663 9.16659 12.9163 9.16659 11.9997C9.16659 11.083 8.41659 10.333 7.49992 10.333Z"
        fill="#636972"
      />
    </svg>
  );
};