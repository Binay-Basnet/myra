import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GeneralMemberInput, useAddGeneralMemberMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { Table } from '@coop/shared/table';
import { asyncToast, Box, Button, ChakraModal } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface DepositListProps {}

export const McmTable = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { getValues } = methods;
  const { mutateAsync } = useAddGeneralMemberMutation();
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const saveMcm = () => {
    const values = getValues();
    const updatedValues = {
      ...values,
      memberCode: {
        prefix: values?.['memberCode']?.prefix,
        noOfDigits: Number(values?.['memberCode']?.noOfDigits),
        initialNo: values?.['memberCode']?.initialNo,
      },
    };

    asyncToast({
      id: 'general-settings-member-id',
      msgs: {
        success: 'General Member Settings Saved',
        loading: 'Saving General Member Settings',
      },
      promise: mutateAsync({ data: updatedValues as GeneralMemberInput }),
    });
  };

  return (
    <>
      <ChakraModal
        open={openModal}
        onClose={onCloseModal}
        isCentered
        title="memberSettingsMemberID"
        primaryButtonLabel="save"
        primaryButtonHandler={saveMcm}
        width="container.lg"
      >
        <Box display="flex" gap="s20">
          <FormInput name="memberCode.prefix" label={t['memberSettingsPrefix']} />
          <FormInput name="memberCode.noOfDigits" label={t['memberSettingsNoofDigit']} />
          <FormInput name="memberCode.initialNo" label={t['memberSettingsInitialNumber']} />
        </Box>
      </ChakraModal>
      <Table
        data={[{ name: 'memberid', prefix: '1000', noOfDigits: '0', initialNo: '0' }]}
        isStatic
        isLoading={false}
        columns={[
          {
            header: t['memberSettingsName'],
            accessorKey: 'name',
          },
          {
            header: t['memberSettingsPrefix'],
            accessorKey: 'prefix',
          },
          {
            header: t['memberSettingsNoofDigit'],
            accessorKey: 'noOfDigits',
          },
          {
            header: t['memberSettingsInitialNumber'],
            accessorKey: 'initialNo',
          },
          {
            id: '_actions',
            header: '',
            cell: () => (
              <Button variant="ghost" onClick={onOpenModal}>
                {t['memberSettingsSetup']}
              </Button>
            ),
          },
        ]}
      />
    </>
  );
};

export default McmTable;
