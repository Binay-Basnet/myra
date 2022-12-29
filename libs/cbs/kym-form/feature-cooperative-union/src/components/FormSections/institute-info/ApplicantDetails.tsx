import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { GridItem } from '@chakra-ui/react';

import { FormSection } from '@myra-ui';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { FormAddress, FormInput, FormSwitch } from '@coop/shared/form';
import { getKymSectionCoOperativeUnion, useTranslation } from '@coop/shared/utils';

import { useCoopUnionInstitution } from '../../../hooks/useCoopUnionInstitution';

interface IApplicantDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const ApplicantDetails = ({ setSection }: IApplicantDetailsProps) => {
  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();
  useCoopUnionInstitution({ methods });

  const { watch } = methods;

  const isPermanentAndTemporaryAddressSame = watch('applicantIsPermanentAndTemporaryAddrSame');

  return (
    <>
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSectionCoOperativeUnion(e.target.id);

            setSection(kymSection);
          }}
        >
          <FormSection id="Current Member Details" header="kymCoopUnionApplicant" divider={false}>
            <FormInput isRequired type="text" name="applicantName" label={t['kymCoopUnionName']} />
            <FormInput
              isRequired
              type="text"
              name="applicantDesignationEn"
              label={t['kymCoopUnionDesignation']}
            />
            <FormInput
              isRequired
              type="text"
              name="applicantEmail"
              label={t['kymCoopUnionEmailAddress']}
            />
            <FormInput
              isRequired
              type="text"
              name="applicantContactNo"
              label={t['kymCoopUnionContactNo']}
            />
            <FormInput type="text" name="applicantPanNo" label={t['kymCoopUnionPANNo']} />
          </FormSection>

          <FormAddress
            noBorder
            name="applicantPermanentAddress"
            sectionHeader="kymIndPermanentAddress"
            sectionId="kymAccIndPermanentAddress"
          />

          <FormSection
            id="kymAccIndTemporaryAddress"
            header="kymIndTemporaryAddress"
            divider={false}
          >
            <GridItem colSpan={3}>
              <FormSwitch
                name="applicantIsPermanentAndTemporaryAddrSame"
                label={t['kymIndTemporaryAddressPermanent']}
              />
            </GridItem>
            {!isPermanentAndTemporaryAddressSame && (
              <FormAddress name="applicantTemporaryAddress" />
            )}
          </FormSection>
        </form>
      </FormProvider>

      <FormSection templateColumns={2}>
        <KYMDocumentField
          mutationId={id}
          size="md"
          label={t['kymCoopUnionSignature']}
          name="applicantSign"
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        <KYMDocumentField
          mutationId={id}
          size="md"
          label={t['kymCoopUnionStamp']}
          name="applicantStamp"
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
      </FormSection>
    </>
  );
};
