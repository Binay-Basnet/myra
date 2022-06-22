import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormInput } from '@coop/shared/form';
import { Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ApplicantDetails = () => {
  const { t } = useTranslation();
  return (
    <>
      <GroupContainer id="Current Member Details" scrollMarginTop={'200px'}>
        <Text
          fontSize="r1"
          fontWeight="semibold"
          color="neutralColorLight.Gray-80"
        >
          {t['kymCoopUnionApplicant']}
        </Text>
        <InputGroupContainer>
          <FormInput
            type="text"
            name="applicantName"
            label={t['kymCoopUnionName']}
            placeholder={t['kymCoopUnionEnterName']}
          />
          <FormInput
            type="text"
            name="applicantDesignation"
            label={t['kymCoopUnionDesignation']}
            placeholder={t['kymCoopUnionEnterDesignation']}
          />
        </InputGroupContainer>
      </GroupContainer>
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <FormFileInput
          size="md"
          label={t['kymCoopUnionSignature']}
          // control={control}
          name="applicantSign"
        />
        <FormFileInput
          size="md"
          label={t['kymCoopUnionStamp']}
          // control={control}
          name="applicantStamp"
        />
      </Grid>
    </>
  );
};
