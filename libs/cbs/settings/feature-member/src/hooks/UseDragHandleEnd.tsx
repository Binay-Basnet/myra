import React from 'react';
import { DropResult } from 'react-beautiful-dnd';

import { useArrangeKymFieldMutation } from '@coop/shared/data-access';

import { KymOption } from '../types';

interface UseDragHandleEndProps {
  fieldOptions: Partial<KymOption>[];
  setFieldOptions: React.Dispatch<React.SetStateAction<Partial<KymOption>[]>>;
}

export const useDragHandleEnd = ({
  fieldOptions,
  setFieldOptions,
}: UseDragHandleEndProps) => {
  const { mutateAsync: kymOptionArrange } = useArrangeKymFieldMutation();

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

  return { handleDragEnd };
};
