import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

// import debounce from 'lodash/debounce';
import {
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  DepositProductInput,
  NatureOfDepositProduct,
  useSetDepositProductMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  AccountServicesCharge,
  BalanceLimit,
  Critera,
  DefaultAccountName,
  DepositFrequency,
  DormantSetup,
  GridItems,
  Interest,
  MaximumTenure,
  MinimunTenure,
  PostingFrequency,
  PrematuredPenalty,
  Questions,
  RequiredDocumentSetup,
  TypesOfMember,
} from '../components/form';

/* eslint-disable-next-line */
export interface SettingsDepositProductsAddProps {}

export function SettingsDepositProductsAdd(
  props: SettingsDepositProductsAddProps
) {
  const router = useRouter();
  const { t } = useTranslation();

  const { mutate } = useSetDepositProductMutation();

  const optionsSaving = [
    {
      label: t['depositProductRecurringSaving'],
      value: NatureOfDepositProduct.RecurringSaving,
    },
    {
      label: t['depositProductMandatory'],
      value: NatureOfDepositProduct.Mandatory,
    },
    {
      label: t['depositProductVoluntaryOptional'],
      value: NatureOfDepositProduct.VoluntaryOrOptional,
    },
    {
      label: t['depositProductTermSaving'],
      value: NatureOfDepositProduct.TermSavingOrFd,
    },
  ];

  const methods = useForm<DepositProductInput>({
    defaultValues: {
      nature: NatureOfDepositProduct.RecurringSaving,
      minTenureUnitNumber: 0,
      maxTenureUnitNumber: 0,
    },
  });

  const {
    // control, handleSubmit,
    getValues,
    watch,
    //  setError
  } = methods;
  const depositNature = watch('nature');

  const submitForm = () => {
    console.log(getValues());
    mutate({ id: '', data: getValues() });
    // router.push(`/members/translation`);
  };

  return (
    <>
      <Container height="fit-content" minW="container.lg" p="0">
        <Box position="relative" margin="0px auto">
          <Box
            position="fixed"
            margin="0px auto"
            bg="gray.100"
            minW="container.lg"
            zIndex="10"
          >
            <Box
              height="50px"
              display="flex"
              justifyContent="space-between"
              alignItems={'center'}
              px="5"
              background="white"
              borderBottom="1px solid #E6E6E6"
            >
              <Text fontSize="r2" fontWeight="SemiBold">
                {t['depositProductAddDepositProducts']}
              </Text>
              <IconButton
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoCloseOutline} size="md" />}
                onClick={() => router.back()}
              />
            </Box>
          </Box>
        </Box>
      </Container>
      <Container bg="white" height="fit-content" minW="container.lg" pb="120px">
        <FormProvider {...methods}>
          <form>
            {/* main */}
            <Box px="s20" py="s24">
              <ContainerWithDivider>
                <Box background="white" mt="50px">
                  <InputGroupContainer>
                    <GridItem colSpan={2}>
                      <FormInput
                        name="productName"
                        label={t['depositProductProductName']}
                        placeholder={t['depositProductEnterProductName']}
                      />
                    </GridItem>
                    <FormSelect
                      name="nature"
                      options={optionsSaving}
                      label={t['depositProductNatureofDepositProduct']}
                      placeholder={
                        t['depositProductSelectNatureofDepositProduct']
                      }
                    />
                  </InputGroupContainer>
                </Box>
                <Box>
                  <Text fontWeight="Medium" fontSize={'r1'} color="gray.700">
                    {t['depositProductProductCode']}
                  </Text>
                  <Text fontWeight="Regular" fontSize="s2" color="gray.700">
                    {t['depositProductAddprefixintial']}
                  </Text>
                  <InputGroupContainer mt="s16">
                    <FormInput
                      label={t['depositProductPrefix']}
                      placeholder={t['depositProductEnterPrefix']}
                      name="productCode.prefix"
                    />
                    <FormInput
                      label={t['depositProductIntitialNumber']}
                      placeholder={t['depositProductIntitialNumber']}
                      name="productCode.initialNo"
                    />
                  </InputGroupContainer>
                </Box>
                {depositNature !== NatureOfDepositProduct.Mandatory && (
                  <TypesOfMember />
                )}

                {depositNature !== NatureOfDepositProduct.Mandatory && (
                  <Box display="flex" flexDirection={'column'} gap="s16">
                    <Critera />
                    <GridItems />
                  </Box>
                )}
                {depositNature !==
                  NatureOfDepositProduct.VoluntaryOrOptional && (
                  <DepositFrequency />
                )}
                {depositNature !==
                  NatureOfDepositProduct.VoluntaryOrOptional && (
                  <MinimunTenure />
                )}
                {depositNature !==
                  NatureOfDepositProduct.VoluntaryOrOptional && (
                  <MaximumTenure />
                )}
                <BalanceLimit />
                <Interest />
                <PostingFrequency />
                {depositNature !== NatureOfDepositProduct.TermSavingOrFd && (
                  <AccountServicesCharge />
                )}

                {depositNature === NatureOfDepositProduct.TermSavingOrFd && (
                  <DefaultAccountName />
                )}
                <Questions />
                {depositNature === NatureOfDepositProduct.Mandatory && (
                  <DormantSetup />
                )}
                <RequiredDocumentSetup />
                {depositNature !==
                  NatureOfDepositProduct.VoluntaryOrOptional && (
                  <PrematuredPenalty />
                )}
              </ContainerWithDivider>
            </Box>
          </form>
        </FormProvider>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
                  </Text>
                  <Text as="i" fontSize="r1">
                    09:41 AM
                  </Text>
                </Box>
              }
              draftButton={
                <Button type="submit" variant="ghost">
                  <Icon as={BiSave} color="primary.500" />
                  <Text
                    alignSelf="center"
                    color="primary.500"
                    fontWeight="Medium"
                    fontSize="s2"
                    ml="5px"
                  >
                    {t['saveDraft']}
                  </Text>
                </Button>
              }
              mainButtonLabel={t['saveAccount']}
              mainButtonHandler={() => submitForm()}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default SettingsDepositProductsAdd;
