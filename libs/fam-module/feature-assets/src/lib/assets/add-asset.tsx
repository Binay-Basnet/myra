import { useForm } from 'react-hook-form';

import { FormHeader, FormSection } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout, FormTextArea } from '@coop/shared/form';

import { BasicInformation } from '../components/BasicInformation';
import { CustomFields } from '../components/CustomFields';
import { Deprecation } from '../components/Deprecation';
import { MoreOption } from '../components/MoreOption';
import { PurchaseInformation } from '../components/PurchaseInformation';
import { Warranty } from '../components/Warranty';

export const AddAsset = () => {
  const onSave = () => {
    // console.log('save clicked');
  };
  const methods = useForm();

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="Add New Asset" closeLink={ROUTES.FAM_ASSETS_LIST} />

      <FormLayout.Content>
        <FormLayout.Form>
          <SectionContainer>
            <BasicInformation />
            <PurchaseInformation />
            <CustomFields />
            <MoreOption />
            <Warranty />
            <Deprecation />
            <FormSection templateColumns={1}>
              <FormTextArea minH="176px" label="Additional Notes" name="additionalNotes" />
            </FormSection>
          </SectionContainer>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default AddAsset;
