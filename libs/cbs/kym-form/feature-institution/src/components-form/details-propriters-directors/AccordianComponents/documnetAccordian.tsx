export const DocumentComponent = () => {
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
