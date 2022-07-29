import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { KymCooperativeFormInput } from '@coop/shared/data-access';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AddOperator } from '../../accordion-component/KymCoopAccountOperator';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopAccountOperatorDetail = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  const { control, watch } = methods;
  const {
    fields: accountFields,
    append: accountAppend,
    remove: accountRemove,
    // TODO Remove this
  } = useFieldArray<any>({
    control,
    name: 'accountOperatorsDetails',
  });
  return (
    <GroupContainer
      id="kymCoopAccAccountOperatorDetail"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopDetailsofAccountOperators']}
      </Text>
      {accountFields.map((item, index) => {
        return (
          <Box key={item.id} display="flex" flexDirection={'column'}>
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
