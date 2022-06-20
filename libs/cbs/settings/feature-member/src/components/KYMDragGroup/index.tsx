import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { IoClose } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';
import { debounce } from 'lodash';

import {
  Field_Types,
  KymOption,
  useAddFileSizeMutation,
  useAddKymOptionMutation,
  useArrangeKymFieldMutation,
  useDeleteKymFieldMutation,
  useGetKymIndItemDetailsQuery,
  useToggleOtherOptionMutation,
} from '@coop/shared/data-access';
import {
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Icon,
  Text,
  TextInput,
} from '@coop/shared/ui';

import { KYMSingleItem } from '../KYMSingleItem';

interface IKYMDraggableItemProps {
  fieldName: string;
  isExpanded: boolean;
}

export const KYMDragGroup = ({
  fieldName,
  isExpanded,
}: IKYMDraggableItemProps) => {
  const [fieldItems, setFieldItems] = useState<KymOption[]>([]);
  const [hasOtherField, setHasOtherField] = useState(false);

  const { mutateAsync: kymOptionDelete } = useDeleteKymFieldMutation();
  const { mutateAsync: kymOptionArrange } = useArrangeKymFieldMutation();
  const { mutateAsync: toggleOtherOption } = useToggleOtherOptionMutation();
  const { mutateAsync: addFileSize } = useAddFileSizeMutation();

  const { mutateAsync, isLoading: addLoading } = useAddKymOptionMutation({
    onSuccess: (response) => {
      const option =
        response.settings.general?.KYM?.individual.option.update.record;

      option && setFieldItems((prev) => [...prev, option]);
    },
  });

  const { isLoading, data } = useGetKymIndItemDetailsQuery(
    {
      name: fieldName === 'identification_documents' ? null : fieldName,
      isIdentificationDoc: fieldName === 'identification_documents',
    },
    {
      enabled: isExpanded,
      onSuccess: (response) => {
        const field =
          response?.settings?.general?.KYM?.individual?.field?.list?.data?.[0];

        if (field?.options) {
          setFieldItems(field.options);
          setHasOtherField(field.hasOtherField);
        }
      },
    }
  );

  const field =
    data?.settings?.general?.KYM?.individual?.field?.list?.data?.[0];

  const handleDragEnd = async (result: DropResult) => {
    const items = Array.from(fieldItems);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setFieldItems(items);
      await kymOptionArrange({
        optionId: reorderedItem.id,
        from: result.source.index,
        to: result.destination.index,
      });
    }
  };

  if (isLoading) {
    return (
      <AccordionPanel pb={0} display="flex" flexDirection="column" gap="s16">
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
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
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
                          <KYMSingleItem
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
                              await kymOptionDelete({
                                optionId: item.id,
                              });
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
                  optionEnabled: true,
                  optionFieldType:
                    field.fieldType === 'GROUP' ? Field_Types.TextInput : null,
                }));
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
