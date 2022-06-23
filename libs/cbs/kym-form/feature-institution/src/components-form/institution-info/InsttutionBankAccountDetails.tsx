import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const BankAccountDetailsInstitution = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="Bank Account Details" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsBankAccountDetails']}
      </Text>
      <InputGroupContainer>
        <FormSelect
          name="bank"
          label={t['kymInsNameofBank']}
          placeholder={t['kymInsSelectBank']}
          options={[
            { label: 'NIC AISA BANK ', value: 'NICA' },
            { label: 'JYOTI BIKAS BANK LIMITED', value: 'JBBL' },
            { label: 'NIBL BANK ', value: 'NIBL' },
          ]}
        />
        <FormInput
          type="text"
          name="accountNumber"
          label={t['kymInsAccountNumber']}
          placeholder={t['kymInsEnterAccountNumber']}
        />

        <FormInput
          type="text"
          name="accountName"
          label={t['kymInsAccountName']}
          placeholder={t['kymInsEnterAccountName']}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
