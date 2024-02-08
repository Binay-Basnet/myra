import { useFormContext } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import { FormSection } from '@myra-ui';

import { FormAddress, FormFileInput, FormInput, FormSwitch } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const ApplicantDetails = () => {
  const { t } = useTranslation();

  // const methods = useForm<CoopUnionInstitutionInformationInput>();
  // useCoopUnionInstitution({ methods });

  const { watch } = useFormContext();

  const isPermanentAndTemporaryAddressSame = watch('applicantIsPermanentAndTemporaryAddrSame');

  return (
    <>
      <FormSection id="Current Member Details" header="kymCoopUnionApplicant" divider={false}>
        <FormInput isRequired type="text" name="applicantName" label={t['kymCoopUnionName']} />
        <FormInput type="text" name="applicantDesignationEn" label={t['kymCoopUnionDesignation']} />
        <FormInput type="text" name="applicantEmail" label={t['kymCoopUnionEmailAddress']} />
        <FormInput type="text" name="applicantContactNo" label={t['kymCoopUnionContactNo']} />
        <FormInput type="text" name="applicantPanNo" label={t['kymCoopUnionPANNo']} />
      </FormSection>

      <FormAddress
        noBorder
        name="applicantPermanentAddress"
        sectionHeader="kymIndPermanentAddress"
        sectionId="kymAccIndPermanentAddress"
      />

      <FormSection id="kymAccIndTemporaryAddress" header="kymIndTemporaryAddress" divider={false}>
        <GridItem colSpan={3}>
          <FormSwitch
            name="applicantIsPermanentAndTemporaryAddrSame"
            label={t['kymIndTemporaryAddressPermanent']}
          />
        </GridItem>
        {!isPermanentAndTemporaryAddressSame && <FormAddress name="applicantTemporaryAddress" />}
      </FormSection>

      <FormSection templateColumns={2}>
        <FormFileInput
          size="md"
          label={t['kymCoopUnionSignature']}
          name="documents.0.identifiers"
        />
        <FormFileInput size="md" label={t['kymCoopUnionStamp']} name="documents.1.identifiers" />
      </FormSection>
    </>
  );
};
