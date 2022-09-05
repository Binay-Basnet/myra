import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { GridItem } from '@chakra-ui/react';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { FormAddress, FormInput, FormSwitch } from '@coop/shared/form';
import { Box, FormSection } from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IApplicantDetailsProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
}

export const ApplicantDetails = ({ setSection }: IApplicantDetailsProps) => {
  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();
  useCooperativeUnionInstitution({ methods });

  const { watch } = methods;

  const isPermanentAndTemporaryAddressSame = watch(
    'applicantIsPermanentAndTemporaryAddrSame'
  );

  return (
    <>
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSectionCoOperativeUnion(e.target.id);

            setSection((prev) =>
              prev?.subSection !== kymSection.subSection ? kymSection : prev
            );
          }}
        >
          <FormSection
            id="Current Member Details"
            header="kymCoopUnionApplicant"
          >
            {' '}
            <FormInput
              type="text"
              name="applicantName"
              label={t['kymCoopUnionName']}
            />
            <FormInput
              type="text"
              name="applicantDesignationEn"
              label={t['kymCoopUnionDesignation']}
            />
            <Box></Box>
            <FormInput
              type="text"
              name="applicantEmail"
              label={t['kymCoopUnionEmailAddress']}
            />
            <FormInput
              type="text"
              name="applicantContactNo"
              label={t['kymCoopUnionContactNo']}
            />
            <FormInput
              type="text"
              name="applicantPanNo"
              label={t['kymCoopUnionPANNo']}
            />
          </FormSection>

          <FormAddress
            name="applicantPermanentAddress"
            sectionHeader="kymIndPermanentAddress"
            sectionId="kymAccIndPermanentAddress"
          />

          <FormSection
            id="kymAccIndTemporaryAddress"
            header="kymIndTemporaryAddress"
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
