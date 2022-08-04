import { FormProvider, useForm } from 'react-hook-form';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const KymEquityLiabilities = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });

  const { watch } = methods;
  useCooperative({ methods });
  const shareCapital = watch('shareCapital');
  const reserveAndSurplus = watch('reserveAndSurplus');
  const savingDeposit = watch('savingDeposit');
  const loanAccount = watch('loanAccount');
  const capitalGrant = watch('capitalGrant');
  const currentLiabilities = watch('currentLiabilities');
  const nonCurrentLiabilities = watch('nonCurrentLiabilities');

  const totalEquityAndLiabilities =
    Number(shareCapital) +
    Number(reserveAndSurplus) +
    Number(savingDeposit) +
    Number(loanAccount) +
    Number(capitalGrant) +
    Number(currentLiabilities) +
    Number(nonCurrentLiabilities);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <Box
          id="kymCoopAccEquityandLiabilities"
          display="flex"
          flexDirection="column"
        >
          <Grid
            columnGap={40}
            alignItems="center"
            px="s14"
            templateColumns="repeat(2,1fr)"
          >
            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                Equity and Liabilities
              </Text>
            </GridItem>

            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopAmount']}
              </Text>
            </GridItem>
          </Grid>

          <Divider />

          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
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
                min={0}
                name="shareCapital"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
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
                min={0}
                name="reserveAndSurplus"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
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
                min={0}
                name="savingDeposit"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
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
                min={0}
                name="loanAccount"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
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
                min={0}
                name="capitalGrant"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
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
                min={0}
                name="currentLiabilities"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
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
                min={0}
                name="nonCurrentLiabilities"
                placeholder="0.00"
              />
            </GridItem>
          </Grid>

          <Divider />

          <Grid
            alignItems="center"
            px="14px"
            py="s16"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopTotal']}
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
                name="totalEquityLiabilities"
                value={
                  isNaN(totalEquityAndLiabilities)
                    ? '0.00'
                    : totalEquityAndLiabilities
                }
                placeholder={t['kymCoopEnterTotalEquityandliabilities']}
              />
            </GridItem>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
