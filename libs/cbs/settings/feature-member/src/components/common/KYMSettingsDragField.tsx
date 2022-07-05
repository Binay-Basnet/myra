import React, { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AddIcon } from '@chakra-ui/icons';

import {
  useGetKymSettingsFieldsQuery,
  useToggleOtherOptionMutation,
} from '@coop/shared/data-access';
import { AccordionPanel, Box, Button, Checkbox } from '@coop/shared/ui';

import { FileSizeInput } from './FileSizeInput';
import { KYMLoadingState } from './KYMLoadingState';
import { KYMNewOptionInput } from './KYMNewOptionInput';
import { KYMRemoveIcon } from './KYMRemoveIcon';
import { KYMSettingsDragOption } from './KYMSettingsDragOption';
import { OtherFieldText } from './OtherFieldText';
import { useDragHandleEnd } from '../../hooks/UseDragHandleEnd';
import {
  KYMCustomFieldEnum,
  KymField,
  KYMMemberTypeEnum,
  KymOption,
} from '../../types';

interface KYMSettingDragGroupProps {
  id?: string;
  customId?: KYMCustomFieldEnum;
  customField?: KymField;
  isExpanded: boolean;
  kymType: KYMMemberTypeEnum;
}

export const KYMSettingsDragField = ({
  id,
  customId,
  isExpanded,
  kymType,
  customField,
}: KYMSettingDragGroupProps) => {
  const [hasNewField, setHasNewField] = useState(false);
  const [fieldOptions, setFieldOptions] = useState<Partial<KymOption>[]>([]);
  const [hasOtherField, setHasOtherField] = useState(false);

  const { mutateAsync: toggleOtherOption } = useToggleOtherOptionMutation();

  const { data, isLoading } = useGetKymSettingsFieldsQuery(
    { filter: { customId, kymType, id } },
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

  const field = useMemo(
    () => data?.settings?.kymForm.field?.list?.data?.[0] as KymField,
    [isLoading]
  );

  const { handleDragEnd } = useDragHandleEnd({ fieldOptions, setFieldOptions });

  useEffect(() => {
    if (fieldOptions.length === 0 && data && field?.options) {
      setFieldOptions(field?.options);
      setHasOtherField(field.hasOtherField);
    }
  }, []);

  if (isLoading) {
    return <KYMLoadingState />;
  }

  return (
    <>
      <AccordionPanel pb={'0'}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId={customId ?? id ?? ''}>
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
                            field={customField ?? field}
                            dragHandleProps={provided.dragHandleProps}
                          />
                          <KYMRemoveIcon
                            setFieldOptions={setFieldOptions}
                            optionId={option.id}
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

        <OtherFieldText hasOtherField={hasOtherField} />

        <KYMNewOptionInput
          field={customField ?? field}
          hasNewField={hasNewField}
          setFieldOptions={setFieldOptions}
          setHasNewField={setHasNewField}
        />
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

      <FileSizeInput field={field} />
    </>
  );
};
