import React from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';

import { useLoginMutation } from '@coop/cbs/data-access';
import { Box, Button, Checkbox, Text } from '@coop/shared/ui';
import { login, useAppDispatch, useTranslation } from '@coop/shared/utils';

export default function Login() {
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useLoginMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const [show, setShow] = React.useState(false);

  const onSubmit = (data) => {
    mutateAsync({ data }).then((res) => {
      if (res.auth.login.recordId === null) {
        return;
      }
      const accessToken = res?.auth?.login?.record?.token?.access;
      const refreshToken = res?.auth?.login?.record?.token?.refresh;
      const user = res?.auth?.login?.record?.user;
      dispatch(login({ user: user, token: accessToken }));
      localStorage.setItem('refreshToken', refreshToken);
      router.replace('/');
    });
  };

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={170}
      bg="#E5E5E5"
    >
      <Box display="flex" width="100%" justifyContent="space-between">
        <Box
          display="flex"
          flexDirection="column"
          width={500}
          justifyContent="center"
          gap={2}
        >
          <Text fontSize="m2" fontWeight="semibold" lineHeight="shorter">
            {t['loginTitle']}
          </Text>
          <Text fontSize="r3">{t['loginSubTitle']}</Text>
        </Box>
        <Box
          display="flex"
          flexDir="column"
          boxShadow="xs"
          width={400}
          borderRadius={8}
          p={10}
          bg="white"
          gap={5}
          justifyContent="center"
        >
          <Box display="flex" justifyContent="space-between">
            <Box position="relative" w="120px" h="62px">
              <Image src="/loginLogo.svg" layout="fill" alt="logo" />
            </Box>

            <Button
              variant="outline"
              // onClick={() =>
              //   router.push(`/${router.asPath}`, undefined, {
              //     locale: value,
              //   })
              // }
            >
              नेपाली
            </Button>
          </Box>
          <Text fontSize="l1">{t['loginHeader']}</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDir="column" gap={5}>
              <Box>
                <Text fontSize="s3">{t['loginEmail']}</Text>
                <Input {...register('username')} autoFocus />
              </Box>
              <Box>
                <Text fontSize="s3">{t['loginPassword']}</Text>
                <InputGroup h="44px" mt="s4">
                  <Input
                    pr="58px"
                    variant={'outline'}
                    type={show ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <InputRightElement
                    width="fit-content"
                    pr="s16"
                    cursor={'pointer'}
                  >
                    {show ? (
                      <IoEyeOffOutline onClick={() => setShow(false)} />
                    ) : (
                      <IoEyeOutline onClick={() => setShow(true)} />
                    )}
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" gap={1}>
                  <Checkbox />
                  <Text fontSize="r1">{t['loginKeepSignedIn']}</Text>
                </Box>
                <Text fontSize="s2" color="success">
                  {t['loginForgotPassword']}
                </Text>
              </Box>
              <Button type="submit" isLoading={isLoading}>
                {t['loginText']}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
