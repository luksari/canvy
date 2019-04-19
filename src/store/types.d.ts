declare module 'MyTypes' {
    import { StateType, ActionType } from 'typesafe-actions';
    export type RootAction = ActionType<typeof import('./rootAction').default>;
    export type RootState = StateType<typeof import('./rootReducer').default>;
}
