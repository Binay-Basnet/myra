import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Grid, GridItem, Modal, PageHeader, TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetDepositProductSettingsListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureDocumentsProps {}

export const CbsSettingsFeatureDocuments = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCancel = () => {
    resetField('remarks');
  };

  const methods = useForm();
  const { resetField } = methods;

  const { data, isLoading } = useGetDepositProductSettingsListQuery(
    {
      paginate: {
        ...getPaginationQuery(),
        order: null,
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
        header: 'ID',
        accessorFn: (row) => row?.node?.productCode,
      },

      {
        header: 'Document Name',
        accessorFn: (row) => row?.node?.productName,
      },

      {
        header: 'Type',
        accessorFn: (row) => row?.node?.interest,
        cell: (props) => <span>{props?.row?.original?.node?.interest} %</span>,
      },
      {
        header: 'No of Files',
        accessorFn: (row) => row?.node?.createdDate,
      },
      {
        header: 'File Size',
        accessorFn: (row) => row?.node?.createdDate,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: t['transDetailViewDetail'],
                },
              ]}
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading="All Document" onClick={onOpenModal} button buttonTitle="New Document" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.settings?.general?.depositProduct?.list?.totalCount ?? 'Many',
          pageInfo: data?.settings?.general?.depositProduct?.list?.pageInfo,
        }}
      />
      <Modal
        open={openModal}
        onClose={onCloseModal}
        title="New Document"
        primaryButtonLabel="Add Document"
        secondaryButtonLabel="cancel"
        width="900px"
        secondaryButtonHandler={onCancel}
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(3,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormInput name="documentName" label="Document Name" />
            </GridItem>
            <GridItem>
              <FormInput name="documentID" label="Document ID" />
            </GridItem>
            <GridItem>
              <FormSelect name="documentID" label="No. of Files" options={[]} />
            </GridItem>
            <GridItem>
              <FormSelect name="documentID" label="Type" options={[]} />
            </GridItem>
            <GridItem>
              <FormInput
                textAlign="right"
                rightAddonText="kb"
                name="documentID"
                label="File Size"
              />
            </GridItem>

            <GridItem colSpan={3}>
              <FormTextArea name="documentID" label="Description" />
            </GridItem>
          </Grid>
        </FormProvider>
      </Modal>
    </>
  );
};

export default CbsSettingsFeatureDocuments;
