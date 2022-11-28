import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { IoClose } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';

import {
  FormField,
  FormOption,
  useDeleteOptionMutation,
  useMoveOptionMutation,
  useToggleFieldOtherOptionMutation,
} from '@coop/cbs/data-access';
import { AccordionPanel, Box, Button, Checkbox, Icon, Text } from '@myra-ui';

import { KYMFormFieldNewOption } from '../KYMFormFieldNewOption';
import { KYMSettingsOption } from '../KYMSettingsOption';

interface KYMSettingsFormFieldProps {
  fields: FormField;
}

export const KYMSettingsFormField = ({ fields }: KYMSettingsFormFieldProps) => {
  const [hasNewField, setHasNewField] = useState(false);
  const [hasOtherField, setHasOtherField] = useState(!!fields?.hasOtherField);
  const [fieldOptions, setFieldOptions] = useState<Partial<FormOption>[]>(fields?.options ?? []);

  const { mutateAsync: deleteOption } = useDeleteOptionMutation();
  const { mutateAsync: moveOption } = useMoveOptionMutation();
  const { mutateAsync: toggleOtherOption } = useToggleFieldOtherOptionMutation();

  const handleDragEnd = async (result: DropResult) => {
    const items = Array.from(fieldOptions);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setFieldOptions(items);
      if (reorderedItem.id) {
        await moveOption({
          optionId: reorderedItem.id,
          to: result.destination.index,
        });
      }
    }
  };

  return (
    <>
      <AccordionPanel p={fieldOptions.length === 0 && !hasNewField ? '0' : 'auto'} pb="0">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={fields?.id ?? 'no-id'}>
            {(provided) => (
              <Box
                display="flex"
                flexDirection="column"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fieldOptions.map((option, index) => (
                  <Draggable key={option?.id} draggableId={option?.id ?? 'no-id'} index={index}>
                    {(provide) => (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        my="s8"
                        ref={provide.innerRef}
                        {...provide.draggableProps}
                      >
                        <KYMSettingsOption
                          field={fields}
                          dragHandleProps={provide.dragHandleProps}
                          option={option}
                        />

                        <Icon
                          onClick={async () => {
                            setFieldOptions((prev) =>
                              prev.filter((fieldItem) => fieldItem.id !== option.id)
                            );
                            if (option.id) {
                              await deleteOption({
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
                ))}

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        {hasOtherField && (
          <Text fontSize="r1" my="s12" ml="82px" fontWeight="400" color="gray.800">
            <em>Other</em>
          </Text>
        )}

        <KYMFormFieldNewOption
          field={fields}
          setFieldOptions={setFieldOptions}
          hasNewField={hasNewField}
          setHasNewField={setHasNewField}
        />
      </AccordionPanel>
      <AccordionPanel p="0" borderTop="1px" borderTopColor="border.layout">
        <Box display="flex" alignItems="center" justifyContent="space-between" h="60px" px="s16">
          <Button
            variant="ghost"
            size="md"
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

          <Checkbox
            children="Show “Other” option"
            isChecked={hasOtherField}
            onChange={async (e) => {
              setHasOtherField(e.target.checked);
              fields &&
                (await toggleOtherOption({
                  fieldId: fields.id,
                  hasOtherField: e.target.checked,
                }));
            }}
          />
        </Box>
      </AccordionPanel>
    </>
  );
};
