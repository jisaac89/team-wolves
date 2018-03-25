import 'core-js';
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as promiseFinally from 'promise.prototype.finally';

import { Provider } from 'mobx-react';
import Entry from './components/Entry';

import {
    appStore,
    authStore,
    notificationStore,
    routerStore,
    contactStore
} from './stores/_GlobalStore'

const stores = {
    appStore,
    authStore,
    notificationStore,
    routerStore,
    contactStore
};

// for debug purposes
window['stores'] = stores;

promiseFinally.shim();

ReactDOM.render(
    <Provider {...stores}>
        <Entry />
    </Provider>,
    document.getElementById("root")
); 