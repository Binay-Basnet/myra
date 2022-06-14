import React, { useMemo, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Skeleton } from '@chakra-ui/react';

import {
  KymOption,
  useGetKymIndItemDetailsQuery,
} from '@coop/shared/data-access';
import { AccordionPanel, Box } from '@coop/shared/ui';

import { KYMBottomPanel } from '../KYMBottomPanel';
import { KYMGroupItem } from '../KYMGroupItem';
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

  const { isLoading, data } = useGetKymIndItemDetailsQuery(
    {
      name: fieldName === 'identification_documents' ? null : fieldName,
      isIdentificationDoc: fieldName === 'identification_documents',
    },
    {
      enabled: isExpanded,
      onSuccess: (response) => {
        setFieldItems(
          response?.settings?.general?.KYM?.individual?.field?.list?.data?.[0]
            ?.data ?? []
        );
      },
    }
  );

  const fieldType = useMemo(
    () =>
      data?.settings?.general?.KYM?.individual?.field?.list?.data?.[0]
        ?.fieldType ?? 'SINGLE',
    [data?.settings?.general?.KYM?.individual?.field?.list?.data]
  );

  const handleDragEnd = (result: DropResult) => {
    const items = Array.from(fieldItems);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setFieldItems(items);
    }
  };

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
                gap="s16"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {fieldItems.map((item, index) => {
                  if (fieldType === 'GROUP') {
                    return <KYMGroupItem item={item} index={index} />;
                  } else {
                    return <KYMSingleItem item={item} index={index} />;
                  }
                })}

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </AccordionPanel>

      <KYMBottomPanel
        setItems={() =>
          setFieldItems((prev) => [
            ...prev,
            {
              id: '',
              name: '',
              enabled: false,
            },
          ])
        }
      />
    </>
  );
};
