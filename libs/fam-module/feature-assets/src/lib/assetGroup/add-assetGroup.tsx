import { useForm } from 'react-hook-form';

import { FormHeader, FormSection } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormLayout, FormTextArea } from '@coop/shared/form';

export const AddAssetGroup = () => {
  const onSave = () => {
    // console.log('save clicked');
  };
  const methods = useForm();

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="Add New Asset Group" closeLink={ROUTES.FAM_ASSETS_GROUP_LIST} />

      <FormLayout.Content>
        <FormLayout.Form>
          <SectionContainer>
            <FormSection templateColumns={1} divider={false}>
              <FormInput name="name" label="Name" />
              <FormTextArea minH="176px" label="Description" name="description" />
            </FormSection>
          </SectionContainer>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default AddAssetGroup;
