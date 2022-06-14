import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IoClose } from 'react-icons/io5';
import { DragHandler } from 'libs/cbs/settings/feature-member/src/lib/KYMIndividualSettingsPage';

import { KymOption } from '@coop/shared/data-access';
import { Box, Icon, Text } from '@coop/shared/ui';

interface IKYMGroupItemProps {
  item: KymOption;
  index: number;
}

export const KYMGroupItem = ({ item, index }: IKYMGroupItemProps) => {
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
          <DragHandler dragHandleProps={provided.dragHandleProps} item={item} />

          <Box display="flex" alignItems="center" gap="s24">
            <Text fontSize="r1" fontWeight="400" color={'gray.800'} ml="s20">
              <em>{item?.fieldType?.replace(/_/g, ' ')}</em>
            </Text>
            <Icon as={IoClose} size="sm" />
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
