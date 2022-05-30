import SettingsLayout from '.';
import { Box } from '@saccos/myra/ui';
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
