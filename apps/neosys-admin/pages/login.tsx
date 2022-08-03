import React from 'react';
import { useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline, IoLockClosed } from 'react-icons/io5';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

import { useLoginMutation } from '@coop/cbs/data-access';
import { Box, Button } from '@coop/shared/ui';
import { login, useAppDispatch } from '@coop/shared/utils';

import logo from '../../neosys-admin/public/logo.svg';

export default function Login() {
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
    >
      <Head>
        <title>Neosys | Login</title>
      </Head>
      <Box mb="8">
        <Image src={logo} alt="Main Logo" />
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          w={300}
          placeholder="Enter Username"
          {...register('username')}
          autoFocus
        />
        <InputGroup h="44px" mt="s4" w={300}>
          <InputLeftElement>
            <IoLockClosed />
          </InputLeftElement>
          <Input
            pr="58px"
            variant={'outline'}
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            {...register('password')}
          />
          <InputRightElement width="fit-content" pr="s16" cursor={'pointer'}>
            {show ? (
              <IoEyeOffOutline onClick={() => setShow(false)} />
            ) : (
              <IoEyeOutline onClick={() => setShow(true)} />
            )}
          </InputRightElement>
        </InputGroup>
        <br />
        <Button w={300} type="submit" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </Box>
  );
}
