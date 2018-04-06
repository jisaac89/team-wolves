import * as React from 'react';

import Default from '../../layouts/Default';

import { Recoil, Layer, Open, Notifications, SlideIn, Toolbar, Button, Emerge, Input } from '../../../../recoil/src/index';
import TextLoop from 'react-text-loop';
import { observer, inject } from 'mobx-react';

import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "//facebook.us12.list-manage.com/subscribe/post?u=06d510slide-37ba8deb24b42362c3&amp;id=6c82208505";

import { SectionsContainer, Section } from 'react-fullpage';

let options = {
    sectionClassName: 'section',
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'contact'],
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
            index: "slide-0"
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
            index: "slide-" + anchorLink.activeSection.toString()
        }, () => {
            console.log(this.state.index)
        })

        // this.props.appStore.gotoHomeSlideIndex(anchorLink.activeSection.toString);
    }

    render() {

        let mobile = this.props.appStore.mobile;
        let index = this.state.index;

        return (
            <Default>
                <Layer fill flex>

                    <SectionsContainer {...options} scrollCallback={this.onSlideLeave.bind(this)}>
                        <Section>
                            <Layer flexCenter className={!mobile ? "text-right h100 w500px pull-right mr50" : null}>
                                <img width={mobile ? "" : "500"} height={mobile ? "329" : "494"} className="text-right lime" src="/static/imgs/lime.png" />
                            </Layer>
                        </Section>
                        <Section>
                            <Layer flexCenter className={!mobile ? "text-left h100 w500px pull-left ml50" : null}>
                                <img width="350" height="600" className="text-left lime" src="/static/imgs/phone.png" />
                            </Layer>
                        </Section>
                        <Section>
                            <Layer flexCenter className={!mobile ? "text-right h100 w500px pull-right mr50" : null}>
                                <img width={mobile ? "" : "500"} height={mobile ? "329" : "494"} className="text-right lime" src="/static/imgs/candyo.png" />
                            </Layer>
                        </Section>

                        <Section>
                            <Layer flex fill flexCenter className={mobile ? "ps40" : "ps100"}>
                                <MailchimpSubscribe
                                    url={url}
                                    render={({ subscribe, status, message }) => (
                                        <Emerge if={this.state.index === 'slide-3'} delay={300} exit="fadeOut" enter="fadeIn">
                                            <div />
                                            <Layer flex>
                                                <Layer flexCenter className={status !== "sending" && status !== "success" ? "h100px w100 m0auto" : "h100 w100 m0auto"}>
                                                    <Emerge overflow>
                                                        {status !== "sending" && status !== "success" ? <div className="animated fadeInUp"> <h2 className="super text-left mb20">Let's get started! <strong style={{ color: '#00af60' }}>Contact us</strong></h2></div> : <div />}
                                                        {status === "sending" ? <div className="animated fadeInUp"><h2 className="super text-left mb20"><i className="fa fa-circle-o-notch fa-spin" /> Submitting <strong style={{ color: '#00af60' }}>form</strong></h2></div> : <div />}
                                                        {status === "success" ? <div className="animated fadeInUp"><h2 className="super text-left mb20">Sent!<strong style={{ color: '#00af60' }}> Don't forget to follow us =)</strong></h2></div> : <div />}
                                                        {status === "success" ?
                                                            <Toolbar className="mt20 text-left posabs">
                                                                <Emerge>
                                                                    <div />
                                                                    <div className="dinblock"><Button size="xlarge" className="floatL " simple icon="facebook" /></div>
                                                                    <div className="dinblock"><Button size="xlarge" className="floatL " simple icon="linkedin" /></div>
                                                                    <div className="dinblock"><Button size="xlarge" className="floatL " simple icon="twitter" /></div>
                                                                </Emerge>
                                                            </Toolbar> : <div />}

                                                    </Emerge>
                                                </Layer>
                                                <Layer flexCenter className={status !== "sending" && status !== "success" ? "ptb40 h100" : "ptb0 h0"}>
                                                    <Layer className="w100 text-center m0auto">
                                                        <Open openToHeight={'300px'} if={status !== "sending" && status !== "success"} className={""}>
                                                            <form>
                                                                <Toolbar block flex={!mobile} vertical={mobile}>
                                                                    <Input onChange={this.onChange.bind(this, 'FNAME')} theme="success" advanced material block size={this.props.appStore.mobile ? "default" : "xlarge"} title="Full name" className={mobile ? "mb20 " : "mr20"} />
                                                                    <Input onChange={this.onChange.bind(this, 'EMAIL')} theme="success" advanced material block size={this.props.appStore.mobile ? "default" : "xlarge"} title="Email" />
                                                                </Toolbar>
                                                                <Toolbar block flex={!mobile} vertical={mobile} spacing className="mt20">
                                                                    <Input onChange={this.onChange.bind(this, 'PHONE')} theme="success" advanced material block size={this.props.appStore.mobile ? "default" : "xlarge"} title="Phone Number" className={mobile ? "mb20 " : "mr20"} />
                                                                    <Input onChange={this.onChange.bind(this, 'COMPANY')} theme="success" advanced material block size={this.props.appStore.mobile ? "default" : "xlarge"} title="Company" />
                                                                </Toolbar>
                                                                <Toolbar block flex={!mobile} vertical={mobile} spacing className="mt20">
                                                                    <Input onChange={this.onChange.bind(this, 'IDEA')} theme="success" advanced material block size={this.props.appStore.mobile ? "default" : "xlarge"} title="Idea" />
                                                                </Toolbar>
                                                                <Toolbar block spacing className="mt20">
                                                                    <Button submit disabled={status === "success"} advanced onClick={this.submitForm.bind(this, subscribe)} theme="success" right size={this.props.appStore.mobile ? "default" : "xlarge"} >Submit Your Message</Button>
                                                                </Toolbar>
                                                            </form>
                                                        </Open>

                                                    </Layer>
                                                </Layer>

                                            </Layer>
                                        </Emerge>
                                    )}
                                />
                            </Layer>
                        </Section>


                    </SectionsContainer>


                    <Layer className={this.state.index + ' slide'} />
                    <Layer className={this.state.index + '-overlay slide'} />

                    {this.state.index === 'slide-0' && !mobile ?
                        <Layer fill flexCenter className="posabs t0 l0 pl100 z1">
                            <Emerge>
                                <div className="text-left">
                                    <h2 className="super mb20 text-left">
                                        You have a juicy  <strong style={{ color: '#2cb5e8' }} >
                                            <TextLoop speed={2000}>
                                                <span>idea</span>
                                                <span>dream</span>
                                                <span>concept</span>
                                            </TextLoop>
                                        </strong>

                                    </h2>
                                    <h2 className="light text-left mb20">From the next Snapchat to Blockchain app</h2>
                                    <Button href="#contact" size={mobile ? "large" : "xlarge"} icon="comment" theme="error"><span>Start by contacting us</span></Button>
                                </div>
                            </Emerge>
                        </Layer>
                        : null}

                    {this.state.index === 'slide-1' && !mobile ?
                        <Layer fill flexCenter className="posabs t0 l0 pr100">
                            <Emerge>
                                <div className="text-right">
                                    <h2 className="super mb20 text-right text-white">You need help <strong style={{ color: 'white' }}>
                                        <TextLoop speed={2000}>
                                            <span>visualizing</span>
                                            <span>building</span>
                                            <span>creating</span>
                                        </TextLoop></strong> it</h2>
                                    <h2 className="light text-right text-white mb20">Showcasing investors or clients, slides or pictures isn't going to cut it.</h2>
                                </div>
                            </Emerge>
                        </Layer> : null}

                    {this.state.index === 'slide-2' && !mobile ?
                        <Layer fill flexCenter className="posabs t0 l0 pl100">
                            <Emerge>
                                <div className="text-left">
                                    <h2 className="super text-left mb20">We build a sweet<strong style={{ color: '#2cb5e8' }}> <TextLoop speed={2000}>
                                        <span>prototype</span>
                                        <span>concept</span>
                                        <span>design</span>
                                    </TextLoop></strong></h2>
                                    <h2 className=" text-left light mb20">Showcasing investors or clients, slides or pictures isn't going to cut it.</h2>
                                </div>
                            </Emerge>
                        </Layer> : null}

                </Layer>

            </Default >

        );
    }
}
