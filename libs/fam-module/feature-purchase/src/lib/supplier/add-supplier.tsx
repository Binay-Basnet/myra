import { useForm } from 'react-hook-form';

import { FormHeader, FormSection, GridItem } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormLayout, FormSelect } from '@coop/shared/form';

export const AddSupplier = () => {
  const onSave = () => {
    // console.log('save clicked');
  };
  const methods = useForm();

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="New Supplier" closeLink={ROUTES.FAM_SUPPLIER_LIST} />

      <FormLayout.Content>
        <FormLayout.Form>
          <SectionContainer>
            <FormSection templateColumns={3}>
              <GridItem colSpan={2}>
                <FormSelect isRequired name="name" label="Name" options={[]} isLoading={false} />
              </GridItem>
              <FormSelect
                isRequired
                name="name"
                label="Vendor Code"
                options={[]}
                isLoading={false}
              />
              <FormInput isRequired type="text" name="panNo" label="PAN No" />
              <FormInput isRequired type="text" name="phoneNumber" label="Phone Number" />
              <FormInput isRequired type="text" name="email" label="Email" />
            </FormSection>
            <FormSection header="Contact Person" templateColumns={3}>
              <FormInput isRequired type="text" name="name" label="Name" />
              <FormInput
                isRequired
                type="text"
                name="conatctPerssonPhoneNumber"
                label="Phone Number"
              />
            </FormSection>

            <FormSection header="Address" templateColumns={3}>
              <FormSelect
                isRequired
                name="province"
                label="Province"
                options={[]}
                isLoading={false}
              />
              <FormSelect
                isRequired
                name="District"
                label="District"
                options={[]}
                isLoading={false}
              />

              <FormSelect
                isRequired
                name="localGovernment"
                label="Local Government"
                options={[]}
                isLoading={false}
              />
              <FormInput isRequired type="text" name="Ward No" label="Ward No" />
              <FormInput isRequired type="text" name="Locality" label="Locality" />
              <FormInput isRequired type="text" name="House No" label="House No" />
            </FormSection>
            <FormSection header="Additional Field" templateColumns={3}>
              <FormInput isRequired type="text" name="OpeningBalance" label="Opening Balance" />
              <FormSelect
                isRequired
                name="CreditTerms"
                label="Credit Terms"
                options={[]}
                isLoading={false}
              />
              <FormInput isRequired type="text" name="CreditLimit" label="Credit Limit" />
            </FormSection>
          </SectionContainer>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default AddSupplier;
