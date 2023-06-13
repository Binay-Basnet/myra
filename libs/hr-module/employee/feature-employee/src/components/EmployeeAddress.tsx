import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { FormAddress, FormSwitch } from '@coop/shared/form';

export const EmployeeAddress = () => {
  const methods = useFormContext();
  const { watch } = methods;

  const isPermanentAndTemporaryAddressSame = watch('sameTempAsPermanentAddress');
  return (
    <>
      <FormAddress
        sectionId="Permanent Address"
        sectionHeader="Permanent Address"
        name="permanentAddress"
      />

      <FormSection id="Temporary Address" header="Temporary Address">
        <GridItem colSpan={3}>
          <FormSwitch
            name="isTemporarySameAsPermanent"
            label="Temporary Address same as Permanent"
          />
        </GridItem>
        {!isPermanentAndTemporaryAddressSame && <FormAddress name="temporaryAddress" />}
      </FormSection>
    </>
  );
};
