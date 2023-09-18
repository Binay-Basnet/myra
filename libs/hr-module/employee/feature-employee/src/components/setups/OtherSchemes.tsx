import { useFormContext } from 'react-hook-form';
import { useGetEployeeOptions } from '@hr/common';

import { Box, FormSection, GridItem } from '@myra-ui';

import { FormCheckbox, FormCheckboxGroup, FormInput, FormSelect } from '@coop/shared/form';

export const OtherSchemes = () => {
  const { watch } = useFormContext();

  const { employeeOptions } = useGetEployeeOptions();

  const otherSchemeOptions = [
    { label: 'PF', value: 'pf' },
    { label: 'SSF', value: 'ssf' },
    { label: 'CIT', value: 'cit' },
  ];

  const otherSchemesWatch = watch('otherSchemes');

  return (
    <>
      <FormSection id="Other Schemes" header="Other Schemes" divider={false}>
        <GridItem colSpan={3} mt="none">
          <Box display="flex">
            <FormCheckboxGroup name="otherSchemes" showOther={false} list={otherSchemeOptions} />
          </Box>
        </GridItem>
      </FormSection>
      {otherSchemesWatch?.includes('pf') && (
        <FormSection id="Provident Fund Details" header="Provident Fund Detail" divider={false}>
          <FormInput name="providentNumber" label="Provident Number" />
          <FormInput name="nominee" label="Nominee Name" />
          <FormInput name="relationWithNominee" label="Relation with Nominee" />
        </FormSection>
      )}
      {otherSchemesWatch?.includes('ssf') && (
        <FormSection id="Social Security Fund" header="Social Security Fund" divider={false}>
          <FormInput name="ssfNumber" label="SSF Number" />
        </FormSection>
      )}
      {otherSchemesWatch?.includes('cit') && (
        <FormSection id="Citizen Investment Trust" header="Citizen Investment Trust">
          <FormInput name="citNumber" label="CIT Number" />
          <FormInput name="citCode" label="CIT code" />
          <FormCheckbox name="noCitDeduction" label="No CIT Deduction" />
        </FormSection>
      )}
      <FormSection id="Configuration" header="Configuration">
        <FormSelect name="supervisor" label="Supervisor" options={employeeOptions} />
      </FormSection>
    </>
  );
};

export default OtherSchemes;
