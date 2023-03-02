import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Grid, GridItem, Modal } from '@myra-ui';

import {
  FormFieldSearchTerm,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberFamilyDetailsMutation,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../utils/getfieldsOptions';

interface IAddMinorModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
}

export const AddMinorModal = ({ isOpen, onClose, memberId }: IAddMinorModalProps) => {
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const methods = useForm();

  const { data: relationshipData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Relationship,
  });

  const { mutateAsync: newIDMutate } = useGetNewIdMutation();

  const { mutateAsync: setMinor } = useSetMemberFamilyDetailsMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: newIDMutate({}).then((res) =>
        setMinor({
          id: memberId,
          data: {
            id: res.newId,
            ...values,
          },
        })
      ),
      msgs: {
        loading: 'Adding Minor',
        success: 'Minor Added',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountOpenMinorList']);
        onClose();
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  return isOpen ? (
    <Modal
      title="Add Minor"
      open={isOpen}
      onClose={onClose}
      primaryButtonLabel="Save"
      primaryButtonHandler={handleSave}
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
          <GridItem colSpan={2}>
            <FormInput type="text" name="fullName" label="Name" />
          </GridItem>

          <FormSelect
            name="relationshipId"
            label={t['kymIndRelationship']}
            options={getFieldOption(relationshipData)}
            menuPosition="fixed"
          />

          <FormDatePicker
            name="dateOfBirth"
            id="familyDetailsDateOfBirth"
            label={t['kymIndDateofBirthBS']}
            maxToday
          />
        </Grid>
      </FormProvider>
    </Modal>
  ) : null;
};
