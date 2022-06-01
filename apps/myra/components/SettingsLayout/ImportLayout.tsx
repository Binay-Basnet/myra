import SettingsLayout from '.';
interface ISettingsLayout {
  children?: React.ReactNode;
}
const ImportLayout = (props: ISettingsLayout) => {
  const { children } = props;
  return (
    <>
      <SettingsLayout />
      {children}
    </>
  );
};

export default ImportLayout;
