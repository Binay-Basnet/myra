import React, { useEffect, useId, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { FormProvider, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';

import {
  Field_Types,
  KymOption,
  useAddConditionFieldMutation,
  useAddKymOptionMutation,
  useArrangeKymFieldMutation,
  useDeleteKymFieldMutation,
  useGetKymIndItemDetailsQuery,
  useToggleOtherOptionMutation,
} from '@coop/shared/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import {
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Icon,
  Text,
} from '@coop/shared/ui';

import { KYMSingleItem } from './KYMSingleItem';

export const IncomeSourceDetailsAccComponent = ({
  isExpanded,
}: {
  isExpanded: boolean;
}) => {
  const id = useId();
  const [fieldItems, setFieldItems] = useState<Partial<KymOption>[]>([]);

  const [hasOtherField, setHasOtherField] = useState(false);

  const { mutateAsync: kymOptionDelete } = useDeleteKymFieldMutation();
  const { mutateAsync: kymOptionArrange } = useArrangeKymFieldMutation();
  const { mutateAsync: toggleOtherOption } = useToggleOtherOptionMutation();
  const { mutateAsync: addConditionOption } = useAddConditionFieldMutation();

  const { mutateAsync, isLoading: addLoading } = useAddKymOptionMutation({
    onSuccess: (response) => {
      const option =
        response.settings.general?.KYM?.individual.option.update.record;

      option && setFieldItems((prev) => [...prev, option]);
    },
  });

  const { isLoading, data } = useGetKymIndItemDetailsQuery(
    {
      name: 'income_source_details',
    },
    {
      enabled: isExpanded,
      onSuccess: (response) => {
        setFieldItems(
          response?.settings?.general?.KYM?.individual?.field?.list?.data?.[0]
            ?.options ?? []
        );
      },
    }
  );

  const { data: familyIncome } = useGetKymIndItemDetailsQuery(
    {
      name: 'family_income',
    },
    {
      enabled: isExpanded,
    }
  );

  const field =
    data?.settings?.general?.KYM?.individual?.field?.list?.data?.[0];

  const methods = useForm<any>({
    defaultValues: {
      dependsOn: field?.dependsOn,
    },
  });

  const { control, reset, getValues } = methods;
  const handleDragEnd = async (result: DropResult) => {
    const items = Array.from(fieldItems);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setFieldItems(items);
      if (reorderedItem?.id) {
        await kymOptionArrange({
          optionId: reorderedItem.id,
          from: result.source.index,
          to: result.destination.index,
        });
      }
    }
  };

  useEffect(() => {
    reset({ dependsOn: field?.dependsOn });
  }, [isLoading]);

  if (isLoading) {
    return (
      <AccordionPanel pb={0}>
        <Skeleton height="40px" borderRadius="br1" />
        <Skeleton height="40px" borderRadius="br1" />
      </AccordionPanel>
    );
  }

  return (
    <>
      <AccordionPanel pb={'0'}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="gender">
            {(provided) => (
              <Box
                display="flex"
                flexDirection="column"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fieldItems.map((item, index) => {
                  return field ? (
                    <Draggable key={item.id} draggableId={id} index={index}>
                      {(provided) => (
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          alignItems="center"
                          my="s8"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <KYMSingleItem
                            setFieldItems={setFieldItems}
                            field={field}
                            item={item}
                            dragHandleProps={provided.dragHandleProps}
                          />
                          <Icon
                            onClick={async () => {
                              setFieldItems((prev) =>
                                prev.filter(
                                  (fieldItem) => fieldItem.id !== item.id
                                )
                              );
                              if (item?.id) {
                                await kymOptionDelete({
                                  optionId: item.id,
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
                  ) : null;
                })}

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

                {addLoading ? (
                  <Skeleton height="40px" borderRadius="br1" />
                ) : null}

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
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
            shade="primary"
            leftIcon={<AddIcon />}
            onClick={async () => {
              field &&
                (await mutateAsync({
                  fieldId: field.id,
                  optionName: '',
                  optionEnabled: false,
                  optionFieldType:
                    field.fieldType === 'GROUP' ? Field_Types.TextInput : null,
                }));
            }}
            _hover={{ bg: 'transparent' }}
          >
            Add New Option
          </Button>

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
        </Box>
      </AccordionPanel>

      <AccordionPanel
        p="s16"
        borderTop={'1px'}
        borderTopColor={'border.layout'}
      >
        <Text fontSize="r1" fontWeight="500" pb="s16">
          Show this option for:
        </Text>

        <form
          onChange={async () => {
            const ids = methods.getValues().dependsOn;

            field &&
              (await addConditionOption({
                fieldId: field.id,
                dependsOn: ids,
              }));
          }}
        >
          <FormProvider {...methods}>
            <FormCheckboxGroup
              control={control}
              name="dependsOn"
              orientation="column"
              list={[
                ...(familyIncome?.settings?.general?.KYM?.individual?.field?.list?.data?.[0]?.options?.map(
                  (d) => ({ label: d.name.local, value: d.id })
                ) ?? []),
              ]}
            />
          </FormProvider>
        </form>
      </AccordionPanel>
    </>
  );
};
