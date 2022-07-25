import React, { ChangeEventHandler } from 'react';
import { IoEyeOffOutline, IoEyeOutline, IoLockClosed } from 'react-icons/io5';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

import { useLoginMutation } from '@coop/shared/data-access';
import { Box, Button } from '@coop/shared/ui';
import { useAuth } from '@coop/shared/utils';

export const Login = () => {
  const { mutateAsync } = useLoginMutation();
  const auth = useAuth();
  console.log('auth', auth);
  const [show, setShow] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onUserNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUserName(e.target.value);
  };
  const onPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    mutateAsync({ data: { username: userName, password } }).then(
      (res) => {
        const accessToken = res?.auth?.login?.record?.token?.access;
        const refreshToken = res?.auth?.login?.record?.token?.refresh;
        const user = res?.auth?.login?.record?.user;
        auth.setAuthentication &&
          auth?.setAuthentication({ accessToken: accessToken, user: user });
        localStorage.setItem('refreshToken', refreshToken ?? '');
      }

      // auth.setAuth({acces})
    );
    // if (userName === 'neosys' && password === 'neosys@123') {
    //   localStorage.setItem('isLoggedIn', 'true');
    //   typeof window !== 'undefined' && window.location.reload();
    // }
  };

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src="/dashboardhome/MyraLogo.png" alt="Main Logo" />
      <br />
      <Input w={300} placeholder="Enter Username" onChange={onUserNameChange} />
      <br />
      <InputGroup h="44px" mt="s4" w={300}>
        <InputLeftElement children={<IoLockClosed />} />
        <Input
          pr="58px"
          variant={'outline'}
          type={show ? 'text' : 'password'}
          placeholder="Enter password"
          onChange={onPasswordChange}
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
      <Button w={300} onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
};
