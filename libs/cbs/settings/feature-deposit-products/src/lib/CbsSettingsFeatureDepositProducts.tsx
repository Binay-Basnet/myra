import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Modal, PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  AccountTypeFilter,
  DepositProductInactiveData,
  DepositProductStatus,
  NatureOfDepositProduct,
  useGetDepositProductSettingsListQuery,
  useSetDepositProductInactiveMutation,
  useSetProductActiveMutation,
} from '@coop/cbs/data-access';
import { FormTextArea } from '@coop/shared/form';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

const DEPOSIT_TAB_ITEMS = [
  {
    title: 'depositProductActive',
    key: DepositProductStatus.Active,
  },
  {
    title: 'depositProductInactive',
    key: DepositProductStatus.Inactive,
  },
];

type DepositTableProps = {
  addNew?: boolean;
  showSettingsAction?: boolean;
};

export const SettingsDepositProducts = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const onSubmit = () => {
    router.push(`/settings/general/deposit-products/add`);
  };
  return (
    <>
      <PageHeader
        heading={`${t['settingsDepositProducts']} - ${featureCode?.settingsDepositProduct}`}
        tabItems={DEPOSIT_TAB_ITEMS}
        onClick={onSubmit}
        button
        buttonTitle={t['settingsDepositProductNew']}
      />
      <DepositProductTable addNew showSettingsAction />
    </>
  );
};

export const DepositProductTable = ({ showSettingsAction }: DepositTableProps) => {
  const router = useRouter();
  const isInactive = router?.query['objState'] === DepositProductStatus.Inactive;
  const { t } = useTranslation();

  const { mutateAsync: setInactiveMutateAsync } = useSetDepositProductInactiveMutation();
  const { mutateAsync: setActiveMutateAsync } = useSetProductActiveMutation();

  const [ID, setID] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const methods = useForm<DepositProductInactiveData>();
  const { resetField } = methods;

  const { data, isLoading, refetch } = useGetDepositProductSettingsListQuery(
    {
      paginate: {
        ...getRouterQuery({ type: ['PAGINATION'], query: router.query }),
        order: null,
      },
      filter: {
        objState: (router.query['objState'] ?? DepositProductStatus.Active) as DepositProductStatus,
      },
    },
    {
      staleTime: 0,
    }
  );
  const rowData = useMemo(() => data?.settings?.general?.depositProduct?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['depositProductCode'],
        accessorFn: (row) => row?.node?.productCode,
      },

      {
        header: t['depositProductName'],
        accessorFn: (row) => row?.node?.productName,
      },
      {
        header: t['depositNature'],
        accessorFn: (row) => row?.node?.nature,
        cell: (props) => {
          const nature = props?.row?.original?.node?.nature;
          return (
            <span>
              {nature === NatureOfDepositProduct.Current && t['depositProductCurrent']}
              {nature === NatureOfDepositProduct.RecurringSaving &&
                t['depositProductRecurringSaving']}
              {nature === NatureOfDepositProduct.TermSavingOrFd && t['depositProductTermSaving']}
              {nature === NatureOfDepositProduct.Saving && t['depositProductSaving']}
            </span>
          );
        },
      },
      {
        header: t['depositInterest'],
        accessorFn: (row) => row?.node?.interest,
        cell: (props) => <span>{props?.row?.original?.node?.interest} %</span>,
      },
      {
        header: t['depositCreatedDate'],
        accessorFn: (row) => row?.node?.createdDate,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => {
          if (showSettingsAction) {
            if (isInactive) {
              return (
                <TablePopover
                  node={props?.row?.original?.node}
                  items={[
                    {
                      title: 'loanProductMakeActive',
                      onClick: (row) => {
                        onOpenModal();
                        setID(row?.id);
                      },
                    },
                  ]}
                />
              );
            }
            return (
              <TablePopover
                node={props?.row?.original?.node}
                items={[
                  {
                    title: 'loanProductMakeInactive',
                    onClick: (row) => {
                      onOpenModal();
                      setID(row?.id);
                    },
                  },
                ]}
              />
            );
          }
          return (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: 'loanProductViewDetails',
                },
              ]}
            />
          );
        },
        meta: {
          width: '50px',
        },
      },
    ],
    [t, router]
  );

  const makeInactive = useCallback(async () => {
    await asyncToast({
      id: 'inactive-id',
      msgs: {
        success: 'Deposit Product Inactive',
        loading: 'Inactive Deposit Product',
      },
      onSuccess: () => {
        refetch();
        onCloseModal();
        resetField('remarks');
      },
      promise: setInactiveMutateAsync({
        data: {
          id: ID,
          remarks: methods.getValues()['remarks'],
        },
      }),
      // onError: (error) => {
      //   if (error.__typename === 'ValidationError') {
      //     Object.keys(error.validationErrorMsg).map((key) =>
      //       methods.setError(key as keyof DepositProductInput, {
      //         message: error.validationErrorMsg[key][0] as string,
      //       })
      //     );
      //   }
      // },
    });
  }, [ID, setInactiveMutateAsync]);

  const makeActive = useCallback(async () => {
    await asyncToast({
      id: 'inactive-id',
      msgs: {
        success: 'Deposit Product made Active',
        loading: 'making loan product active',
      },
      onSuccess: () => {
        refetch();
        onCloseModal();
        resetField('remarks');
      },
      promise: setActiveMutateAsync({
        productId: ID,
        productType: AccountTypeFilter?.Deposit,
        remarks: methods.getValues()['remarks'],
      }),
      // onError: (error) => {
      //   if (error.__typename === 'ValidationError') {
      //     Object.keys(error.validationErrorMsg).map((key) =>
      //       methods.setError(key as keyof DepositProductInput, {
      //         message: error.validationErrorMsg[key][0] as string,
      //       })
      //     );
      //   }
      // },
    });
  }, [ID, setActiveMutateAsync]);

  const onCancel = () => {
    resetField('remarks');
  };

  return (
    <>
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        getRowId={(row) => String(row?.node?.id)}
        rowOnClick={(row) =>
          router.push(`/settings/general/deposit-products/view?id=${row?.node?.id}`)
        }
        pagination={{
          total: data?.settings?.general?.depositProduct?.list?.totalCount ?? 'Many',
          pageInfo: data?.settings?.general?.depositProduct?.list?.pageInfo,
        }}
      />
      <Modal
        open={openModal}
        onClose={onCloseModal}
        title={isInactive ? 'depositProductActiveProduct' : 'depositProductInactiveProduct'}
        primaryButtonLabel="submit"
        secondaryButtonLabel="cancel"
        width="600px"
        primaryButtonHandler={isInactive ? makeActive : makeInactive}
        secondaryButtonHandler={onCancel}
      >
        <FormProvider {...methods}>
          <FormTextArea
            name="remarks"
            label={isInactive ? t['depositProductActiveReason'] : t['depositProductInactiveReason']}
          />
        </FormProvider>
      </Modal>
    </>
  );
};

export default SettingsDepositProducts;
