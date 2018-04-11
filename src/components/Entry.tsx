import * as React from 'react';

import { Recoil, Layer, Notifications, SlideIn } from '../../recoil/src/index';
import { observer, inject } from 'mobx-react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './helpers/PrivateRoute';

import Header from './navigation/Header';
import LoadingPane from './navigation/LoadingPane';
import AuthPane from './navigation/AuthPane';
import { MenuPaneRoute } from './navigation/MenuPane';
import Dashboard from './routes/dashboard/Dashboard';
import Callback from './routes/callback/Callback';
import Home from './routes/home/Home';
import { routerStore } from '../stores/RouterStore';
import { syncHistoryWithStore } from '../sync';
import createBrowserHistory from 'history/createBrowserHistory'

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routerStore);

import { IEntryProps } from '../interfaces/components/routes/IEntryProps';

@inject('appStore', 'notificationStore', 'authStore')
@observer
export default class Entry extends React.Component<IEntryProps, any> {

    onMobile(isMobile) {
        this.props.appStore.onMobile(isMobile);
    }

    render() {

        let { appStore, authStore, notificationStore } = this.props;
        let isAuthenticated = authStore.isAuthenticated;

        let styles = {
            overflow: true,
            fill: true
        }

        return (
            <Router history={history}>
                <Recoil onMobile={this.onMobile.bind(this)} nightmode={appStore.nightmode} {...styles}>
                    <SlideIn className="z5" from="top" if={true}>
                        {notificationStore.list.length ? <Notifications className="notifications" dataSource={notificationStore.list} /> : null}
                    </SlideIn>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/callback" component={Callback} />
                    </Switch>
                </Recoil>
            </Router>
        )
    }
}