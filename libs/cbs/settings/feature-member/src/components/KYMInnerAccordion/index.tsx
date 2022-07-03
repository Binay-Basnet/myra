import React, { useEffect, useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { FormProvider, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';
import { debounce } from 'lodash';

import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  Kym_Field_Type,
  Kym_Option_Field_Type as Field_Types,
  Kym_Option_Field_Type,
  KymField,
  KymMemberTypesEnum,
  KymOption,
  useAddFileSizeMutation,
  useArrangeKymFieldMutation,
  useDeleteKymFieldMutation,
  useGetKymSettingsFieldsQuery,
  useToggleOtherOptionMutation,
  useUpsertKymOptionMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import {
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Icon,
  Text,
  TextInput,
} from '@coop/shared/ui';

import { KYMDragGroup } from '../KYMDragGroup';
import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';
import { GROUPED_FIELD_OPTIONS } from '../../constants/GROUPED_FIELD_OPTIONS';
import { UPLOAD_FIELD_OPTIONS } from '../../constants/UPLOAD_FIELD_OPTIONS';

interface IKYMInnerAccordionProps {
  subField: {
    id?: string;
    customId?: KYMOptionEnum;
    key?: string;
    label: string;
    component?: (props: any) => JSX.Element;
  };
  index: number;
  kymType: KymMemberTypesEnum;
}

export const KYMInnerAccordion = ({
  subField,
  index,
  kymType,
}: IKYMInnerAccordionProps) => {
  return (
    <AccordionItem key={`${subField}${index}`}>
      {({ isExpanded }) => (
        <>
          <KYMSettingsAccordionBtn
            isExpanded={isExpanded}
            title={subField.label}
          />
          {subField.component ? (
            subField.component({ isExpanded })
          ) : subField.customId ? (
            <KYMSettingsDragField
              kymType={kymType}
              customId={subField.customId}
              isExpanded={isExpanded}
            />
          ) : subField.id ? (
            <KYMDragGroup isExpanded={isExpanded} fieldId={subField.id} />
          ) : (
            <KYMDragGroup isExpanded={isExpanded} fieldName={subField.key} />
          )}
        </>
      )}
    </AccordionItem>
  );
};

interface KYMSettingDragGroupProps {
  customId: KYMOptionEnum;
  isExpanded: boolean;
  kymType: KymMemberTypesEnum;
}

export const KYMSettingsDragField = ({
  customId,
  isExpanded,
  kymType,
}: KYMSettingDragGroupProps) => {
  const [hasNewField, setHasNewField] = useState(false);
  const [fieldOptions, setFieldOptions] = useState<Partial<KymOption>[]>([]);
  const [hasOtherField, setHasOtherField] = useState(false);

  const { mutateAsync: kymOptionDelete } = useDeleteKymFieldMutation();
  const { mutateAsync: kymOptionArrange } = useArrangeKymFieldMutation();
  const { mutateAsync: toggleOtherOption } = useToggleOtherOptionMutation();
  const { mutateAsync: addFileSize } = useAddFileSizeMutation();

  const { data, isLoading } = useGetKymSettingsFieldsQuery(
    { filter: { customId, kymType } },
    {
      enabled: isExpanded,
      onSuccess: (response) => {
        const field = response?.settings?.kymForm.field?.list?.data?.[0];

        if (field?.options) {
          setFieldOptions(field.options);
          setHasOtherField(field.hasOtherField);
        }
      },
    }
  );

  const methods = useForm();
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
          id: 'loading-id',
          fieldType: fieldType ?? Kym_Option_Field_Type.TextInput,
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

  useEffect(() => {
    if (hasNewField) {
      methods.setFocus('name');
    }
  }, [hasNewField]);

  const field = useMemo(
    () => data?.settings?.kymForm.field?.list?.data?.[0] as KymField,
    [isLoading]
  );

  if (isLoading) {
    return (
      <AccordionPanel pb={0} display="flex" flexDirection="column" gap="s16">
        <Skeleton height="40px" borderRadius="br1" />
        <Skeleton height="40px" borderRadius="br1" />
        <Skeleton height="40px" borderRadius="br1" />
      </AccordionPanel>
    );
  }

  const handleDragEnd = async (result: DropResult) => {
    const items = Array.from(fieldOptions);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setFieldOptions(items);
      if (reorderedItem.id) {
        await kymOptionArrange({
          optionId: reorderedItem.id,
          to: result.destination.index,
        });
      }
    }
  };

  return (
    <>
      <AccordionPanel pb={'0'}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={customId}>
            {(provided) => (
              <Box
                display="flex"
                flexDirection="column"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fieldOptions.map((option, index) => {
                  return !field ? (
                    <div>This option mustn't be here!!</div>
                  ) : (
                    <Draggable
                      key={option.id}
                      draggableId={option.id ?? 'no-id'}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          alignItems="center"
                          my="s8"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <KYMSettingsDragOption
                            option={option}
                            field={field}
                            dragHandleProps={provided.dragHandleProps}
                          />
                          <Icon
                            onClick={async () => {
                              setFieldOptions((prev) =>
                                prev.filter(
                                  (fieldItem) => fieldItem.id !== option.id
                                )
                              );
                              if (option.id) {
                                await kymOptionDelete({
                                  optionId: option.id,
                                });
                              }
                            }}
                            as={IoClose}
                            size="md"
                            color="gray.500"
                            cursor="pointer"
                            _hover={{ color: 'gray.800' }}
                          />
                        </Box>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        {hasOtherField && (
          <Text
            fontSize="r1"
            my="s12"
            ml="82px"
            fontWeight="400"
            color={'gray.800'}
          >
            <em>Other</em>
          </Text>
        )}

        {hasNewField ? (
          <FormProvider {...methods}>
            <Box
              as="form"
              display="flex"
              gap="s16"
              onSubmit={methods.handleSubmit(async (data) => {
                await addNewOption({
                  fieldId: field.id,
                  option: {
                    name: data['name'],
                    enabled: true,
                    fieldType: data['fieldType'],
                  },
                });
              })}
            >
              <Box
                width={
                  field.fieldType !== Kym_Field_Type.Group ? '100%' : '66%'
                }
              >
                <FormInput
                  name="name"
                  placeholder="Name of Field"
                  rules={{ required: "This field shouldn't be empty" }}
                />
              </Box>

              <Box
                display={
                  field.fieldType === Kym_Field_Type.Group ||
                  field.fieldType === Kym_Field_Type.Upload
                    ? 'block'
                    : 'none'
                }
                width={
                  field.fieldType === Kym_Field_Type.Group ||
                  field.fieldType === Kym_Field_Type.Upload
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
            </Box>
          </FormProvider>
        ) : null}
      </AccordionPanel>

      <AccordionPanel p="0" borderTop={'1px'} borderTopColor={'border.layout'}>
        <Box
          display="flex"
          alignItems={'center'}
          justifyContent="space-between"
          h="60px"
          px="s16"
        >
          <Button
            variant="ghost"
            size={'md'}
            isDisabled={hasNewField}
            shade="primary"
            leftIcon={<AddIcon />}
            onClick={() => {
              setHasNewField(true);
            }}
            _hover={{ bg: 'transparent' }}
          >
            Add New Option
          </Button>
          {field?.fieldType !== 'UPLOAD' && (
            <Checkbox
              children="Show “Other” option"
              isChecked={hasOtherField}
              onChange={async (e) => {
                setHasOtherField(e.target.checked);
                field &&
                  (await toggleOtherOption({
                    groupId: field.id,
                    hasOtherField: e.target.checked,
                  }));
              }}
            />
          )}
        </Box>
      </AccordionPanel>

      {field?.fieldType === 'UPLOAD' && (
        <AccordionPanel
          p="0"
          borderTop={'1px'}
          borderTopColor={'border.layout'}
        >
          <Box
            display="flex"
            alignItems={'center'}
            justifyContent="space-between"
            p="s16"
          >
            <Box>
              <Text fontSize="r1" color="gray.800" mb="s4">
                Max File Upload Size (in KB)
              </Text>
              <TextInput
                defaultValue={field?.maxSize ?? undefined}
                onChange={debounce(async (e) => {
                  await addFileSize({
                    fieldId: field.id,
                    maxSize: +e.target.value,
                  });
                }, 800)}
                placeholder="File Size"
              />
            </Box>
          </Box>
        </AccordionPanel>
      )}
    </>
  );
};

interface IKYMSettingsDragOptionProps {
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
  option: Partial<KymOption>;
  field: Partial<KymField>;
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

export const KYMSettingsDragOption = ({
  dragHandleProps,
  option,
  field,
}: IKYMSettingsDragOptionProps) => {
  const [isEditable, setIsEditable] = useState(!option.id);

  const methods = useForm<{
    enabled: boolean;
    name: string;
    fieldType?: Field_Types | null;
  }>({
    defaultValues: {
      enabled: option.enabled,
      name: option?.name?.local ?? '',
      fieldType: option.fieldType,
    },
  });

  const { mutateAsync: updateOption } = useUpsertKymOptionMutation();

  useEffect(() => {
    if (
      (field.fieldType === Kym_Field_Type.Group &&
        !methods.getValues().fieldType) ||
      methods.getValues().name === ''
    ) {
      setIsEditable(true);
    }
  }, []);

  useEffect(() => {
    const subscription = methods.watch(
      debounce(async (data) => {
        if (field.id && data.name) {
          await updateOption({
            fieldId: field.id,
            option: {
              id: option.id,
              name: data.name,
              enabled: data.enabled,
              fieldType: data.fieldType,
            },
          });
        }
      }, 800)
    );

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
          setIsEditable(false);
          e.preventDefault();
        }}
      >
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
          <>
            <Box width={field.fieldType !== 'GROUP' ? '100%' : '66%'}>
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
                      ? GROUPED_FIELD_OPTIONS
                      : UPLOAD_FIELD_OPTIONS
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
