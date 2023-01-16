import { FormProvider, useForm } from 'react-hook-form';

import { Box, Container, FormFooter, FormHeader } from '@myra-ui';

import { DividendDistributionCondition, DividendTransferTreatment } from '@coop/cbs/data-access';

import {
  AccountTransfer,
  BookPayables,
  DistributionCondition,
  DividendTransferTreatmentSection,
  ShareAndAccount,
  ShareDistribution,
  ShareDividendFundInfo,
} from '../components';

export const NewShareDividendPosting = () => {
  const methods = useForm({
    defaultValues: {
      distributionCondition: DividendDistributionCondition.Daily,
      dividendTransferTreatment: DividendTransferTreatment.ShareAndAccount,
    },
  });

  const { watch } = methods;

  const dividendTransferTreatment = watch('dividendTransferTreatment') as DividendTransferTreatment;

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title="Share Dividend Posting"
            // closeLink="/others/share-dividend-posting/list"
          />
        </Box>

        <Box bg="white" pb="s60">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <ShareDividendFundInfo />

                <ShareDistribution />

                <DistributionCondition />

                <DividendTransferTreatmentSection />

                {dividendTransferTreatment === DividendTransferTreatment.ShareAndAccount && (
                  <ShareAndAccount />
                )}

                {dividendTransferTreatment === DividendTransferTreatment.AccountTransfer && (
                  <AccountTransfer />
                )}

                {dividendTransferTreatment === DividendTransferTreatment.BookPayable && (
                  <BookPayables />
                )}
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter mainButtonLabel="Submit" />
          </Container>
        </Box>
      </Box>
    </>
  );
};
