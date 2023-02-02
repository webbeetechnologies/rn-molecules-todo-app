import { useMolecules as useMoleculesOriginal } from '@bambooapp/bamboo-molecules';

import type { components } from './components';

export const useMolecules = () => useMoleculesOriginal<typeof components>();
