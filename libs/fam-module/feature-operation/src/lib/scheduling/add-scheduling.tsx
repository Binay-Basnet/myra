import { useForm } from 'react-hook-form';

import { FormHeader, FormSection, GridItem } from '@myra-ui';

import { SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormDatePicker,
  FormFileInput,
  FormInput,
  FormLayout,
  FormSelect,
} from '@coop/shared/form';

export const AddScheduling = () => {
  const onSave = () => {
    // console.log('save clicked');
  };
  const methods = useForm();

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="Maintanance " closeLink={ROUTES.FAM_SCHEDULING_LIST} />

      <FormLayout.Content>
        <FormLayout.Form>
          <SectionContainer>
            <FormSection header="Disposal Information" templateColumns={3}>
              <GridItem colSpan={2}>
                <FormSelect
                  isRequired
                  name="name"
                  label="Asset Name"
                  options={[]}
                  isLoading={false}
                />
              </GridItem>
              <FormInput isRequired type="text" name="assetCode" label="Asset Code" />
              <FormDatePicker name="transferDate" label="Transfer Date " />
            </FormSection>

            <FormSection templateColumns={3}>
              <FormFileInput label="Upload" name="attachment" />
            </FormSection>
          </SectionContainer>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default AddScheduling;
