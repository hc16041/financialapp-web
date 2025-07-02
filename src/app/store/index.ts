import { ActionReducerMap } from "@ngrx/store";
import { LayoutState, layoutReducer } from "./layouts/layout-reducers";
import { TodoReducer, TodoState } from "./Todo/todo_reducer";
import { ApikeyReducer, ApikeyState } from "./APIKey/apikey_reducer";
// import { authenticationReducer, AuthenticationState } from "./Authentication/authentication.reducer";

export interface RootReducerState {
  layout: LayoutState;
  Todo: TodoState;
  APIKey: ApikeyState;
  // authentication: AuthenticationState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  Todo: TodoReducer,
  APIKey: ApikeyReducer,
  // authentication: authenticationReducer,
};
