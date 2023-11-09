import { useForm } from 'react-hook-form';

import { FormHeader, FormSection, GridItem } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormLayout, FormTextArea } from '@coop/shared/form';

export const AddAssetType = () => {
  const onSave = () => {
    // console.log('save clicked');
  };
  const methods = useForm();

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="Add New Asset Type" closeLink={ROUTES.FAM_ASSETS_TYPE_LIST} />

      <FormLayout.Content>
        <FormLayout.Form>
          <SectionContainer>
            <FormSection templateColumns={2} divider={false}>
              <FormInput name="name" label="Name" />
              <FormInput label="Asset Group" name="assetGroup" />
              <FormInput label="Asset Code" name="assetCode" />
              <FormInput label="Asset Numbering Starting Prefix" name="AssetPrefixNumber" />
              <GridItem colSpan={2}>
                <FormTextArea name="description" label="Description" />
              </GridItem>
            </FormSection>
          </SectionContainer>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default AddAssetType;
