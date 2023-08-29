import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection } from '@myra-ui';

import {
  DividendDistributionCondition,
  DividendTransferTreatment,
  ShareDividendInput,
  usePostShareDividendMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout, FormLeafCoaHeadSelect } from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

import {
  DistributionConditionComp,
  DividendTransferTreatmentSection,
  ShareDistribution,
} from '../components';

export const NewShareDividendPosting = () => {
  const router = useRouter();

  const methods = useForm<ShareDividendInput>({
    defaultValues: {
      condition: DividendDistributionCondition.Daily,
      treatment: DividendTransferTreatment.ShareAndAccount,
    },
  });

  const { mutateAsync: postShareDividend } = usePostShareDividendMutation();

  const handleSubmit = () => {
    asyncToast({
      id: 'share-dividend-posting',
      msgs: { loading: 'Posting share dividend', success: 'Share dividend posted' },
      promise: postShareDividend({ data: methods.getValues() }),
      onSuccess: () => router.push(ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_LIST),
    });
  };

  return (
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

          <FormSection header="Share Dividend Payable Ledger Mapping" divider={false}>
            <FormLeafCoaHeadSelect name="payableCOAHead" label="Ledger Mapping" />
          </FormSection>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Submit" mainButtonHandler={handleSubmit} />
    </FormLayout>
  );
};
