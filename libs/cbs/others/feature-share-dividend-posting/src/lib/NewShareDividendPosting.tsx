import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { asyncToast, Button, FormSection, GridItem, Text } from '@myra-ui';

import {
  DividendDistributionCondition,
  DividendTransferTreatment,
  ShareDividendInput,
  ShareDividendSummary,
  usePostShareDividendMutation,
} from '@coop/cbs/data-access';
import { generateExcelFromJSON, ROUTES } from '@coop/cbs/utils';
import { FormLayout, FormLeafCoaHeadSelect } from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

import {
  DistributionConditionComp,
  DividendPostingErrorModal,
  DividendTransferTreatmentSection,
  ShareDistribution,
} from '../components';

export const NewShareDividendPosting = () => {
  const [mode, setMode] = useState<0 | 1>(0);

  const [summary, setSummary] = useState<ShareDividendSummary[]>([]);

  const router = useRouter();

  const {
    isOpen: isErrorModalOpen,
    onClose: onErrorModalClose,
    onToggle: onErrorModalToggle,
  } = useDisclosure();

  const methods = useForm<ShareDividendInput>({
    defaultValues: {
      condition: DividendDistributionCondition.Daily,
      treatment: DividendTransferTreatment.ShareAndAccount,
    },
  });

  const { mutateAsync: postShareDividend } = usePostShareDividendMutation();

  const handleProcess = () => {
    asyncToast({
      id: 'share-dividend-posting-process',
      msgs: {
        loading: 'Processing share dividend data',
        success: 'Share dividend data processing',
      },
      promise: postShareDividend({ data: methods.getValues(), commit: false }),
      onSuccess: (res) => {
        const resSummary = res?.shareDividend?.postDividend?.summary;

        if (resSummary) {
          setSummary(resSummary as ShareDividendSummary[]);
        }

        setMode(1);
      },
    });
  };

  const handleSubmit = () => {
    asyncToast({
      id: 'share-dividend-posting-submit',
      msgs: {
        loading: 'Posting share dividend',
        success: 'Share dividend posted',
      },
      promise: postShareDividend({ data: methods.getValues(), commit: true }),
      onSuccess: () => router.push(ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_LIST),
    });
  };

  const summaryErrors = useMemo(() => summary?.filter((sum) => !!sum?.Error), [summary]);

  return (
    <>
      <FormLayout methods={methods}>
        <FormLayout.Header
          title={`Share Dividend Posting - ${featureCode.shareDividendPostingList}`}
          // closeLink="/others/share-dividend-posting/list"
        />

        <FormLayout.Content>
          <FormLayout.Form>
            {/* <ShareDividendFundInfo /> */}

            <ShareDistribution />

            <DistributionConditionComp />

            <DividendTransferTreatmentSection />

            <FormSection header="Share Dividend Payable Ledger Mapping">
              <FormLeafCoaHeadSelect name="payableCOAHead" label="Ledger Mapping" />
            </FormSection>

            {summary?.length ? (
              <FormSection header="Summary" divider={false} templateColumns={3}>
                {summaryErrors?.length ? (
                  <GridItem colSpan={3} display="flex" gap="s4" alignItems="center">
                    <Text fontSize="r1">{summaryErrors?.length} errors found.</Text>
                    <Button variant="link" shade="danger" onClick={() => onErrorModalToggle()}>
                      View Errors
                    </Button>
                  </GridItem>
                ) : null}

                <Button
                  onClick={() =>
                    generateExcelFromJSON(
                      summary as Record<string, string>[],
                      'Share Divided Posting'
                    )
                  }
                >
                  Download Summary
                </Button>
              </FormSection>
            ) : null}
          </FormLayout.Form>
        </FormLayout.Content>

        <FormLayout.Footer
          mainButtonLabel={
            mode === 0 ? 'Proceed' : summaryErrors?.length ? 'Ignore and Submit' : 'Submit'
          }
          mainButtonHandler={mode === 0 ? handleProcess : handleSubmit}
        />
      </FormLayout>

      <DividendPostingErrorModal
        isOpen={isErrorModalOpen}
        onClose={onErrorModalClose}
        errors={summaryErrors?.slice(0, 10)?.map((s) => `${s.MemberID} - ${s.Error}`) as string[]}
      />
    </>
  );
};
