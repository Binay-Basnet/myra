import React, { useId, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { IoClose } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';

import {
  Field_Types,
  KymOption,
  useAddFileSizeMutation,
  useAddKymOptionMutation,
  useArrangeKymFieldMutation,
  useDeleteKymFieldMutation,
  useToggleOtherOptionMutation,
} from '@coop/shared/data-access';
import {
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Icon,
  Text,
} from '@coop/shared/ui';

import { KYMSingleItem } from '../KYMSingleItem';

interface IKYMDraggableItemProps {
  fieldOption: any;
  field: any;
  isExpanded: boolean;
}

export const KYMCustomDragGroup = ({
  fieldOption,
  field,
  isExpanded,
}: IKYMDraggableItemProps) => {
  const id = useId();

  const [fieldItems, setFieldItems] = useState<Partial<KymOption>[]>(
    fieldOption ?? []
  );
  const [hasOtherField, setHasOtherField] = useState(field.hasOtherField);

  const { mutateAsync: kymOptionDelete } = useDeleteKymFieldMutation();
  const { mutateAsync: kymOptionArrange } = useArrangeKymFieldMutation();
  const { mutateAsync: toggleOtherOption } = useToggleOtherOptionMutation();
  const { mutateAsync: addFileSize } = useAddFileSizeMutation();

  const { mutateAsync, isLoading: addLoading } = useAddKymOptionMutation({
    onSuccess: (response) => {
      const option =
        response.settings.general?.KYM?.individual.option.update.record;

      option && setFieldItems((prev) => (prev ? [...prev, option] : [option]));
    },
  });

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

  return (
    <Box>
      <AccordionPanel p="0">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="gender">
            {(provided) => (
              <Box
                display="flex"
                flexDirection="column"
                borderTop={fieldItems && fieldItems.length ? '1px' : undefined}
                borderTopColor={
                  fieldItems && fieldItems.length ? 'border.layout' : undefined
                }
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fieldItems?.map((item, index) => {
                  return field ? (
                    <Draggable key={item?.id} draggableId={id} index={index}>
                      {(provided) => (
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          alignItems="center"
                          my="s8"
                          px="s12"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <KYMSingleItem
                            field={field}
                            setFieldItems={setFieldItems}
                            item={item}
                            dragHandleProps={provided.dragHandleProps}
                          />
                          <Icon
                            onClick={async () => {
                              setFieldItems((prev) =>
                                prev.filter(
                                  (fieldItem) => fieldItem?.id !== item?.id
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
                    ml="94px"
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
              setFieldItems((prev) => [
                ...prev,
                {
                  enabled: true,
                  optionName: '',
                  optionFieldType:
                    field.fieldType === 'GROUP' ? Field_Types.TextInput : null,
                },
              ]);
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
    </Box>
  );
};
