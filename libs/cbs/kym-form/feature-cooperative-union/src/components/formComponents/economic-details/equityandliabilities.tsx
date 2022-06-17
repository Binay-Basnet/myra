import { useMemo } from 'react';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';

export const KymEquilities = ({ watch }: any) => {
  // const cashCurrent = watch('cashAndCashEquivalentCurrent');
  // const bankCurrent = watch('bankCurrent');
  // const investemntCurrent = watch('investmentsCurrent');
  // const loanCurrent = watch('loanCurrent');
  // const nonCurrentAssetsCurrent = watch('nonCurrentAssetsCurrent');
  // const otherNonCurrentAssetsCurrent = watch('otherNonCurrentAssetsCurrent');

  // const totalassestscurrent = useMemo(() => {
  //   return (
  //     Number(cashCurrent) +
  //     Number(bankCurrent) +
  //     Number(investemntCurrent) +
  //     Number(loanCurrent) +
  //     Number(nonCurrentAssetsCurrent) +
  //     Number(otherNonCurrentAssetsCurrent)
  //   );
  // }, [
  //   cashCurrent,
  //   bankCurrent,
  //   investemntCurrent,
  //   loanCurrent,
  //   nonCurrentAssetsCurrent,
  //   otherNonCurrentAssetsCurrent,
  // ]);
  // const cashTarget = watch('cashAndCashEquivalentTarget');
  // const bankTarget = watch('bankTarget');
  // const investmentsTarget = watch('investmentsTarget');
  // const loanTarget = watch('loanTarget');
  // const currentAssetsTarget = watch('nonCurrentAssetsTarget');
  // const nonCurrentAssetsTarget = watch('otherNonCurrentAssetsTarget');

  // const totalassestsTARGET = useMemo(() => {
  //   return (
  //     Number(cashTarget) +
  //     Number(bankTarget) +
  //     Number(investmentsTarget) +
  //     Number(loanTarget) +
  //     Number(currentAssetsTarget) +
  //     Number(nonCurrentAssetsTarget)
  //   );
  // }, [
  //   cashTarget,
  //   bankTarget,
  //   investmentsTarget,
  //   loanTarget,
  //   currentAssetsTarget,
  //   nonCurrentAssetsTarget,
  // ]);

  const ShareCurrent = watch('shareCapitalCurrent');
  const ShareTarget = watch('shareCapitalTarget');
  const reserveCurrent = watch('reserveAndSurplusCurrent');
  const reserveTarget = watch('reserveAndSurplusTarget');
  const savingDepositCurrent = watch('savingDepositCurrent');
  const savingDepositTarget = watch('savingDepositTarget');
  const loanAccountCurrent = watch('loanAccountCurrent');
  const loanAccountTarget = watch('loanAccountTarget');
  const capitalGrantCurrent = watch('capitalGrantCurrent');
  const capitalGrantTarget = watch('capitalGrantTarget');
  const currentLiabilitiesCurrent = watch('currentLiabilitiesCurrent');
  const currentLiabilitiesTarget = watch('currentLiabilitiesTarget');
  const nonCurrentLiabilitiesCurrent = watch('nonCurrentLiabilitiesCurrent');
  const nonCurrentLiabilitiesTarget = watch('nonCurrentLiabilitiesTarget');
  const totalequitycurrent = useMemo(() => {
    return (
      Number(ShareCurrent) +
      Number(reserveCurrent) +
      Number(savingDepositCurrent) +
      Number(loanAccountCurrent) +
      Number(capitalGrantCurrent) +
      Number(currentLiabilitiesCurrent) +
      Number(nonCurrentLiabilitiesCurrent)
    );
  }, [
    ShareCurrent,
    reserveCurrent,
    savingDepositCurrent,
    loanAccountCurrent,
    capitalGrantCurrent,
    currentLiabilitiesCurrent,
    nonCurrentLiabilitiesCurrent,
  ]);
  const totalequityTarget = useMemo(() => {
    return (
      Number(ShareTarget) +
      Number(reserveTarget) +
      Number(savingDepositTarget) +
      Number(loanAccountTarget) +
      Number(capitalGrantTarget) +
      Number(currentLiabilitiesTarget) +
      Number(nonCurrentLiabilitiesTarget)
    );
  }, [
    ShareTarget,
    reserveTarget,
    savingDepositTarget,
    loanAccountTarget,
    capitalGrantTarget,
    currentLiabilitiesTarget,
    nonCurrentLiabilitiesTarget,
  ]);
  console.log('first', totalequityTarget);
  return (
    <Box
      display="flex"
      flexDirection="column"
      id="Equity and Liailibities"
      scrollMarginTop={'200px'}
    >
      <Grid
        columnGap={40}
        alignItems="center"
        px="s14"
        templateColumns="repeat(3,1fr)"
      >
        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Equity and Liailibities
          </Text>
        </GridItem>

        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Current
          </Text>
        </GridItem>

        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Target for next fiscal year
          </Text>
        </GridItem>
      </Grid>

      <Divider />

      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Share Capital
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="shareCapitalCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="shareCapitalTarget"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>
      <Divider />
      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Reserve and surplus
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="reserveAndSurplusCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="reserveAndSurplusTarget"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>
      <Divider />
      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Saving/Deposit
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="savingDepositCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="savingDepositTarget"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>
      <Divider />
      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Loan Account (External Loan)
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="loanAccountCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="loanAccountTarget"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>
      <Divider />
      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Capital Grant
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="capitalGrantCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="capitalGrantTarget"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>
      <Divider />
      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Current Liabilities and payable
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="currentLiabilitiesCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="currentLiabilitiesTarget"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>
      <Divider />
      <Grid
        alignItems="center"
        px="s8"
        py="s12"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="Regular"
          >
            Non-current liabilities
          </Text>
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="nonCurrentLiabilitiesCurrent"
            placeholder="0.00"
          />
        </GridItem>
        <GridItem>
          <FormInput
            textAlign="right"
            type="number"
            name="nonCurrentLiabilitiesTarget"
            placeholder="0.00"
          />
        </GridItem>
      </Grid>
      <Divider />
      {/* .................................last part ............................... */}
      <Grid
        alignItems="center"
        px="14px"
        py="s16"
        templateColumns="repeat(3,1fr)"
        gap="s40"
      >
        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            Total
          </Text>
        </GridItem>

        <GridItem>
          <FormInput
            isDisabled={true}
            bg="neutralColorLight.Gray-20"
            border="1px solid"
            borderColor="disabled.disabled"
            textAlign="right"
            type="text"
            name="totalEquityAndLiabilitiesCurrent"
            value={totalequitycurrent}
            placeholder="Total assets"
          />
        </GridItem>
        <GridItem>
          <FormInput
            isDisabled={true}
            bg="neutralColorLight.Gray-20"
            border="1px solid"
            borderColor="disabled.disabled"
            textAlign="right"
            type="text"
            name="totalEquityAndLiabilitiesTarget"
            value={totalequityTarget}
            placeholder="Total "
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
