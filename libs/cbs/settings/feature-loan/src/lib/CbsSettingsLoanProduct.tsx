import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Modal, PageHeader, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  AccountTypeFilter,
  DepositProductStatus,
  Filter_Mode,
  LoanProductInactiveData,
  useGetLoanProductListQuery,
  useSetLoanProductInactiveMutation,
  useSetProductActiveMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormTextArea } from '@coop/shared/form';
import { featureCode, getPaginationQuery, getUrl, useTranslation } from '@coop/shared/utils';

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
  const onSubmit = () => {
    router.push(ROUTES.SETTINGS_GENERAL_LP_ADD);
  };

  return (
    <>
      <PageHeader
        heading={`${t['loanProductsLoanProducts']} - ${featureCode?.loanProductList}`}
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
  const searchTerm = router?.query['search'] as string;

  const { data, isLoading, refetch } = useGetLoanProductListQuery(
    {
      paginate: getPaginationQuery(),
      filter: {
        id: searchTerm,
        productName: searchTerm,
        productCode: searchTerm,
        productSubType: searchTerm,
        objState: (router.query['objState'] ?? DepositProductStatus.Active) as DepositProductStatus,
        filterMode: Filter_Mode.Or,
      },
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.settings?.general?.loanProducts?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'createdDate',
        header: t['loanProductsCreatedDate'],
        accessorFn: (row) => row?.node.createdDate,
        cell: (props) => props?.row?.original?.node.createdDate,
        enableSorting: true,
      },
      {
        header: t['loanProductsProductCode'],
        accessorFn: (row) => row?.node.productCodeString,
      },

      {
        header: t['loanProductsProductName'],
        accessorFn: (row) => row?.node.productName,
        cell: (props) => (
          <Box display="flex" alignItems="center" cursor="pointer" gap="s12">
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
        header: 'Organization Premium',
        accessorFn: (row) => row?.node.organizationPremiumInterest,
        cell: (props) => <span>{props?.row?.original?.node?.organizationPremiumInterest} %</span>,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Product Premium',
        accessorFn: (row) => row?.node.productPremiumInterest,
        cell: (props) => <span>{props?.row?.original?.node?.productPremiumInterest} %</span>,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Default Account Premium',
        accessorFn: (row) => row?.node.accountPremiumInterest,
        cell: (props) => <span>{props?.row?.original?.node?.accountPremiumInterest} %</span>,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: t['loanProductsInterest'],
        accessorFn: (row) => row?.node.interest?.defaultRate,
        cell: (props) => <span>{props?.row?.original?.node?.interest?.defaultRate} %</span>,
        meta: {
          isNumeric: true,
        },
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
                    {
                      title: 'Edit Product',
                      aclKey: 'SETTINGS_LOAN_PRODUCTS',
                      action: 'UPDATE',
                      onClick: (row) => {
                        router.push(`${ROUTES.SETTINGS_GENERAL_LP_EDIT}?id=${row?.id}`);
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
                  {
                    title: 'Edit Product',
                    aclKey: 'SETTINGS_LOAN_PRODUCTS',
                    action: 'UPDATE',
                    onClick: (row) => {
                      router.push(`${ROUTES.SETTINGS_GENERAL_LP_EDIT}?id=${row?.id}`);
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
                  onClick: () => {
                    router.push(
                      `/${getUrl(router.pathname, 3)}/details?id=${props?.row?.original?.node?.id}`
                    );
                  },
                },
                {
                  title: 'Edit Product',
                  aclKey: 'SETTINGS_LOAN_PRODUCTS',
                  action: 'UPDATE',
                  onClick: (row) => {
                    router.push(`${ROUTES.SETTINGS_GENERAL_LP_EDIT}?id=${row?.id}`);
                  },
                },
              ]}
            />
          );
        },
      },
    ],
    [t, router, rowData]
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
        rowOnClick={(row) => {
          if (router.pathname.includes('settings')) {
            router.push(`/${getUrl(router.pathname, 3)}/details?id=${row?.node?.id}`);
          } else {
            router.push(`/${getUrl(router.pathname, 3)}/details?id=${row?.node?.id}`);
          }
        }}
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
