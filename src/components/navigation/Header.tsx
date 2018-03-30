import * as React from 'react';

import { Toolbar, Button, Layer, Emerge, Open } from '../../../recoil/src/index';

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
            <Open if={true} className="z5" openToHeight={"53px"}>
                <Toolbar block className="p10">
                    <img height={40} width={40} src="http://www.i2clipart.com/cliparts/1/c/d/1/clipart-wolf-emblem-256x256-1cd1.png" /> <h2 className="wulvs">Fourminds</h2>
                    <Button onClick={this.toggleNightMode.bind(this)} simple right icon="moon-o"></Button>
                    <Button icon="comment" simple advanced checked={this.props.appStore.scrollState} right onClick={this.gotoScrollState.bind(this)} ></Button>
                </Toolbar>
            </Open>
        )
    }
}
{/* <Button onClick={this.toggleMenu.bind(this)} simple right icon="bars"></Button> */ }