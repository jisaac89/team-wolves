import * as React from 'react';
import { Layer, Toolbar, Button } from '../../../recoil/src/index';
import Header from '../navigation/Header';

import { observer, inject } from 'mobx-react';

import { IHeaderProps } from '../../interfaces/components/navigation/IHeaderProps';

@inject('appStore')
@observer
class Default extends React.Component<any, any>{
    gotoScrollState() {
        this.props.appStore.gotoScrollState();
    }
    public render() {
        let { centerContent, actions, appStore } = this.props;

        let actionListArray = [];

        let createActionsList = (action, index) => {
            actionListArray.push(action)
        }

        if (actions) {
            actions.map(createActionsList);
        }

        console.log(appStore.scrollState);

        let x = false

        if (appStore.scrollState) {
            x = true;
        } else {
            x = false;
        }

        return (
            <Layer fill flex>
                <Header />
                <Layer afterAnimate={this.gotoScrollState.bind(this)} scrollIf={x} scrollToId={x ? 'contact' : ''} className="center-width" scrollY fill flexCenter={centerContent}>
                    {this.props.children}
                    <Layer className="e-NightMode p10">
                        <Toolbar block textCenter spacing className="w1000px center-width">
                            <Button left simple>© 2018 Wulvs</Button>
                            <Button icon="twitter" />
                            <Button icon="linkedin" />
                            <Button icon="facebook" />
                            <Button right simple>Privacy Policy</Button>
                        </Toolbar>
                    </Layer>
                </Layer>
                {actions ? (
                    <Toolbar textCenter flex block className="border-top p10">
                        {actionListArray}
                    </Toolbar>
                ) : null}

            </Layer>
        );
    }
}

export default Default;