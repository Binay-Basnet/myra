import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const BankAccountDetails = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer
      id="kymCoopUnionAccBankAccountDetails"
      scrollMarginTop={'200px'}
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t.kymCoopUnionBankAccountDetails}
      </Text>
      <InputGroupContainer>
        <FormSelect
          name="nameOfBank"
          label={t.kymCoopUnionNameOfBank}
          placeholder={t.kymCoopUnionSelectBank}
          options={[
            { label: 'NIC AISA BANK ', value: 'NICA' },
            { label: 'JYOTI BIKAS BANK LIMITED', value: 'JBBL' },
            { label: 'NIBL BANK ', value: 'NIBL' },
          ]}
        />
        <FormInput
          type="text"
          name="accountNumber"
          label={t.kymCoopUnionAccountNumber}
          placeholder={t.kymCoopUnionEnterAccountNumber}
        />

        <FormInput
          type="text"
          name="accountName"
          label={t.kymCoopUnionAccountName}
          placeholder={t.kymCoopUnionEnterAccountName}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
