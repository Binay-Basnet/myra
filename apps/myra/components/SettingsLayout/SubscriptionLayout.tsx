import { Box } from '@saccos/myra/ui';

import SettingsLayout from '.';
interface ISettingsLayout {
  children?: React.ReactNode;
}
const SubscriptionsLayout = (props: ISettingsLayout) => {
  const { children } = props;
  return (
    <>
      <SettingsLayout />
      {children}
    </>
  );
};

export default SubscriptionsLayout;
