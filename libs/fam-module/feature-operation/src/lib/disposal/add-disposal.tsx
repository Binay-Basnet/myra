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

export const AddDisposal = () => {
  const onSave = () => {
    // console.log('save clicked');
  };
  const methods = useForm();

  return (
    <FormLayout hasSidebar methods={methods}>
      <FormHeader title="Disposal " closeLink={ROUTES.FAM_DISPOSAL_LIST} />

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
              <FormDatePicker name="transferDate" label="Date of Occurance" />
              <GridItem colSpan={2} />
              <GridItem colSpan={3}>
                <FormInput isRequired type="text" name="disposedBy" label="Disposed By" />
              </GridItem>
              <GridItem colSpan={3}>
                <FormTextArea minH="176px" isRequired name="description" label="Description" />
              </GridItem>
            </FormSection>

            <FormSection header="Notes" templateColumns={3}>
              <FormFileInput label="Upload" name="attachment" />
              <GridItem colSpan={2} />

              <FormTextArea isRequired name="noteDescription" label="Description" />
            </FormSection>
          </SectionContainer>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={onSave} />
    </FormLayout>
  );
};

export default AddDisposal;
