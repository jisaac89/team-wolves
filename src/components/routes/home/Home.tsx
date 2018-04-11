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
    arrowNavigation: true,
    autoScrolling: false,
    dragAndMove: true
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

        this.props.appStore.gotoHomeSlideIndex(anchorLink.activeSection);
    }

    render() {

        let mobile = this.props.appStore.mobile;
        let index = this.state.index;

        return (
            <Default>
                <Layer fill flex overflow>

                    <SectionsContainer {...options} scrollCallback={this.onSlideLeave.bind(this)}>
                        <Section>
                            <Layer flexCenter className={!mobile ? "text-right h100 w500px pull-right mr50" : null}>
                                <img width={mobile ? "" : "500"} height={mobile ? "329" : "494"} className="text-right lime animated fadeIn" src="/static/imgs/lime.png" />
                            </Layer>
                        </Section>
                        <Section>
                            <Layer flexCenter className={!mobile ? "text-left h100 w500px pull-left ml50" : null}>
                                <img width={!mobile ? "350" : null} height={!mobile ? "600" : null} className="text-left phone" src={mobile ? "/static/imgs/phone1.png" : "/static/imgs/phone.png"} />
                            </Layer>
                        </Section>
                        <Section>
                            <Layer flexCenter className={!mobile ? "text-right h100 w500px pull-right mr50" : null}>
                                <img width={mobile ? "" : "500"} height={mobile ? "329" : "494"} className="text-right donut" src="/static/imgs/candyo.png" />
                            </Layer>
                        </Section>

                        <Section>
                            <Layer flex fill flexCenter={!mobile} className={mobile ? "p10" : "ps100"}>
                                <MailchimpSubscribe
                                    url={url}
                                    render={({ subscribe, status, message }) => (

                                        <Layer flex>
                                            <Layer flexCenter className={status !== "sending" && status !== "success" ? "h100px w100 m0auto" : "h100 w100 m0auto"}>
                                                {status !== "sending" && status !== "success" ? <div className="animated fadeInUp"> <h2 className="super text-left mb20">{mobile ? "" : "Let's get started!"}<strong style={{ color: '#00af60' }}>Contact us</strong></h2></div> : <div />}
                                                {status === "sending" ? <div className="animated fadeInUp"><h2 className="super text-left mb20"><i className="fa fa-circle-o-notch fa-spin" /> Submitting <strong style={{ color: '#00af60' }}>form</strong></h2></div> : <div />}
                                                {status === "success" ? <div className="animated fadeInUp"><h2 className="super text-left mb20">Sent!<strong style={{ color: '#00af60' }}> follow us =)</strong></h2></div> : <div />}
                                                {status === "success" ?
                                                    <Toolbar className="mt20 text-left posabs">
                                                        <Emerge>
                                                            <div />
                                                            <div className="dinblock"><Button size="xlarge" className="floatL " simple icon="facebook" /></div>
                                                            <div className="dinblock"><Button size="xlarge" className="floatL " simple icon="linkedin" /></div>
                                                            <div className="dinblock"><Button size="xlarge" className="floatL " simple icon="twitter" /></div>
                                                        </Emerge>
                                                    </Toolbar> : <div />}

                                            </Layer>
                                            <Layer flexCenter={!mobile} className={status !== "sending" && status !== "success" ? mobile ? "h100" : "ptb40 h100" : "ptb0 h0"}>
                                                <Layer className="w100 text-center m0auto">
                                                    <Open openToHeight={'300px'} if={status !== "sending" && status !== "success"} className={""}>
                                                        <form>
                                                            <Toolbar block flex={!mobile} vertical={mobile}>
                                                                <Input onChange={this.onChange.bind(this, 'FNAME')} theme="success" advanced material block size={this.props.appStore.mobile ? "xlarge" : "xlarge"} title="Full name" className={mobile ? "mb20 " : "mr20"} />
                                                                <Input onChange={this.onChange.bind(this, 'EMAIL')} theme="success" advanced material block size={this.props.appStore.mobile ? "xlarge" : "xlarge"} title="Email" />
                                                            </Toolbar>
                                                            <Toolbar block flex={!mobile} vertical={mobile} spacing className="mt20">
                                                                <Input onChange={this.onChange.bind(this, 'PHONE')} theme="success" advanced material block size={this.props.appStore.mobile ? "xlarge" : "xlarge"} title="Phone Number" className={mobile ? "mb20 " : "mr20"} />
                                                                <Input onChange={this.onChange.bind(this, 'COMPANY')} theme="success" advanced material block size={this.props.appStore.mobile ? "xlarge" : "xlarge"} title="Company" />
                                                            </Toolbar>
                                                            <Toolbar block flex={!mobile} vertical={mobile} spacing className="mt20">
                                                                <Input onChange={this.onChange.bind(this, 'IDEA')} theme="success" advanced material block size={this.props.appStore.mobile ? "xlarge" : "xlarge"} title="Idea" />
                                                            </Toolbar>
                                                            <Toolbar block spacing className="mt20">
                                                                <Button submit disabled={status === "success"} advanced onClick={this.submitForm.bind(this, subscribe)} theme="success" right size={this.props.appStore.mobile ? "xlarge" : "xlarge"} >Submit Your Message</Button>
                                                            </Toolbar>
                                                        </form>
                                                    </Open>

                                                </Layer>
                                            </Layer>
                                        </Layer>
                                    )}
                                />
                            </Layer>
                        </Section>


                    </SectionsContainer>

                    <a href="#contact" id="contact-btn" className={'s-' + this.props.appStore.homeSlideIndex} />


                    <Layer className={this.state.index + ' slide'} />
                    <Layer className={this.state.index + '-overlay slide'} />

                    {this.state.index === 'slide-0' ?
                        <Layer fill flexCenter={!mobile} className={!mobile ? "posabs t0 l0 pl100 z1" : "posabs t0 l0 w100 text-center pt50"}>
                            <Emerge enter="fadeIn">
                                <div className={!mobile ? "text-left" : "text-center p10"}>
                                    < h2 className={!mobile ? "super mb20 text-left" : "super text-center"}>
                                        You have a juicy  <strong style={{ color: '#2cb5e8' }} >
                                            <TextLoop speed={2000}>
                                                <span>idea</span>
                                                <span>dream</span>
                                                <span>concept</span>
                                            </TextLoop>
                                        </strong>

                                    </h2>
                                    <h2 className={mobile ? "light text-left mb10" : "light text-left mb20"}>From the next Snapchat to Blockchain app</h2>
                                    <Button href="#contact" size={mobile ? "large" : "xlarge"} icon="comment" theme="error"><span>Start by contacting us</span></Button>
                                </div>
                            </Emerge>
                        </Layer>
                        : null
                    }

                    {
                        this.state.index === 'slide-1' ?
                            <Layer fill flexCenter={!mobile} className={!mobile ? "posabs t0 l0 pr100 z1" : "posabs t0 l0 w100 text-center pt20 z4"}>
                                <Emerge enter="fadeIn">
                                    <div className={!mobile ? "text-right" : "text-center p10"}>
                                        <h2 className={!mobile ? "super mb20 text-right text-white" : "super mb10 text-center"}>{mobile ? "We" : "You need help"} <strong style={{
                                            color: mobile ? "rgb(254, 57, 119)" : 'white'
                                        }}>
                                            <TextLoop speed={2000}>
                                                < span > {mobile ? "visualize" : "visualizing"}</span>
                                                <span>{mobile ? "build" : "building"}</span>
                                                <span>{mobile ? "create" : "creating"}</span>
                                            </TextLoop></strong> it</h2>
                                        {!mobile ? <h2 className={"light text-right text-white mb20"}>Showcasing investors or clients, slides or pictures isn't going to cut it.</h2> : <div />}
                                    </div>
                                </Emerge>
                                {mobile ? <Emerge enter="fadeIn"><h2 className={"shit"}>Slides or pictures isn't going to cut it.</h2></Emerge> : <div />}
                            </Layer> : null
                    }

                    {
                        this.state.index === 'slide-2' ?
                            <Layer fill flexCenter={!mobile} className={!mobile ? "posabs t0 l0 pl100 z1" : "posabs t0 l0 w100 text-center pt20 z4"}>
                                <Emerge enter="fadeIn">
                                    <div className={!mobile ? "text-left" : "text-center p10"}>
                                        <h2 className={!mobile ? "super mb20 text-left" : "super mb10 text-center"}>{!mobile ? "We build a sweet" : "Building a"}<strong style={{ color: '#2cb5e8' }}> <TextLoop speed={2000}>
                                            <span>prototype</span>
                                            <span>concept</span>
                                            <span>design</span>
                                        </TextLoop></strong></h2>
                                        <h2 className=" text-left light mb20">From eCommerce websites to mobile applications. We've got you covered.</h2>
                                    </div>
                                </Emerge>
                            </Layer> : null
                    }
                    <div id="top" className={"text-center slide-" + this.state.index}>
                        <div id="green-wave" className="animated fadeInUp"></div>
                        <div id="blue-wave" className="animated fadeInUp"></div>
                        <div id="orange-wave" className="animated fadeInUp"></div>
                    </div>
                </Layer >

            </Default >

        );
    }
}
