import * as React from 'react';

import { Toolbar, Button, Layer, Emerge, Open, SlideIn } from '../../../recoil/src/index';

import { observer, inject } from 'mobx-react';

import { IHeaderProps } from '../../interfaces/components/navigation/IHeaderProps';

@inject('appStore')
@observer
export default class Header extends React.Component<any, any> {
    toggleNightMode() {
        this.props.appStore.nightmode = !this.props.appStore.nightmode;
    }
    toggleMenu() {
        this.props.appStore.toggleMenu();
    }
    gotoScrollState() {
        this.props.appStore.gotoScrollState();
    }
    render() {

        let { appStore } = this.props;

        return (
            <SlideIn if={true} fixed from={"top"}>
                <Toolbar block className={this.props.appStore.mobile ? "ps40 pt40" : "ps100 pt40"}>
                    <img src="/static/imgs/logo.png" />
                    <Button onClick={this.toggleNightMode.bind(this)} simple right icon="moon-o"></Button>
                    <Button icon="comment" simple advanced checked={this.props.appStore.scrollState} right href="#contact" ></Button>
                </Toolbar>
            </SlideIn >
        )
    }
}
{/* <Button onClick={this.toggleMenu.bind(this)} simple right icon="bars"></Button> */ }