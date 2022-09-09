import { useLottie } from 'lottie-react';

import LoadingAnimation from './myra_loading.json';

/* eslint-disable-next-line */
export interface LoaderProps {
  height?: number;
}

export function Loader({ height }: LoaderProps) {
  const options = {
    animationData: LoadingAnimation,
    loop: true,
  };

  const style = {
    height: height ?? 200,
  };

  const { View } = useLottie(options, style);

  return <>{View}</>;
}

export default Loader;
