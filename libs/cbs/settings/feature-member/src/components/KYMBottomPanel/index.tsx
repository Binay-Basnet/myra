import React from 'react';
import { AddIcon } from '@chakra-ui/icons';

import { AccordionPanel, Box, Button, Checkbox } from '@coop/shared/ui';

interface FieldType {
  id?: string;
  key?: string;
  label: string;
  component?: (props: { isExpanded: boolean }) => JSX.Element;
  children?: FieldType[];
}

interface IKYMBottomPanelProps {
  setItems?: React.Dispatch<React.SetStateAction<FieldType>>;
}

export const KYMBottomPanel = ({ setItems }: IKYMBottomPanelProps) => {
  const clickHandler = () => {
    if (setItems) {
      // CALL QUERYCLIENT.INVALIDATE_QUERIES TO REFRESH THE DATA AFTER ADDING NEW FIELD !!
      setItems((prev) => ({
        ...prev,
        children: [
          ...(prev.children ?? []),
          {
            key: 'custom_field',
            label: 'Custom Field',
          },
        ],
      }));
    }
  };

  return (
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
          onClick={clickHandler}
          _hover={{ bg: 'transparent' }}
        >
          Add New Option
        </Button>
        <Checkbox children="Show “Other” option" />
      </Box>
    </AccordionPanel>
  );
};
