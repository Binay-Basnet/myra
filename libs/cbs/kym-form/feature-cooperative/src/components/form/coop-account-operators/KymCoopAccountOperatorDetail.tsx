import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AddOperator } from '../../accordion-component/KymCoopAccountOperator';

export const KymCoopAccountOperatorDetail = ({ watch, control }) => {
  const { t } = useTranslation();
  const {
    fields: accountFields,
    append: accountAppend,
    remove: accountRemove,
  } = useFieldArray({ control, name: 'accountOperatorsDetails' });
  return (
    <GroupContainer id="Account Operator Detail" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopDetailsofAccountOperators']}
      </Text>
      {accountFields.map((item, index) => {
        return (
          <Box key={item.id} display="flex" flexDirection={'column'} gap="s16">
            <AddOperator
              watch={watch}
              index={index}
              control={control}
              removeAccount={() => accountRemove(index)}
            />
          </Box>
        );
      })}
      <Button
        id="accountOperatorButton"
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          accountAppend({});
        }}
      >
        {t['kymCoopAddOperator']}
      </Button>
    </GroupContainer>
  );
};
