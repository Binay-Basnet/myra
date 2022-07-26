import { FormFileInput } from '@coop/shared/form';
import { Grid } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const DocumentComponent = () => {
  const { t } = useTranslation();
  return (
    <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
      <FormFileInput
        size="lg"
        label={t['kymInsPhotograph']}
        // control={control}
        name={`photograph`}
      />
      <FormFileInput
        size="lg"
        label={t['kymInsPhotographOfIdentityProofDocument']}
        // control={control}
        name={`documentPhotograph`}
      />
    </Grid>
  );
};
