import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/shared/form';
import { Grid } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const RequiredDocuments = () => {
  const { t } = useTranslation();

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <Grid
        background="neutralColorLight.Gray-0"
        templateColumns="repeat(2, 1fr)"
        rowGap="s32"
        columnGap="s20"
        p="s20"
      >
        <FormFileInput size="lg" label={t['accPhoto']} name="photo" />
        <FormFileInput size="lg" label={t['accSignature']} name="signature" />
        <FormFileInput
          size="lg"
          label={t['accNomineeDocument']}
          name="nominee"
        />
        <FormFileInput
          size="lg"
          label={t['accFingerprintPhoto']}
          name="fingerprintPhoto"
        />
      </Grid>
    </GroupContainer>
  );
};
