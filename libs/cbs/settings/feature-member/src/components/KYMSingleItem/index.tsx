import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IoClose } from 'react-icons/io5';

import { KymOption } from '@coop/shared/data-access';
import { Box, Icon } from '@coop/shared/ui';

import { KYMDragHandler } from '../KYMDragHandler';

interface IKYMSingleItemProps {
  item: KymOption;
  index: number;
}

export const KYMSingleItem = ({ item, index }: IKYMSingleItemProps) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems="center"
          h="s36"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <KYMDragHandler
            dragHandleProps={provided.dragHandleProps}
            item={item}
          />

          <Icon
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
};
