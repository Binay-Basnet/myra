import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import {
  asyncToast,
  Box,
  Button,
  Container,
  FormFooter,
  Icon,
  IconButton,
  Loader,
  Text,
} from '@myra-ui';

import {
  NeosysUserInput,
  Role,
  useGetUserEditDataQuery,
  useSetUserMutation,
} from '@coop/neosys-admin/data-access';
import { useTranslation } from '@coop/shared/utils';

import { NeosysUsersForm } from '../form/NeosysUsersForm';

/* eslint-disable-next-line */
export interface NeosysFeatureUsersAddProps {}

export const NeosysFeatureUsersAdd = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm();
  const { clearErrors, reset } = methods;

  const isEdit = router?.pathname?.includes('edit');

  const {
    data: editData,
    isLoading: editDataLoading,
    refetch,
  } = useGetUserEditDataQuery(
    { id: router?.query?.['id'] as string },
    {
      enabled: isEdit,
    }
  );

  const queryClient = useQueryClient();
  const { mutateAsync } = useSetUserMutation();

  useEffect(() => {
    if (editData) {
      reset({ ...editData?.neosys?.user?.get?.data });
    }
  }, [editData]);

  return (
    <>
      <Container minW="container.lg" height="fit-content" paddingBottom="55px">
        <Box margin="0px auto" bg="gray.0" width="100%" zIndex="10">
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="5"
            background="white"
            borderBottom="1px solid "
            borderColor="border.layout"
          >
            <Text fontSize="r2" fontWeight="SemiBold">
              {t['neoUsersNewUser']}
            </Text>
            <IconButton
              variant="ghost"
              aria-label="close"
              icon={<IoCloseOutline />}
              onClick={() => router.back()}
            />
          </Box>
          <FormProvider {...methods}>
            {editDataLoading && isEdit ? (
              <Box display="flex" justifyContent="center" pt="100px">
                <Loader />
              </Box>
            ) : (
              <NeosysUsersForm />
            )}
          </FormProvider>
        </Box>
      </Container>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100">
          <Container minW="container.lg" height="fit-content">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
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
              mainButtonLabel={t['next']}
              mainButtonHandler={async () => {
                const formValues = methods.getValues();

                await asyncToast({
                  id: 'new-client',
                  msgs: {
                    loading: isEdit ? 'Editing User' : 'Adding New User',
                    success: isEdit ? 'User Edited' : 'New User Added',
                  },
                  onSuccess: () => {
                    router.push('/users');
                    queryClient.invalidateQueries(['getUserList']);
                    refetch();
                  },
                  promise: mutateAsync({
                    id: isEdit ? (router?.query?.['id'] as string) : undefined,
                    data: {
                      ...formValues,
                      role: Role?.Superadmin,
                    },
                  }),
                  onError: (error) => {
                    if (error.__typename === 'ValidationError') {
                      clearErrors();
                      Object.keys(error.validationErrorMsg).map((key) =>
                        methods.setError(key as keyof NeosysUserInput, {
                          message: error.validationErrorMsg[key][0] as string,
                        })
                      );
                    }
                  },
                });
              }}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};
