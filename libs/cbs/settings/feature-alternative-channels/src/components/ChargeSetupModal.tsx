import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, FormSection, Loader, Modal } from '@myra-ui';

import { useAddUtilityCashBackMutation, useListUtilityCashBackQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

type ChargesEditTable = {
  minRange: string;
  maxRange: string;
  cashBackAmount: string;
  cashBackPercent: string;
  serviceCharge: string;
};

interface IChargesSetupModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slug: string;
}

export const ChargeSetupModal = ({ isOpen, onClose, title, slug }: IChargesSetupModal) => {
  const methods = useForm();

  const queryClient = useQueryClient();

  const { data: utilityCashbackData, isFetching } = useListUtilityCashBackQuery(
    {
      pagination: { ...getPaginationQuery(), first: -1 },
      filter: {
        orConditions: [
          {
            andConditions: [{ column: 'slug', comparator: 'EqualTo', value: slug }],
          },
        ],
      },
    },
    { enabled: !!slug }
  );

  const cashbackData = utilityCashbackData?.settings?.ebanking?.utility?.listCashBack?.edges;

  useEffect(() => {
    if (cashbackData) {
      methods.setValue(
        'charges',
        cashbackData?.map((cashback) => ({
          ...cashback?.node,
        }))
      );
    }
  }, [cashbackData]);

  const { mutateAsync: updateCashBack } = useAddUtilityCashBackMutation();

  const handleSave = () => {
    asyncToast({
      id: 'update-utility-cash-back',
      msgs: {
        loading: 'Updating',
        success: 'Updated',
      },
      promise: updateCashBack({
        input: { slug, cashBackParams: methods.getValues()?.['charges'] },
      }),
      onSuccess: () => {
        queryClient?.invalidateQueries(['listUtilityCashBack']);
        onClose();
      },
    });
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onClose={onClose}
      primaryButtonLabel="Save Changes"
      width="3xl"
      primaryButtonHandler={handleSave}
      // isDisabled={isSaveButtonDisabled}
      hidePadding
    >
      <FormProvider {...methods}>
        {/* <FormSection>
          <FormSelect name="serviceProvider" label="Service Provider" options={[]} />
        </FormSection> */}

        <FormSection header="Charge and Cashback Setup" divider={false} templateColumns={1}>
          {isFetching ? (
            <Loader />
          ) : (
            <FormEditableTable<ChargesEditTable>
              name="charges"
              canAddRow
              canDeleteRow
              columns={[
                {
                  accessor: 'minRange',
                  header: 'Min. Amount',
                  isNumeric: true,
                  cellWidth: 'auto',
                },
                {
                  accessor: 'maxRange',
                  header: 'Max. Amount',
                  isNumeric: true,
                  cellWidth: 'auto',
                },
                {
                  accessor: 'cashBackAmount',
                  header: 'Cashback Amount',
                  isNumeric: true,
                  cellWidth: 'auto',
                },
                {
                  accessor: 'cashBackPercent',
                  header: 'Cashback Rate',
                  fieldType: 'percentage',
                  isNumeric: true,
                  cellWidth: 'auto',
                },
                {
                  accessor: 'serviceCharge',
                  header: 'Service Charge',
                  isNumeric: true,
                  cellWidth: 'auto',
                },
              ]}
            />
          )}
        </FormSection>
      </FormProvider>
    </Modal>
  );
};
