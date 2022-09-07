// import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import { LoanGeneralSettings } from '@coop/cbs/data-access';
import { Box, Collapse, Icon, Switch, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureLoanProductsProps {}

const GRID2X3 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
    >
      <path
        d="M4.16659 11.9997C4.16659 12.9163 3.41659 13.6663 2.49992 13.6663C1.58325 13.6663 0.833252 12.9163 0.833252 11.9997C0.833252 11.083 1.58325 10.333 2.49992 10.333C3.41659 10.333 4.16659 11.083 4.16659 11.9997ZM2.49992 5.33301C1.58325 5.33301 0.833252 6.08301 0.833252 6.99967C0.833252 7.91634 1.58325 8.66634 2.49992 8.66634C3.41659 8.66634 4.16659 7.91634 4.16659 6.99967C4.16659 6.08301 3.41659 5.33301 2.49992 5.33301ZM2.49992 0.333008C1.58325 0.333008 0.833252 1.08301 0.833252 1.99967C0.833252 2.91634 1.58325 3.66634 2.49992 3.66634C3.41659 3.66634 4.16659 2.91634 4.16659 1.99967C4.16659 1.08301 3.41659 0.333008 2.49992 0.333008ZM7.49992 3.66634C8.41659 3.66634 9.16659 2.91634 9.16659 1.99967C9.16659 1.08301 8.41659 0.333008 7.49992 0.333008C6.58325 0.333008 5.83325 1.08301 5.83325 1.99967C5.83325 2.91634 6.58325 3.66634 7.49992 3.66634ZM7.49992 5.33301C6.58325 5.33301 5.83325 6.08301 5.83325 6.99967C5.83325 7.91634 6.58325 8.66634 7.49992 8.66634C8.41659 8.66634 9.16659 7.91634 9.16659 6.99967C9.16659 6.08301 8.41659 5.33301 7.49992 5.33301ZM7.49992 10.333C6.58325 10.333 5.83325 11.083 5.83325 11.9997C5.83325 12.9163 6.58325 13.6663 7.49992 13.6663C8.41659 13.6663 9.16659 12.9163 9.16659 11.9997C9.16659 11.083 8.41659 10.333 7.49992 10.333Z"
        fill="#636972"
      />
    </svg>
  );
};

interface ICollateralProps {
  loanGeneralData?: LoanGeneralSettings | null;
}
export const AcceptedCollateral = (props: ICollateralProps) => {
  const { loanGeneralData } = props;
  const { t } = useTranslation();
  const [data, setData] = useState(loanGeneralData?.collateralList);
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    setData(loanGeneralData?.collateralList);
  }, [loanGeneralData?.collateralList]);

  const handleOnDragEnd = async (result: DropResult) => {
    const items = Array.from(data ?? []);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setData(items);
      // if (reorderedItem.id) {
      //   await moveOption({
      //     fieldId: reorderedItem.id,
      //     to: result.destination.index,
      //   });
      // }
    }
  };
  return (
    <Box
      display="flex"
      flexDirection={'column'}
      gap="s16"
      margin="s4"
      border="1px"
      borderColor="gray.200"
      borderRadius={5}
      mb="s48"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="s4"
        py="s20"
        px="s12"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Text fontSize="r1" fontWeight="500">
          {t['settingsLoanAccepted']}
        </Text>
        {isOpen ? (
          <Icon
            as={RiArrowUpSLine}
            color="gray.600"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <Icon
            as={RiArrowDownSLine}
            color="gray.600"
            onClick={() => setIsOpen(true)}
          />
        )}
      </Box>
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="collateral-list">
            {(provided) => (
              <Box
                display="flex"
                flexDir="column"
                gap="s36"
                py="s20"
                px="s12"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data?.map(
                  (
                    item: {
                      name?: string | null;
                      enabled?: boolean | null;
                    } | null,
                    index: number
                  ) => (
                    <Draggable
                      key={item?.name}
                      draggableId={item?.name || ''}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          display="flex"
                          gap="s20"
                          alignItems="center"
                          justifyContent="space-between"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Box display="flex" gap="s20" alignItems="center">
                            <Icon as={GRID2X3} />
                            <Switch size="sm" name={item?.name || ''} />
                            <Text fontSize="r1">{item?.name}</Text>
                          </Box>
                          <Icon size="sm" color="gray.600" as={IoMdClose} />
                        </Box>
                      )}
                    </Draggable>
                  )
                )}

                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <Box borderTop="1px" borderColor="gray.200" p="s16">
          <Box display="flex" gap={2} alignItems="center">
            <Icon size="sm" color="gray.600" as={AiOutlinePlus} />
            <Text fontSize="r1">Add New Option</Text>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
