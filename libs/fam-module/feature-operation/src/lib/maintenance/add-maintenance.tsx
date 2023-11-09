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
  FormTextArea,
} from '@coop/shared/form';

export const AddMaintenance = () => {
  const onSave = () => {
    // console.log('save clicked');
  };
  const methods = useForm();

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="Maintenance" closeLink={ROUTES.FAM_MAINTENANCE_LIST} />

      <FormLayout.Content>
        <FormLayout.Form>
          <SectionContainer>
            <FormSection header="Maintenance Information" templateColumns={3}>
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
              <FormDatePicker name="dateOfOccurance" label="Date of Occurance" />
              <FormInput isRequired type="text" name="maintainedBy" label="Maintained By" />
            </FormSection>

            <FormSection templateColumns={3}>
              <FormFileInput label="Upload" name="attachment" />
              <GridItem colSpan={3}>
                <FormTextArea minH="176px" isRequired name="notes" label="Notes" />
              </GridItem>
            </FormSection>
          </SectionContainer>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default AddMaintenance;
