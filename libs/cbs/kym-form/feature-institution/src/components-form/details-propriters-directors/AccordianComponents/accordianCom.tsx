import { FormProvider, useForm } from 'react-hook-form';

import { FormAddress, FormDatePicker, FormInput, FormSwitch } from '@coop/shared/form';
import { Box, FormSection, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useDirector } from '../../hooks/useDirector';

interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  directorId: string;
}

export const DirectorTopPart = ({ setKymCurrentSection, directorId }: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useForm();

  const { watch } = methods;
  useDirector({ methods, directorId });

  const isPermanentAndTemporaryAddressSame = watch('isTemporaryAndPermanentAddressSame');

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <Box display="flex" flexDirection="column">
          <FormSection>
            <FormInput
              id="DirectorInstitutionId"
              type="text"
              name="name"
              label={t['kymInsFullName']}
            />
            <FormInput
              id="DirectorInstitutionId"
              type="text"
              name="designation"
              label={t['kymInsDesignation']}
            />
          </FormSection>

          <FormAddress
            sectionId="Permanent Address"
            sectionHeader="kymInsPermanentAddress"
            name="permanentAddress"
          />

          <Box id="Temporary Address" display="flex" flexDirection="column" scrollMarginTop="200px">
            <Box px="s20" pt="s16" display="flex" flexDirection="column" gap="s16">
              <Text fontSize="r1" fontWeight="SemiBold">
                {t['kymInsTemporaryAddress']}
              </Text>

              <FormSwitch
                id="isPermanentAndTemporaryAddressSame"
                name="isTemporaryAndPermanentAddressSame"
                label={t['kymInsTemporaryAddressPermanent']}
              />
            </Box>
            <FormSection>
              {!isPermanentAndTemporaryAddressSame && <FormAddress name="temporaryAddress" />}
            </FormSection>
          </Box>

          <FormSection>
            <FormDatePicker
              id="DirectorInstitutionId"
              name="dateOfMembership"
              label={t['kymInsDateOfMembership']}
            />
            <FormInput
              id="DirectorInstitutionId"
              type="text"
              name="highestQualification"
              label={t['kymInsHighestQualification']}
            />
            <FormInput
              id="DirectorInstitutionId"
              type="string"
              name="mobileNo"
              label={t['kymInsMobileNo']}
            />
            <FormInput
              id="DirectorInstitutionId"
              type="text"
              name="email"
              label={t['kymInsEmail']}
            />
            <FormInput
              id="DirectorInstitutionId"
              type="string"
              name="citizenshipNo"
              label={t['kymInsCitizenshipPassportDrivingLicenseNo']}
            />
            <FormInput
              id="DirectorInstitutionId"
              type="string"
              name="panNo"
              label={t['kymInsPanNo']}
            />
          </FormSection>
        </Box>
      </form>
    </FormProvider>
  );
};
