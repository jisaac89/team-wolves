import * as React from 'react';

import Default from '../../layouts/Default';

import { Recoil, Layer, Open, Notifications, SlideIn, Toolbar, Button, Emerge, Input } from '../../../../recoil/src/index';
import TextLoop from 'react-text-loop';
import { observer, inject } from 'mobx-react';

import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "//facebook.us12.list-manage.com/subscribe/post?u=06d510a37ba8deb24b42362c3&amp;id=6c82208505";

import { SectionsContainer, Section } from 'react-fullpage';

let options = {
    sectionClassName: 'section',
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    arrowNavigation: true
}
// simplest form (only email)
const SimpleForm = () => <MailchimpSubscribe url={url} />

@inject('appStore', 'contactStore')
@observer
export default class Home extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            index: "a0"
        }
    }

    gotoScrollState() {
        this.props.appStore.gotoScrollState();
    }

    submitForm(subscribe, event) {
        event.preventDefault();
        let data = this.props.contactStore.form;
        subscribe(data);
        return false;
    }

    componentDidMount() {
        let appStore = this.props.appStore;
        // appStore.menu = true;
    }

    onChange(key, value) {
        this.props.contactStore.onChange(value, key);
    }

    onSlideLeave(anchorLink, index, slideIndex, direction, nextSlideIndex) {
        console.log(anchorLink);
        this.setState({
            index: "a" + anchorLink.activeSection.toString()
        }, () => {
            console.log(this.state.index)
        })
    }

    render() {

        let mobile = this.props.appStore.mobile;

        return (
            <Default>
                <Layer fill flex>
                    <SectionsContainer {...options} scrollCallback={this.onSlideLeave.bind(this)}>
                        <Section>
                            <Layer fill flexCenter className="w1000px center-width">
                                <img className="w500px h500px center-width" src="/static/imgs/lime.png" />
                            </Layer>
                        </Section>
                        <Section>
                            <div />
                        </Section>
                        <Section>
                            <Layer fill flexCenter className="w1000px">
                                <img className="w500px center-width" src="/static/imgs/candyo.png" />
                            </Layer>
                        </Section>
                    </SectionsContainer>

                    <Layer className={this.state.index + ' aas'}>
                        <Layer className="waves" />
                    </Layer>


                    <Layer className={this.state.index + ' z5 transp text-center p10'}>
                        <img height="228" width="127" className="" src="/static/imgs/phone.png" />
                    </Layer>


                    {this.state.index === 'a0' ?
                        <Layer flex className="posabs t0 w100 h50 z5">
                            <Layer fill flexCenter>
                                <Emerge enter="fadeIn">
                                    <div>
                                        <h2 className="super mb20">
                                            You have juicy <strong style={{ color: '#2cb5e8' }} >
                                                <TextLoop speed={2000}>
                                                    <span>idea</span>
                                                    <span>dream</span>
                                                    <span>concept</span>
                                                </TextLoop>
                                            </strong>
                                        </h2>
                                        <h2 className="light mb20">From the next Snapchat to Blockchain app</h2>
                                        <Button href="#contact" size={mobile ? "large" : "xlarge"} icon="comment" theme="error"><span>Start by contacting us</span></Button>

                                    </div>
                                </Emerge>
                            </Layer>
                        </Layer>
                        : null}


                    {this.state.index === 'a1' ?
                        <Layer flex className="posabs t0 w100 h50 z5">
                            <Layer fill flexCenter>
                                <Emerge enter="fadeIn">
                                    <h2 className="super mb20">You need help <strong style={{ color: 'rgb(255, 184, 195)' }}>
                                        <TextLoop speed={2000}>
                                            <span>visualizing</span>
                                            <span>building</span>
                                            <span>creating</span>
                                        </TextLoop></strong> it</h2>
                                    <h2 className="text-right light">Showcasing investors or clients, slides or pictures isn't going to cut it.</h2>
                                </Emerge>
                            </Layer>
                        </Layer>
                        : null}

                    <div className="mouse">
                        <div className="roll"></div>
                        <div className="rollshadow"></div>
                    </div>
                </Layer>

            </Default >

        );
    }
}


{/* <img className="w500px center-width" src="/static/imgs/lime.png" /> */ }
{/* <Layer className={this.state.index + ' aas'}>

</Layer> */}
{/* <Layer className={this.state.index + ' aas z0 transp text-center p10'}>

</Layer> */}
{/* <Layer className="waves" /> */ }

{/* <img className="w500px center-width" src="/static/imgs/lime.png" /> */ }
{/* <img className="w500px center-width" src="/static/imgs/iMac.png" /> */ }

{/* <Layer className={this.state.index + ' aas z5 transp text-center p10'}>
<img height="430px" width="500" className="" src="/static/imgs/iMac.png" />
</Layer> */}
