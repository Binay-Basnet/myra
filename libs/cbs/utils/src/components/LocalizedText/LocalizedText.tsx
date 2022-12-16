// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { store } from '@coop/cbs/data-access';

interface ILocalizedTextProps {
  text: Record<'local' | 'en' | 'np', string> | null | undefined;
}

export const LocalizedText = ({ text }: ILocalizedTextProps) => localizedText(text);

export const localizedText = (text: Record<'local' | 'en' | 'np', string> | null | undefined) => {
  const lang = store.getState().auth?.preference?.languageCode || 'en';

  if (lang === 'np') {
    return text?.np || text?.local;
  }

  return text?.en || text?.local;
};

export default LocalizedText;
