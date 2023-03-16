import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { IoClose } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';

import { AccordionPanel, Box, Button, Icon } from '@myra-ui';

import {
  FormCategory,
  FormField,
  FormSection,
  useDeleteFieldMutation,
  useMoveFieldMutation,
} from '@coop/cbs/data-access';

import { KYMFileSize } from '../KYMFileSize';
import { KYMSectionNewOption } from '../KYMSectionNewOption';
import { KYMSettingsSectionOption } from '../KYMSettingsSectionOption';

interface KYMSettingsFormSectionProps {
  section: FormSection;
  kymType: FormCategory;
}

export const KYMSettingsFormSection = ({ section, kymType }: KYMSettingsFormSectionProps) => {
  const [hasNewField, setHasNewField] = useState(false);
  const [fieldOptions, setFieldOptions] = useState<Partial<FormField>[]>(section?.fields ?? []);

  const { mutateAsync: deleteOption } = useDeleteFieldMutation();
  const { mutateAsync: moveOption } = useMoveFieldMutation();

  const handleDragEnd = async (result: DropResult) => {
    const items = Array.from(fieldOptions);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setFieldOptions(items);
      if (reorderedItem.id) {
        await moveOption({
          fieldId: reorderedItem.id,
          to: result.destination.index,
        });
      }
    }
  };

  return (
    <>
      <AccordionPanel p={fieldOptions.length === 0 && !hasNewField ? '0' : 'auto'} pb="0">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={section?.id ?? 'no-id'}>
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
                        <KYMSettingsSectionOption
                          kymType={kymType}
                          section={section}
                          dragHandleProps={provide.dragHandleProps}
                          option={option}
                        />

                        {!option.isDefault && (
                          <Icon
                            onClick={async () => {
                              setFieldOptions((prev) =>
                                prev.filter((fieldItem) => fieldItem.id !== option.id)
                              );
                              if (option.id) {
                                await deleteOption({
                                  fieldId: option.id,
                                });
                              }
                            }}
                            ml="s16"
                            as={IoClose}
                            size="md"
                            color="gray.500"
                            cursor="pointer"
                            _hover={{ color: 'gray.800' }}
                          />
                        )}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        <KYMSectionNewOption
          kymType={kymType}
          section={section}
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
        </Box>
      </AccordionPanel>
      <KYMFileSize section={section} />
    </>
  );
};
