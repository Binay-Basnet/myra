import { Box } from '@saccos/myra/ui';

import SettingsLayout from '.';
interface ISettingsLayout {
  children?: React.ReactNode;
}
const UsersLayout = (props: ISettingsLayout) => {
  const { children } = props;
  return (
    <>
      <SettingsLayout />
      {children}
    </>
  );
};

export default UsersLayout;
