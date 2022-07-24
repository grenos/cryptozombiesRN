export * from './HomeStack';
export * from './OtherStack';

import { RootStackParamListHome } from './HomeStack';
import { RootStackParamListOther } from './OtherStack';

type ScreenRootParams = RootStackParamListHome & RootStackParamListOther;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends ScreenRootParams {}
    }
}
