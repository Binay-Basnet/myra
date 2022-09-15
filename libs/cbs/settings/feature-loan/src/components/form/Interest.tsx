import { DepositFrequency } from '@coop/cbs/data-access';
import { SubText } from '@coop/shared/components';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SubHeadingText } from '../formui';

export const Interest = () => {
  const { t } = useTranslation();

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  const postingFrequency = [
    {
      label: t['monthly'],
      value: DepositFrequency.Monthly,
    },
    {
      label: t['quaterly'],
      value: DepositFrequency.Quarterly,
    },
    {
      label: t['halfYearly'],
      value: DepositFrequency.HalfYearly,
    },
    {
      label: t['yearly'],
      value: DepositFrequency.Yearly,
    },
  ];

  return (
    <FormSection header="loanProductInterest">
      <FormInput
        name="interest.minRate"
        type="number"
        label={t['loanProductMinimumRate']}
        textAlign={'right'}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
      <FormInput
        name="interest.maxRate"
        type="number"
        label={t['loanProductMaximumRate']}
        textAlign={'right'}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
      <FormInput
        name="interest.defaultRate"
        type="number"
        label={t['loanProductDefaultRate']}
        textAlign={'right'}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
      <FormInput
        name="interest.ceoAuthority"
        type="number"
        label={t['loanProductCEOAuthority']}
        textAlign={'right'}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
      <FormInput
        name="interest.boardAuthority"
        type="number"
        label={t['loanProductBoardAuthority']}
        textAlign={'right'}
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s48">
          <Box
            display={'flex'}
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}
            mt="s16"
          >
            <Box>
              <SubHeadingText>{t['loanProductUpdateInterest']} </SubHeadingText>
              <SubText>{t['loanProductUpdateInterestForIndividual']}</SubText>
            </Box>
            <FormSwitchTab name="updateInterest" options={yesNo} />
          </Box>
          <Box
            display={'flex'}
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}
            mt="s16"
          >
            <Box>
              <SubHeadingText>{t['loanProductWaiveInterest']} </SubHeadingText>
              <SubText>{t['loanProductWaiveInterestforindividual']}</SubText>
            </Box>
            <FormSwitchTab name="waiveInterest" options={yesNo} />
          </Box>
          <Box w="35%">
            <FormSelect
              name="postingFrequency"
              label={t['loanProductPostingFrequency']}
              options={postingFrequency}
            />
          </Box>
        </Box>
      </GridItem>
    </FormSection>
  );
};