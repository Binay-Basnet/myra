import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';

import { Box, Button, FormFooter, Icon, Text, toast } from '@myra-ui';

import {
  addIndividualError,
  setIndividualHasPressedNext,
  useAppDispatch,
  useAppSelector,
  useGetKymFormStatusQuery,
} from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

export const KymIndividualFooter = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const isFormDirty = useAppSelector((state) => state.individual.isFormDirty);

  const dispatch = useAppDispatch();
  const { refetch } = useGetKymFormStatusQuery(
    { id, hasPressedNext: true },
    {
      enabled: false,
    }
  );

  return (
    <FormFooter
      status={
        <Box display="flex" gap="s8">
          <Text as="i" fontSize="r1">
            {t['formDetails']}
          </Text>
        </Box>
      }
      draftButton={
        <Button type="submit" variant="ghost" onClick={() => router.push('/members/list')}>
          <Icon as={BiSave} color="primary.500" />
          <Text alignSelf="center" color="primary.500" fontWeight="Medium" fontSize="s2" ml="5px">
            {t['saveDraft']}
          </Text>
        </Button>
      }
      isMainButtonDisabled={!isFormDirty}
      mainButtonLabel={t['next']}
      mainButtonHandler={async () => {
        const response = await refetch();
        const sectionStatus = response?.data?.members?.individual?.formState?.sectionStatus?.errors;
        const basicAllErrors =
          response?.data?.members?.individual?.formState?.sectionStatus?.errors;

        if (basicAllErrors) {
          dispatch(addIndividualError(basicAllErrors));
        } else {
          dispatch(addIndividualError({}));
        }
        if (response) {
          dispatch(setIndividualHasPressedNext(true));
          if (!sectionStatus) {
            router.push(`/members/translation/${router.query['id']}`);
          } else {
            toast({
              id: 'validation-error',
              message: 'Some fields are empty or have error',
              type: 'error',
            });
          }
        }
      }}
    />
  );
};

// router.push(`/members/translation/${id}`)
