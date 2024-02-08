import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { KymIndMemberInput } from '@coop/cbs/data-access';
import { FormAddress, FormInput, FormSwitch } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { KYMSection } from '../../../../../../ui-form-elements/src/constants/KYMSection';

export const KYMIndAddress = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext<KymIndMemberInput>();

  const isPermanentAndTemporaryAddressSame = watch('sameTempAsPermanentAddress');

  return (
    <>
      <FormAddress
        sectionId={KYMSection.INDIVIDUAL_PERMANENT_ADDRESS}
        sectionHeader="kymIndPermanentAddress"
        name="permanentAddress"
        isRequired
      />

      <FormSection id={KYMSection.INDIVIDUAL_TEMPORARY_ADDRESS} header="kymIndTemporaryAddress">
        <GridItem colSpan={3}>
          <FormSwitch
            name="sameTempAsPermanentAddress"
            label={t['kymIndTemporaryAddressPermanent']}
          />
        </GridItem>
        {!isPermanentAndTemporaryAddressSame && <FormAddress name="temporaryAddress" />}
      </FormSection>

      <FormSection
        header="kymAccIndInCaseOfResidingInRentedHouse"
        id={KYMSection.INDIVIDUAL_IN_CASE_OF_RESIDING_IN_RENTED_HOUSE}
      >
        <FormInput type="text" name="landlordName" label={t['kymIndLandlordName']} />
        <FormInput type="number" name="landlordContact" label={t['kymIndLandlordContactNo']} />
      </FormSection>
    </>
  );
};
