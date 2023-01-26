import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { UseDisclosureReturn } from '@chakra-ui/hooks';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Modal } from '@myra-ui/components';
import { Box } from '@myra-ui/foundations';

import { CoaAccountSetup, useAddAccountInCoaMutation } from '@coop/cbs/data-access';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';

import { CoaTree } from '../../types';

interface IAddAccountProps {
  clickedAccount: CoaTree | null;
  modalProps: UseDisclosureReturn;
}

export const AddAccountModal = ({ clickedAccount, modalProps }: IAddAccountProps) => {
  const methods = useForm<{
    accountSetup: CoaAccountSetup;
    parentAccountCode: string;
    openForBranches: { label: string; value: string }[];
  }>();
  const { watch, reset } = methods;
  const isAccountOpenForSelectedBranch = watch('accountSetup') === CoaAccountSetup.SelectedBranch;

  const queryClient = useQueryClient();
  const { isOpen, onClose, onToggle } = modalProps;

  const { mutateAsync: addNewAccount } = useAddAccountInCoaMutation();

  useEffect(() => {
    if (!isAccountOpenForSelectedBranch) {
      reset({ openForBranches: undefined });
    }
  }, [isAccountOpenForSelectedBranch]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Add Account"
      primaryButtonLabel="Save"
      primaryButtonHandler={async () => {
        await asyncToast({
          id: 'add-group',
          msgs: {
            success: 'Account Added Successfully',
            loading: 'Adding New Account',
          },
          onSuccess: () => {
            queryClient.refetchQueries(['getCoaFullView']);
            queryClient.invalidateQueries(['getCOALeafNodeDetails']);
            onToggle();
          },
          promise: addNewAccount({
            accountSetup: methods.getValues().accountSetup,
            parentAccountCode: clickedAccount?.id as string,
            openForBranches: methods?.getValues()?.openForBranches?.map((item) => item?.value),
          }),
        });
      }}
    >
      <FormProvider {...methods}>
        <FormRadioGroup
          name="accountSetup"
          direction="column"
          options={[
            { label: 'Open Account for this Service Center', value: CoaAccountSetup.ThisBranch },
            { label: 'Open Account for all Service Center', value: CoaAccountSetup.AllBranch },
            {
              label: 'Open Account for selected Service Center',
              value: CoaAccountSetup.SelectedBranch,
            },
          ]}
        />
        {isAccountOpenForSelectedBranch && (
          <Box mt="s32" width={280}>
            <FormBranchSelect name="openForBranches" label="Select Service Center" isMulti />
          </Box>
        )}
      </FormProvider>
    </Modal>
  );
};
