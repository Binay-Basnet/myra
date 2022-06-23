import { useState } from 'react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { Box, Checkbox, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const booleanList = [
  {
    label: 'Single',
    value: 'Single',
  },
  {
    label: 'Joint',
    value: 'Joint',
  },
];

export const AccountOperationInstitution = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  return (
    <GroupContainer
      id="Account Operation Instruction"
      scrollMarginTop={'200px'}
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsAccountOperationInstruction']}
      </Text>
      <Box display={'flex'} flexDirection="column" gap="s32" mt="-16px">
        <FormSwitchTab options={booleanList} name="accountType" />
        <Checkbox name="isCompanyStampCompulsory" id="isCompanyStampCompulsory">
          {' '}
          {t['kymInsCompanyStampCompulsory']}
        </Checkbox>
        <InputGroupContainer>
          <FormTextArea
            name="specialInstruction"
            label={t['kymInsEnterInstruction']}
          />
        </InputGroupContainer>
        <Box w="124px">
          <FormFileInput
            name="companyStamp"
            label={t['kymInsCompanyStamp']}
            size="md"
          />
        </Box>
      </Box>
    </GroupContainer>
  );
};
