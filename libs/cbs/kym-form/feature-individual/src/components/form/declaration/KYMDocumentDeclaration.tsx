import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IKYMDocumentDeclarationProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const KYMDocumentDeclaration = ({
  setKymCurrentSection,
}: IKYMDocumentDeclarationProps) => {
  const { t } = useTranslation();

  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kynIndDOCUMENTDECLARATION']}
      </Text>

      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <KYMDocumentField
          label="Passport Size Photo"
          name="passportSizePhoto"
          setKymCurrentSection={setKymCurrentSection}
        />

        <KYMDocumentField
          label="Signature"
          name="signaturePhoto"
          setKymCurrentSection={setKymCurrentSection}
        />

        <KYMDocumentField
          label="Citizenship Photo"
          name="citizenshipPhoto"
          setKymCurrentSection={setKymCurrentSection}
        />

        <KYMDocumentField
          label="Fingerprint Photo"
          name="fingerprintPhoto"
          setKymCurrentSection={setKymCurrentSection}
        />
        {/* {fileUploadsData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
              (option, index) => (
                <FormFileInput
                  key={index}
                  size="lg"
                  label={option.name?.local}
                  name="documentsTemp"
                />
              )
            )} */}
      </Grid>
    </GroupContainer>
  );
};
