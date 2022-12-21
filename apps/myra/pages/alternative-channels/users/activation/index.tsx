import { ReactElement } from 'react';

import { ActivationForm } from '@coop/ac/activation-form';
import { ACMainLayout } from '@coop/ac/layouts';

const ActivationFormPage = () => <ActivationForm />;

ActivationFormPage.getLayout = (page: ReactElement) => <ACMainLayout>{page}</ACMainLayout>;

export default ActivationFormPage;
