import { IAppStore } from "../../stores/IAppStore";
import { IAuthStore } from "../../stores/IAuthStore";
import { IHistory } from "../helpers/IHistory";
import { IRouterStore } from "../../stores/IRouterStore";

export interface IMenuPaneProps {
    appStore?: IAppStore;
    authStore?: IAuthStore;
    history?: IHistory;
    routerStore?: IRouterStore;
}