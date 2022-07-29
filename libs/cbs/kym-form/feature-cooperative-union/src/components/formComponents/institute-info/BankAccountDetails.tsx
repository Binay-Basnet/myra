import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { CoopUnionInstitutionInformationInput } from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IBankAccountDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BankAccountDetails = ({
  setSection,
}: IBankAccountDetailsProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCooperativeUnionInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymCoopUnionAccBankAccountDetails"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopUnionBankAccountDetails']}
          </Text>
          <InputGroupContainer>
            <FormSelect
              name="nameOfBank"
              label={t['kymCoopUnionNameOfBank']}
              placeholder={t['kymCoopUnionSelectBank']}
              options={[
                { label: 'NIC AISA BANK ', value: 'NICA' },
                { label: 'JYOTI BIKAS BANK LIMITED', value: 'JBBL' },
                { label: 'NIBL BANK ', value: 'NIBL' },
              ]}
            />
            <FormInput
              type="text"
              name="accountNumber"
              label={t['kymCoopUnionAccountNumber']}
              placeholder={t['kymCoopUnionEnterAccountNumber']}
            />

            <FormInput
              type="text"
              name="accountName"
              label={t['kymCoopUnionAccountName']}
              placeholder={t['kymCoopUnionEnterAccountName']}
            />
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
