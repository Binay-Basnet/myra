import { useCallback, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  DepositProductStatus,
  Id_Type,
  LoanProductInactiveData,
  useGetLoanProductListQuery,
  useGetNewIdMutation,
  useSetLoanProductInactiveMutation,
} from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { FormTextArea } from '@coop/shared/form';
import { Column, Table } from '@coop/shared/table';
import { asyncToast, Box, ChakraModal, DEFAULT_PAGE_SIZE, PageHeader, Text } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

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

      <LoanProductTable showActionButton />
    </>
  );
};

export const LoanProductTable = ({ showActionButton }: { showActionButton?: boolean }) => {
  const router = useRouter();
  const [ID, setID] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync } = useSetLoanProductInactiveMutation();
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
            last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            before: router.query['before'] as string,
          },
          filter: {
            objState: (router.query['objState'] ??
              DepositProductStatus.Active) as DepositProductStatus,
          },
        }
      : {
          paginate: {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
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

  const popoverTitle = [
    {
      title: 'loanProductMakeInactive',
      onClick: (id: string) => {
        onOpenModal();
        setID(id);
      },
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
          if (showActionButton)
            return (
              <ActionPopoverComponent items={popoverTitle} id={props?.row?.original?.node?.id} />
            );
          return null;
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
      promise: mutateAsync({
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
  }, [ID, mutateAsync]);

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
      <ChakraModal
        open={openModal}
        onClose={onCloseModal}
        title="loanProductMakeInactiveTitle"
        primaryButtonLabel="submit"
        secondaryButtonLabel="cancel"
        width="600px"
        primaryButtonHandler={makeInactive}
        secondaryButtonHandler={onCancel}
      >
        <FormProvider {...methods}>
          <FormTextArea name="remarks" label={t['depositProductInactiveReason']} />
        </FormProvider>
      </ChakraModal>
    </>
  );
};
