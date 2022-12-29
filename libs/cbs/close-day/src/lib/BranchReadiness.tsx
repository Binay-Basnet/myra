import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Container, FormFooter, FormHeader, Text } from '@myra-ui';

import {
  clearBranchReadinessErrors,
  EodState,
  setBranchReadinessErrors,
  useAppDispatch,
  useAppSelector,
  useReadyBranchEodMutation,
} from '@coop/cbs/data-access';

import { StatusList } from '../component';

/* eslint-disable-next-line */
export interface BranchReadinessProps {}

export const BranchReadiness = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const branchReadinessErrors = useAppSelector((state) => state?.dayEnd?.branchReadinessErrors);

  const statusList = useMemo(
    () => [
      {
        title: 'Cash in Teller',
        subTitle: 'Check if all the cash in teller account is equal to 0.',
        status: branchReadinessErrors?.length ? EodState.CompletedWithErrors : EodState.Completed,
        errors: branchReadinessErrors,
      },
    ],
    [branchReadinessErrors]
  );

  const { mutate: readyBranch } = useReadyBranchEodMutation({
    onSuccess: (data) => {
      if (data?.transaction?.readyBranchEOD?.length) {
        dispatch(setBranchReadinessErrors({ errors: data.transaction.readyBranchEOD }));
      } else {
        dispatch(clearBranchReadinessErrors());
      }
    },
  });

  useEffect(() => {
    readyBranch({});
  }, []);

  return (
    <>
      <Box bg="gray.100" width="100%" position="sticky" top={110} zIndex={10}>
        <Container minW="container.lg" height="fit-content" paddingInline="0">
          <FormHeader title="Branch Readiness" />
        </Container>
      </Box>
      <Container bg="white" minHeight="calc(100vh - 110px)" pb="90px" minW="container.lg">
        <Box display="flex" flexDirection="column" py="s16">
          <Box display="flex" flexDirection="column">
            <Box display="flex" py="s16" justifyContent="space-between" alignItems="center">
              <Text
                fontSize="r2"
                fontWeight="SemiBold"
                color="neutralColorLight.Gray-80"
                lineHeight="s20"
              >
                In order to perform day end by the head office, branch readiness must be completed.
              </Text>

              {/* <Button leftIcon={<IoRefreshOutline />} onClick={() => readyBranch({})}>
                Reload
              </Button> */}
            </Box>

            <StatusList statusList={statusList} />
          </Box>
        </Box>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              mainButtonLabel="Complete"
              mainButtonHandler={() => router?.push('/')}
              isMainButtonDisabled={!!branchReadinessErrors?.length}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default BranchReadiness;
