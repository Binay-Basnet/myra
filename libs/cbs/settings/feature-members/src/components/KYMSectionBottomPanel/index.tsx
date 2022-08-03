import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';

import { useAddNewFieldMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { AccordionPanel, Box, Button, Icon } from '@coop/shared/ui';

import {
  KYMFieldParentEnum,
  KymFieldType,
  KYMMemberTypeEnum,
} from '../../types';

interface FieldType {
  id?: string;
  key?: string;
  label: string;
  component?: (props: { isExpanded: boolean }) => JSX.Element;
  children?: FieldType[];
}

interface IKYMBottomPanelProps {
  setItems?: React.Dispatch<React.SetStateAction<FieldType>>;
  kymType: KYMMemberTypeEnum;
  parent: KYMFieldParentEnum;
}

export const KYMBottomPanel = ({
  setItems,
  kymType,
  parent,
}: IKYMBottomPanelProps) => {
  const methods = useForm();

  const [hasNewField, setHasNewField] = useState(false);
  const { mutateAsync: addNewField } = useAddNewFieldMutation({
    onSuccess: (response) => {
      setHasNewField(false);
      methods.reset();
      const newField = response?.settings?.kymForm?.field?.add?.record;

      if (setItems && newField?.id && newField?.name) {
        setItems((prev) => ({
          ...prev,
          children: [
            ...(prev.children ?? []),
            {
              id: newField?.id,
              label: newField.name.local,
            },
          ],
        }));
      }
    },
  });

  const clickHandler = () => {
    setHasNewField(true);
  };

  return (
    <>
      {hasNewField && (
        <FormProvider {...methods}>
          <Box
            as="form"
            display="flex"
            alignItems="center"
            gap="s16"
            p="s12"
            onSubmit={async (e) => {
              e.preventDefault();

              await addNewField({
                data: {
                  name: methods.getValues()['name'],
                  enabled: true,
                  kymType: kymType,
                  hasOtherField: false,
                  fieldType: KymFieldType.Group,
                  parent,
                },
              });
            }}
          >
            <FormInput placeholder="Name of Field" name="name" />
            <Icon
              onClick={() => {
                setHasNewField(false);
              }}
              as={IoClose}
              size="md"
              color="gray.500"
              cursor="pointer"
              _hover={{ color: 'gray.800' }}
            />
          </Box>
        </FormProvider>
      )}
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
        </Box>
      </AccordionPanel>
    </>
  );
};
