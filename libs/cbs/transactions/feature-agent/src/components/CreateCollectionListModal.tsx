import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { IoAdd, IoCloseCircleOutline } from 'react-icons/io5';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { HStack } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { chakraComponents } from 'chakra-react-select';
import { chakraDefaultStyles } from 'libs/@myra/editable-table/src/utils/ChakraSelectTheme';

import { asyncToast, Box, Button, FormSection, Icon, Modal, Text } from '@myra-ui';

import {
  Arrange,
  ObjState,
  useCreateCollectionMutation,
  useGetAccountTableListMinimalQuery,
  useListAgentMemberQuery,
  useListCollectionTemplateQuery,
  useUpdateCollectionMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

interface ICreateCollectionListModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectionId?: string;
}

export const CreateCollectionListModal = ({
  isOpen,
  onClose,
  collectionId,
}: ICreateCollectionListModalProps) => {
  const [isCloseAlertModalOpen, setIsCloseAlertModalOpen] = useState(false);

  const router = useRouter();

  const id = router?.query?.['id'];

  const queryClient = useQueryClient();

  const methods = useForm();

  const { getValues, reset } = methods;

  const { data: assignedMembersListData } = useListAgentMemberQuery(
    {
      // id: id as string,
      pagination: {
        ...getPaginationQuery(),
        first: -1,
        order: {
          arrange: Arrange.Desc,
          column: 'memberid',
        },
      },
      filter: {
        orConditions: [
          { andConditions: [{ column: 'agentid', comparator: 'EqualTo', value: id as string }] },
        ],
      },
    },
    { enabled: !!id }
  );

  const memberOptions = useMemo(
    () =>
      assignedMembersListData?.agent?.listAgentMember?.edges?.map((member) => ({
        label: `${member?.node?.memberName} [${member?.node?.memberCode}]`,
        value: member?.node?.memberID as string,
      })) ?? [],
    [assignedMembersListData]
  );

  const { control, watch } = methods;

  const { fields, append, remove } = useFieldArray({ name: 'collection', control });

  const collection = watch('collection');

  const { data: collectionDetailData } = useListCollectionTemplateQuery(
    {
      collectionID: collectionId as string,
    },
    {
      enabled: !!collectionId,
    }
  );

  useDeepCompareEffect(() => {
    if (collectionDetailData) {
      const collectionDetail = collectionDetailData?.collection?.listCollectionTemplate;

      reset({
        name: collectionDetail?.collectionName,
        collection: collectionDetail?.data?.map((c) => ({
          memberId: {
            label: `${c?.memberName} [${c?.memberCode}]`,
            value: c?.memberID,
          },
          accountId: {
            label: `${c?.accountName} [${c?.accountId}]`,
            value: c?.accountId,
          },
        })),
      });
    }
  }, [collectionDetailData]);

  const { mutateAsync: createCollection } = useCreateCollectionMutation();
  const { mutateAsync: updateCollection } = useUpdateCollectionMutation();

  const handleSave = () => {
    const values = getValues();

    if (collectionId) {
      asyncToast({
        id: 'update-agent-collection-template',
        msgs: {
          success: 'Collection Updated Successfully!!',
          loading: 'Updating Collection',
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['listCollection']);
          queryClient.invalidateQueries(['listCollectionTemplate']);
          reset({ name: '', collection: [] });
          onClose();
        },
        promise: updateCollection({
          collectionID: collectionId as string,
          collectionName: values?.['name'],
          accountId: values?.['collection']?.map((col: { accountId: string }) =>
            col?.['accountId'] &&
            typeof col?.['accountId'] === 'object' &&
            'value' in col['accountId']
              ? col?.['accountId']?.['value']
              : col?.['accountId']
          ),
        }),
      });
    } else {
      asyncToast({
        id: 'create-agent-collection-template',
        msgs: {
          success: 'Collection Created Successfully!!',
          loading: 'Creating Collection',
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['listCollection']);
          handleClose();
          reset({ name: '', collection: [] });
          onClose();
        },
        promise: createCollection({
          agentID: id as string,
          name: values?.['name'],
          accountId: values?.['collection']?.map(
            (col: { accountId: string }) => col?.['accountId']
          ),
        }),
      });
    }
  };

  const handleClose = () => {
    setIsCloseAlertModalOpen(true);
  };

  const handleCloseAlertModalClose = () => {
    setIsCloseAlertModalOpen(false);
  };

  return (
    <>
      <Modal
        open={isOpen}
        closeOnOverlayClick={false}
        onClose={handleClose}
        title={collectionId ? 'Update Collection' : 'Create Collection'}
        primaryButtonLabel={collectionId ? 'Update Collection' : 'Create Collection'}
        primaryButtonHandler={handleSave}
        width="5xl"
        hidePadding
      >
        <FormProvider {...methods}>
          <FormSection templateColumns={1} divider={false}>
            <FormInput name="name" label="Collection List Name" />

            <Box display="flex" flexDirection="column" gap="s4">
              <Text variant="formLabel">Collection</Text>
              <Box display="flex" flexDirection="column">
                <Box
                  display="flex"
                  w="100%"
                  borderTopRadius="br2"
                  h="40px"
                  alignItems="center"
                  bg="gray.700"
                  color="white"
                >
                  <Text flexBasis="50%" fontWeight="600" fontSize="r1" px="s8">
                    Member
                  </Text>

                  <Text flexBasis="50%" fontWeight="600" fontSize="r1" px="s8">
                    Account
                  </Text>
                </Box>

                <Box w="100%" bg="white" borderX="1px" borderColor="border.layout">
                  {fields.map((item, index) => (
                    <HStack
                      w="100%"
                      minH="36px"
                      alignItems="stretch"
                      bg="white"
                      spacing={0}
                      borderBottom="1px"
                      borderBottomColor="border.layout"
                      key={item?.id}
                    >
                      <Box flexBasis="50%">
                        <FormSelect
                          name={`${'collection'}.${index}.memberId`}
                          options={memberOptions}
                          chakraStyles={chakraDefaultStyles}
                          components={{
                            SingleValue: (props) => <chakraComponents.SingleValue {...props} />,
                            DropdownIndicator: () => null,
                          }}
                          placeholder="Select Member"
                          menuPosition="fixed"
                        />
                      </Box>

                      <Box flexBasis="50%" borderLeft="1px" borderLeftColor="border.layout">
                        <AccountSelectCell
                          memberId={
                            collection[index]?.memberId &&
                            typeof collection[index]?.memberId === 'object' &&
                            'value' in collection[index].memberId
                              ? collection[index]?.memberId?.['value']
                              : collection[index]?.memberId
                          }
                          index={index}
                        />
                      </Box>

                      <Box
                        as="button"
                        w="s36"
                        minH="s36"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                        borderLeft="1px"
                        borderLeftColor="border.layout"
                        cursor={router?.asPath?.includes('/view') ? 'not-allowed' : 'pointer'}
                        pointerEvents={router?.asPath?.includes('/view') ? 'none' : 'auto'}
                        _focus={{ bg: 'background.500' }}
                        _focusVisible={{ outline: 'none' }}
                        _hover={{ bg: 'gray.100' }}
                        data-testid={`deleteRow-${index}`}
                        onClick={() => {
                          remove(index);
                        }}
                        flexBasis="5%"
                      >
                        <Icon as={IoCloseCircleOutline} color="danger.500" fontSize="2xl" />
                      </Box>
                    </HStack>
                  ))}
                </Box>

                <Box
                  w="100%"
                  bg="white"
                  borderBottom="1px"
                  borderX="1px"
                  borderColor="border.layout"
                  borderBottomRadius="br2"
                  h="36px"
                  px="s8"
                  display="flex"
                  alignItems="center"
                  color="gray.600"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  gap="s4"
                  onClick={async () => {
                    append({});
                  }}
                >
                  <Icon as={IoAdd} fontSize="xl" color="primary.500" />
                  <Text color="primary.500" fontSize="s3" lineHeight="1.5">
                    New
                  </Text>
                </Box>
              </Box>
            </Box>
          </FormSection>
        </FormProvider>
      </Modal>
      <Modal open={isCloseAlertModalOpen} onClose={handleCloseAlertModalClose}>
        <Text my="s16">
          Are you sure you want to close this modal?. All the progress will be lost
        </Text>
        <Box display="flex" justifyContent="flex-end" gap="s8">
          <Button
            variant="outline"
            onClick={() => {
              handleCloseAlertModalClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              reset({ name: '', collection: [] });
              onClose();
            }}
          >
            Yes
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const AccountSelectCell = ({ memberId, index }: { memberId: string; index: number }) => {
  const { data: accountListData, isFetching } = useGetAccountTableListMinimalQuery(
    {
      paginate: { ...getPaginationQuery(), first: -1 },
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'objState',
                comparator: 'EqualTo',
                value: ObjState.Active,
              },
              {
                column: 'memberId',
                comparator: 'EqualTo',
                value: memberId,
              },
            ],
          },
        ],
      },
    },
    { enabled: !!memberId }
  );

  const options = useMemo(
    () =>
      memberId
        ? accountListData?.account?.list?.edges?.map((acc) => ({
            label: `${acc?.node?.accountName} [${acc?.node?.id}]`,
            value: acc?.node?.id as string,
          }))
        : [],
    [accountListData, memberId]
  );

  const { setValue } = useFormContext();

  useEffect(() => {
    if (!memberId) {
      setValue(`${'collection'}.${index}.accountId`, '');
    }
  }, [memberId]);

  return (
    <FormSelect
      name={`${'collection'}.${index}.accountId`}
      options={options}
      isLoading={isFetching}
      chakraStyles={chakraDefaultStyles}
      components={{
        SingleValue: (props) => <chakraComponents.SingleValue {...props} />,
        DropdownIndicator: () => null,
      }}
      placeholder="Select Account"
      menuPosition="fixed"
    />
  );
};
