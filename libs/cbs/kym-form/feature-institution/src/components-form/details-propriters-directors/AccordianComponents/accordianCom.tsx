import { useFormContext } from 'react-hook-form';

import { Box, FormSection, Text } from '@myra-ui';

import { KymInsInput } from '@coop/cbs/data-access';
import { FormAddress, FormDatePicker, FormInput, FormSwitch } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface IAddDirector {
  index: number;
}

export const DirectorTopPart = ({ index }: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useFormContext<KymInsInput>();

  const { watch } = methods;

  const isPermanentAndTemporaryAddressSame = watch(
    `director.${index}.isTemporaryAndPermanentAddressSame`
  );

  return (
    <Box display="flex" flexDirection="column">
      <FormSection>
        <FormInput
          isRequired
          id="DirectorInstitutionId"
          type="text"
          name={`director.${index}.name`}
          label={t['kymInsFullName']}
        />
        <FormInput
          isRequired
          id="DirectorInstitutionId"
          type="text"
          name={`director.${index}.designation`}
          label={t['kymInsDesignation']}
        />
      </FormSection>

      <FormAddress
        sectionId="Permanent Address"
        sectionHeader="kymInsPermanentAddress"
        name={`director.${index}.permanentAddress`}
      />

      <Box id="Temporary Address" display="flex" flexDirection="column" scrollMarginTop="200px">
        <Box px="s20" pt="s16" display="flex" flexDirection="column" gap="s16">
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymInsTemporaryAddress']}
          </Text>

          <FormSwitch
            id="isPermanentAndTemporaryAddressSame"
            name={`director.${index}.isTemporaryAndPermanentAddressSame`}
            label={t['kymInsTemporaryAddressPermanent']}
          />
        </Box>
        <FormSection>
          {!isPermanentAndTemporaryAddressSame && (
            <FormAddress name={`director.${index}.temporaryAddress`} />
          )}
        </FormSection>
      </Box>

      <FormSection>
        <FormDatePicker
          id="DirectorInstitutionId"
          name={`director.${index}.dateOfMembership`}
          label={t['kymInsDateOfMembership']}
        />
        <FormInput
          id="DirectorInstitutionId"
          type="text"
          name={`director.${index}.highestQualification`}
          label={t['kymInsHighestQualification']}
        />
        <FormInput
          isRequired
          id="DirectorInstitutionId"
          type="string"
          name={`director.${index}.mobileNo`}
          label={t['kymInsMobileNo']}
        />
        <FormInput
          isRequired
          id="DirectorInstitutionId"
          type="text"
          name={`director.${index}.email`}
          label={t['kymInsEmail']}
        />
        <FormInput
          id="DirectorInstitutionId"
          type="string"
          name={`director.${index}.citizenshipNo`}
          label={t['kymInsCitizenshipPassportDrivingLicenseNo']}
        />
        <FormInput
          id="DirectorInstitutionId"
          type="string"
          name={`director.${index}.panNo`}
          label={t['kymInsPanNo']}
        />
      </FormSection>
    </Box>
  );
};
