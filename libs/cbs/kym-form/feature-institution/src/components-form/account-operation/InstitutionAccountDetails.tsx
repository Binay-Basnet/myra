import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

import {
  RootState,
  useAppSelector,
  useDeleteAccountOperatorInstitutionMutation,
  useGetInsAccountOperatorEditListQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { DynamicBoxGroupContainer, SectionContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormAddress, FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Button, Collapse, FormSection, GridItem, Icon, IconButton, Text } from '@myra-ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { BottomDocument } from './components/BottomComponents';
import { useAccountOperator } from '../hooks/useAccountOperation';

interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  accountId: string;
}

const AddAccountDetails = ({ removeDirector, setKymCurrentSection, accountId }: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch } = methods;

  useAccountOperator({ methods, accountOpId: accountId });

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch('isTemporaryAndPermanentAddressSame');

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        borderRadius="br2"
        borderBottomRadius={isOpen ? '0' : 'br2'}
        overflow="hidden"
      >
        <Box
          flex={1}
          px="s16"
          h="60px"
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">Account Operator</Text>
          <Box>
            {isOpen ? (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronUpOutline} />}
              />
            ) : (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronDownOutline} />}
              />
            )}
          </Box>
        </Box>
        {!isOpen && (
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={() => {
              removeDirector(accountId);
            }}
          />
        )}
      </Box>

      <Collapse in={isOpen} style={{ marginTop: '0px', borderRadius: 'br2', overflow: 'hidden' }}>
        <SectionContainer
          mt="0"
          pt="s16"
          border="1px solid"
          borderColor="border.layout"
          borderBottom="0px"
          pb="s20"
        >
          {' '}
          <FormProvider {...methods}>
            <form
              onFocus={(e) => {
                const kymSection = getKymSectionInstitution(e.target.id);
                setKymCurrentSection(kymSection);
              }}
            >
              <Box display="flex" flexDirection="column">
                <FormSection>
                  <FormInput
                    id="AccountOperatorInstitution"
                    type="text"
                    name="name"
                    label={t['kymInsFullName']}
                  />
                  <FormInput
                    id="AccountOperatorInstitution"
                    type="text"
                    name="contact"
                    label={t['kymInsContactNo']}
                  />
                  <FormInput
                    id="AccountOperatorInstitution"
                    type="text"
                    name="email"
                    label={t['kymInsEmail']}
                  />
                </FormSection>

                <FormSection header="kymInsPermanentAddress">
                  <FormAddress name="permanentAddress" />
                </FormSection>

                <Box
                  id="Temporary Address"
                  pt="s20"
                  display="flex"
                  flexDirection="column"
                  scrollMarginTop="200px"
                >
                  <Box display="flex" flexDirection="column" gap="s16" px="s20">
                    <Text fontSize="r1" fontWeight="SemiBold">
                      {t['kymInsTemporaryAddress']}
                    </Text>

                    <FormSwitch
                      id="AccountOperatorInstitution"
                      name="isTemporaryAndPermanentAddressSame"
                      label={t['kymInsTemporaryAddressPermanent']}
                    />
                  </Box>

                  <FormSection>
                    {!isPermanentAndTemporaryAddressSame && (
                      <FormAddress sectionId="AccountOperatorInstitution" name="temporaryAddress" />
                    )}
                  </FormSection>
                </Box>
              </Box>
            </form>
          </FormProvider>
          <Box>
            <Box display="flex" flexDirection="row" justifyContent="flex-start" gap="s16">
              <FormProvider {...methods}>
                <form
                  onFocus={(e) => {
                    const kymSection = getKymSectionInstitution(e.target.id);
                    setKymCurrentSection(kymSection);
                  }}
                >
                  <Box
                    px="s20"
                    py="s16"
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap="s20"
                  >
                    <FormSelect
                      id="AccountOperatorInstitution"
                      name="designation"
                      label={t['kymInsDesignation']}
                      options={[
                        { value: 'President', label: 'President' },
                        { value: 'Vice President', label: 'Vice-President' },
                        { value: 'Secretary', label: 'Secretary' },
                        { value: 'Treasurer', label: 'Treasurer' },
                      ]}
                    />
                    <FormInput name="panNo" label={t['kymInsPanNo']} />
                    <BottomDocument
                      accountId={accountId}
                      setKymCurrentSection={setKymCurrentSection}
                    />
                  </Box>
                </form>
              </FormProvider>
            </Box>
          </Box>
        </SectionContainer>

        <Box
          display="flex"
          justifyContent="flex-end"
          borderTopColor="none"
          border="1px solid"
          borderColor="border.layout"
          alignItems="center"
          h="60px"
          px="s20"
          borderBottomRadius="br2"
        >
          <Button
            id="accountOperatorClose"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => {
              removeDirector(accountId);
            }}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const InstitutionKYMAccountDetail = ({ setSection }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = router?.query?.['id'] as string;

  const [accOperatorIds, setAccOperatorIds] = useState<string[]>([]);

  const { data: editValues, refetch: refetchEdit } = useGetInsAccountOperatorEditListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.institution?.listAccountOperators?.data;

      setAccOperatorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal?.id ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);

  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetchEdit();
  }, [preference?.date]);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setAccOperatorIds([...accOperatorIds, res.newId]);
    },
  });

  const { mutate: deleteMutate } = useDeleteAccountOperatorInstitutionMutation({
    onSuccess: (res) => {
      const deletedId = String(res?.members?.institution?.accountOperator?.Delete?.recordId);
      const tempAccountOperatorIds = [...accOperatorIds];
      tempAccountOperatorIds.splice(tempAccountOperatorIds.indexOf(deletedId), 1);
      setAccOperatorIds([...tempAccountOperatorIds]);
    },
  });

  const addAccountOperator = () => {
    newIdMutate({});
  };

  const removeAccountOperator = (accOperatorId: string) => {
    deleteMutate({ insId: id, acc: accOperatorId });
  };
  return (
    <FormSection id="kymInsDetailsofAccountOperators" header="kymInsDetailsofAccountOperators">
      <GridItem colSpan={3}>
        <DynamicBoxGroupContainer>
          {accOperatorIds.map((accOperatorId) => (
            <Box key={accOperatorId} display="flex" flexDirection="column">
              <AddAccountDetails
                setKymCurrentSection={setSection}
                removeDirector={removeAccountOperator}
                accountId={accOperatorId}
              />
            </Box>
          ))}
          <Button
            id="accountOperatorDetailsButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              addAccountOperator();
            }}
          >
            {t['kymInsNewOperator']}
          </Button>
        </DynamicBoxGroupContainer>
      </GridItem>
    </FormSection>
  );
};
