import React, { useEffect, useState } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { FormProvider, useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import { FormInput, FormSelect, FormSwitch } from '@coop/myra/components';
import {
  Field_Types,
  KymField,
  KymOption,
  useAddKymOptionMutation,
} from '@coop/shared/data-access';
import { Box, Icon, Text } from '@coop/shared/ui';

interface IKYMSingleItemProps {
  item: KymOption;
  field: KymField;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

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

const GROUPED_FIELD_SELECT = [
  {
    label: 'Amount',
    value: Field_Types.Amount,
  },

  {
    label: 'Date',
    value: Field_Types.Date,
  },
  {
    label: 'District',
    value: Field_Types.District,
  },
  {
    label: 'Email',
    value: Field_Types.Email,
  },
  {
    label: 'Local Level',
    value: Field_Types.LocalLevel,
  },

  {
    label: 'Number Input',
    value: Field_Types.NumberInput,
  },
  {
    label: 'Phone Number',
    value: Field_Types.PhoneNumber,
  },
  {
    label: 'Province',
    value: Field_Types.Province,
  },

  {
    label: 'Text Box',
    value: Field_Types.TextBox,
  },
  {
    label: 'Text Input',
    value: Field_Types.TextInput,
  },
];

const UPLOAD_FIELD_SELECT = [
  {
    label: 'Single',
    value: Field_Types.Single,
  },
  {
    label: 'Multiple',
    value: Field_Types.Multiple,
  },
];

export const KYMSingleItem = ({
  item,
  dragHandleProps,
  field,
}: IKYMSingleItemProps) => {
  const [isEditable, setIsEditable] = useState(false);

  const { mutateAsync: kymOptionUpdate } = useAddKymOptionMutation();

  const methods = useForm<{
    enabled: boolean;
    name: string;
    fieldType?: Field_Types | null;
  }>({
    defaultValues: {
      enabled: item.enabled,
      name: item.name,
      fieldType: item.fieldType,
    },
  });

  const onSubmit = debounce(async () => {
    await kymOptionUpdate({
      fieldId: field.id,
      optionId: item.id,
      optionEnabled: methods.getValues().enabled,
      optionName: methods.getValues().name,
      optionFieldType: methods.getValues().fieldType,
    });
  }, 800);

  console.log(methods.getValues().fieldType);

  useEffect(() => {
    methods.getValues().name === '' && setIsEditable(true);
  }, []);

  useEffect(() => {
    // @ts-ignore
    const subscription = methods.watch(methods.handleSubmit(onSubmit));
    // @ts-ignore
    return () => subscription.unsubscribe();
  }, [methods, methods.handleSubmit, methods.watch]);

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
          e.preventDefault();
          setIsEditable(false);
        }}
      >
        {methods.getValues().name !== '' && (
          <Box {...dragHandleProps}>
            <Icon size="md" as={GRID2X3} />
          </Box>
        )}

        {methods.getValues().name !== '' && (
          <FormSwitch name="enabled" size="md" />
        )}

        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="s8"
        >
          <>
            <Box width={field.fieldType !== 'GROUP' ? '100%' : '66%'}>
              {isEditable || methods.getValues().name === '' ? (
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

            <Box
              width={
                field.fieldType === 'GROUP' || field.fieldType === 'UPLOAD'
                  ? '33%'
                  : '0%'
              }
              mr="s16"
            >
              {field.fieldType !== 'GROUP' &&
              field.fieldType !== 'UPLOAD' ? null : isEditable ||
                methods.getValues().name === '' ||
                !methods.getValues().fieldType ? (
                <FormSelect
                  form="fieldType"
                  name="fieldType"
                  options={
                    field.fieldType === 'GROUP'
                      ? GROUPED_FIELD_SELECT
                      : UPLOAD_FIELD_SELECT
                  }
                />
              ) : (
                <Text
                  onClick={() => setIsEditable(true)}
                  fontSize="r1"
                  fontWeight="400"
                  color={'gray.800'}
                  textAlign="right"
                >
                  <em>{methods.getValues().fieldType}</em>
                </Text>
              )}
            </Box>
          </>
        </Box>
      </Box>
    </FormProvider>
  );
};
