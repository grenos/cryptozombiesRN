export * from './HomeStack';
export * from './OtherStack';
export * from './CreateZombiesStack';

import { RootStackParamListHome } from './HomeStack';
import { RootStackParamListOther } from './OtherStack';
import { RootStackParamListCreate } from './CreateZombiesStack';

type ScreenRootParams = RootStackParamListHome &
    RootStackParamListOther &
    RootStackParamListCreate;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends ScreenRootParams {}
    }
}
