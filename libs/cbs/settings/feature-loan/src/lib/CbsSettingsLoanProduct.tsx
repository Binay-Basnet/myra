import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Modal, PageHeader, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  AccountTypeFilter,
  DepositProductStatus,
  Id_Type,
  LoanProductInactiveData,
  useGetLoanProductListQuery,
  useGetNewIdMutation,
  useSetLoanProductInactiveMutation,
  useSetProductActiveMutation,
} from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { FormTextArea } from '@coop/shared/form';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

const LOAN_TAB_ITEMS = [
  {
    title: 'depositProductActive',
    key: DepositProductStatus.Active,
  },
  {
    title: 'depositProductInactive',
    key: DepositProductStatus.Inactive,
  },
];

export const SettingsLoanProduct = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const newId = useGetNewIdMutation();
  const onSubmit = () => {
    newId
      .mutateAsync({ idType: Id_Type.Loanproduct })
      .then((res) => router.push(`/settings/general/loan-products/add/${res?.newId}`));
  };

  return (
    <>
      <PageHeader
        heading={`${t['loanProductsLoanProducts']} - ${featureCode?.settingsLoanProduct}`}
        tabItems={LOAN_TAB_ITEMS}
        onClick={onSubmit}
        button
        buttonTitle={t['loanProductsNewLoanProduct']}
      />

      <LoanProductTable showSettingsAction />
    </>
  );
};

export const LoanProductTable = ({ showSettingsAction }: { showSettingsAction?: boolean }) => {
  const router = useRouter();
  const isInactive = router?.query['objState'] === DepositProductStatus.Inactive;
  const [ID, setID] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync: setInactiveMutateAsync } = useSetLoanProductInactiveMutation();
  const { mutateAsync: setActiveMutateAsync } = useSetProductActiveMutation();
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const methods = useForm<LoanProductInactiveData>();
  const { resetField } = methods;

  const { t } = useTranslation();

  const { data, isLoading, refetch } = useGetLoanProductListQuery(
    router.query['before']
      ? {
          paginate: {
            ...getRouterQuery({ type: ['PAGINATION'], query: router.query }),
            order: null,
          },
          filter: {
            objState: (router.query['objState'] ??
              DepositProductStatus.Active) as DepositProductStatus,
          },
        }
      : {
          paginate: {
            ...getRouterQuery({ type: ['PAGINATION'], query: router.query }),
            order: null,
          },
          filter: {
            objState: (router.query['objState'] ??
              DepositProductStatus.Active) as DepositProductStatus,
          },
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.settings?.general?.loanProducts?.list?.edges ?? [], [data]);

  const popoverActiveTitle = [
    {
      title: 'loanProductMakeActive',
      onClick: (id: string) => {
        onOpenModal();
        setID(id);
      },
    },
  ];

  const popoverInactiveTitle = [
    {
      title: 'loanProductMakeInactive',
      onClick: (id: string) => {
        onOpenModal();
        setID(id);
      },
    },
  ];

  const popoverTitle = [
    {
      title: 'loanProductViewDetails',
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['loanProductsProductCode'],
        accessorFn: (row) => row?.node.productCodeString,
      },

      {
        header: t['loanProductsProductName'],
        accessorFn: (row) => row?.node.productName,
        cell: (props) => (
          <Box
            display="flex"
            alignItems="center"
            cursor="pointer"
            gap="s12"
            onClick={() => {
              router.push('/settings/general/loan-products/detail/12123/overview');
            }}
          >
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),
      },
      {
        header: t['loanProductsProductType'],
        accessorFn: (row) => row?.node.productType,
        // cell: (props) => productTypes(props?.row?.original?.node?.productType),
      },
      {
        header: t['loanProductsProductSubType'],
        accessorFn: (row) => row?.node.productSubType,
        // cell: (props) => productSubTypes(props?.row?.original?.node?.productSubType),
      },
      {
        header: t['loanProductsInterest'],
        accessorFn: (row) => row?.node.interest?.defaultRate,
        cell: (props) => <span>{props?.row?.original?.node?.interest?.defaultRate} %</span>,
      },
      {
        header: t['loanProductsCreatedDate'],
        accessorFn: (row) => row?.node.createdDate,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => {
          if (showSettingsAction) {
            if (isInactive) {
              return (
                <ActionPopoverComponent
                  items={popoverActiveTitle}
                  id={props?.row?.original?.node?.id}
                />
              );
            }
            return (
              <ActionPopoverComponent
                items={popoverInactiveTitle}
                id={props?.row?.original?.node?.id}
              />
            );
          }
          return null;
          // <ActionPopoverComponent items={popoverTitle} id={props?.row?.original?.node?.id} />
        },
        meta: {
          width: '50px',
        },
      },
    ],
    [t, router, popoverTitle]
  );

  const makeInactive = useCallback(async () => {
    await asyncToast({
      id: 'inactive-id',
      msgs: {
        success: 'Loan product has been made inactive',
        loading: 'making loan product inactive',
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
    });
  }, [ID, setInactiveMutateAsync]);

  const makeActive = useCallback(async () => {
    await asyncToast({
      id: 'active-id',
      msgs: {
        success: 'Loan product has been made active',
        loading: 'making loan product active',
      },
      onSuccess: () => {
        refetch();
        onCloseModal();
        resetField('remarks');
      },
      promise: setActiveMutateAsync({
        productId: ID,
        productType: AccountTypeFilter?.Loan,
        remarks: methods.getValues()['remarks'],
      }),
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
        pagination={{
          total: data?.settings?.general?.loanProducts?.list?.totalCount ?? 'Many',
          pageInfo: data?.settings?.general?.loanProducts?.list?.pageInfo,
        }}
      />
      <Modal
        open={openModal}
        onClose={onCloseModal}
        title={isInactive ? 'loanProductMakeActiveTitle' : 'loanProductMakeInactiveTitle'}
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
