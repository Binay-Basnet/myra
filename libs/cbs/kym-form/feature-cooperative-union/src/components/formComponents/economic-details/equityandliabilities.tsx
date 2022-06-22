import { useMemo } from 'react';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymEquilities = ({ watch }: any) => {
  const { t } = useTranslation();
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

  const ShareCurrent = isNaN(watch('shareCapitalCurrent'))
    ? 0
    : watch('shareCapitalCurrent');
  const ShareTarget = isNaN(watch('shareCapitalTarget'))
    ? 0
    : watch('shareCapitalTarget');
  const reserveCurrent = isNaN(watch('reserveAndSurplusCurrent'))
    ? 0
    : watch('reserveAndSurplusCurrent');
  const reserveTarget = isNaN(watch('reserveAndSurplusTarget'))
    ? 0
    : watch('reserveAndSurplusTarget');
  const savingDepositCurrent = isNaN(watch('savingDepositCurrent'))
    ? 0
    : watch('savingDepositCurrent');
  const savingDepositTarget = isNaN(watch('savingDepositTarget'))
    ? 0
    : watch('savingDepositTarget');
  const loanAccountCurrent = isNaN(watch('loanAccountCurrent'))
    ? 0
    : watch('loanAccountCurrent');
  const loanAccountTarget = isNaN(watch('loanAccountTarget'))
    ? 0
    : watch('loanAccountTarget');
  const capitalGrantCurrent = isNaN(watch('capitalGrantCurrent'))
    ? 0
    : watch('capitalGrantCurrent');
  const capitalGrantTarget = isNaN(watch('capitalGrantTarget'))
    ? 0
    : watch('capitalGrantTarget');
  const currentLiabilitiesCurrent = isNaN(watch('currentLiabilitiesCurrent'))
    ? 0
    : watch('currentLiabilitiesCurrent');
  const currentLiabilitiesTarget = isNaN(watch('currentLiabilitiesTarget'))
    ? 0
    : watch('currentLiabilitiesTarget');
  const nonCurrentLiabilitiesCurrent = isNaN(
    watch('nonCurrentLiabilitiesCurrent')
  )
    ? 0
    : watch('nonCurrentLiabilitiesCurrent');
  const nonCurrentLiabilitiesTarget = isNaN(
    watch('nonCurrentLiabilitiesTarget')
  )
    ? 0
    : watch('nonCurrentLiabilitiesTarget');
  const totalequitycurrent =
    Number(ShareCurrent) +
    Number(reserveCurrent) +
    Number(savingDepositCurrent) +
    Number(loanAccountCurrent) +
    Number(capitalGrantCurrent) +
    Number(currentLiabilitiesCurrent) +
    Number(nonCurrentLiabilitiesCurrent);

  const totalequityTarget =
    Number(ShareTarget) +
    Number(reserveTarget) +
    Number(savingDepositTarget) +
    Number(loanAccountTarget) +
    Number(capitalGrantTarget) +
    Number(currentLiabilitiesTarget) +
    Number(nonCurrentLiabilitiesTarget);

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
            {t['kymCoopUnionEqtEquityandLiailibities']}
          </Text>
        </GridItem>

        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            {t['kymCoopUnionEqtCurrent']}
          </Text>
        </GridItem>

        <GridItem>
          <Text
            mb="s16"
            color="neutralColorLight.Gray-80"
            fontSize="s3"
            fontWeight="SemiBold"
          >
            {t['kymCoopUnionEqtTargetfornextfiscalyear']}
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
            {t['kymCoopUnionEqtShareCapital']}
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
            {t['kymCoopUnionEqtReserveandSurplus']}
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
            {t['kymCoopUnionEqtSavingDeposit']}
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
            {t['kymCoopUnionEqtLoanAccount']}
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
            {t['kymCoopUnionEqtCapitalGrant']}
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
            {t['kymCoopUnionEqtCurrentLiabilitiesandpayable']}
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
            {t['kymCoopUnionEqtNoncurrentliabilities']}
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
            {t['kymCoopUnionEqtTotal']}
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
            placeholder={t['kymCoopUnionEqtTotalassets']}
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
            placeholder={t['kymCoopUnionEqtTotal']}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
