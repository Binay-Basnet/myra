import { FormProvider, useForm } from 'react-hook-form';

import {
  CoopUnionInstitutionInformationInput,
  useGetBankListQuery,
} from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
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

  const { data: bankList } = useGetBankListQuery();

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
              options={bankList?.bank?.bank?.list?.map((bank) => ({
                label: bank?.name,
                value: bank?.id,
              }))}
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
