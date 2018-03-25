import * as React from 'react';

import { Button, Toolbar, Input, Emerge, Layer, SlideIn } from '../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import RouterButton from '../helpers/RouterButton';

import { IMenuPaneProps } from '../../interfaces/components/navigation/IMenuPaneProps';

import Header from '../navigation/Header';
import { withRouter } from 'react-router-dom';

@inject('appStore', 'authStore', 'routerStore')
@observer
class MenuPane extends React.Component<IMenuPaneProps, any> {

    signOut() {
        this.props.authStore.signout();
        this.props.routerStore.push('/')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname === '/login' && this.props.authStore.isAuthenticated) {
            this.props.appStore.menu = true;
        }
    }

    render() {

        let { appStore, authStore } = this.props;
        let { history } = this.props;
        let { user } = authStore;


        return (
            <SlideIn className="z4" if={appStore.menu} from="bottom" fill >

                <Layer fill flex className="mt52px">
                    <Layer scrollY flexCenter={!appStore.mobile} fill className="text-left pt50" theme="light">
                        <div className="p20 center-width">
                            <Toolbar block className="center-width text-left" spacing vertical>
                                <h2 className="super text-left mb10 h60px">
                                    <Emerge delay={100} if={appStore.menu} enter="fadeInUp">
                                        <a className="dinblock mr20 a1 "  > Home</a>
                                        <a className="dinblock mr20 a2" >About</a>
                                        <a className="dinblock mr20 a3" >Services</a>
                                        <a className="dinblock mr20 a4" >Contact</a>
                                    </Emerge>
                                </h2>

                            </Toolbar>
                        </div>
                    </Layer>
                </Layer>
            </SlideIn>
        )
    }
}

export const MenuPaneRoute = withRouter(props => <MenuPane {...props} />);