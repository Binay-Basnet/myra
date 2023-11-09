import { useForm } from 'react-hook-form';

import { FormHeader, FormSection } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormLayout, FormSelect } from '@coop/shared/form';

export const AddCustomField = () => {
  const onSave = () => {
    // console.log('save clicked');
  };
  const methods = useForm();

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="Add New Custom Field" closeLink={ROUTES.FAM_CUSTOM_FIELDS_LIST} />

      <FormLayout.Content>
        <FormLayout.Form>
          <SectionContainer>
            <FormSection templateColumns={1} divider={false}>
              <FormInput name="name" label="Name" />
              <FormSelect
                isRequired
                name="assetType"
                label="Asset Type"
                options={[]}
                isLoading={false}
              />
            </FormSection>
          </SectionContainer>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default AddCustomField;
