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
            index: 0
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
            index: anchorLink
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
                        <Section onSlideLeave={this.onSlideLeave.bind(this)}> <Layer overflow fill className="center-width">

                            <Layer flexCenter={mobile} className="w100 pl50 center-width mtb100">
                                <Layer className="h220px">
                                    <Emerge>
                                        <h2 className="super text-left mb10 h60px">You have a juicy <strong style={{ color: 'rgb(34, 170, 234)' }} >
                                            <TextLoop speed={2000}>
                                                <span>idea</span>
                                                <span>dream</span>
                                                <span>concept</span>
                                            </TextLoop>
                                        </strong>
                                        </h2>
                                        <h2 className=" text-left light mb20">Whether it's the next Gmail, Snapchat or Blockchain app... we have you covered.</h2>
                                        <Button href="#contact" size={mobile ? "large" : "xlarge"} icon="comment" outline theme="error"><span>Start by contacting us</span></Button>
                                    </Emerge>
                                </Layer>
                            </Layer>
                            <div className="posrel dopeback animated fadeInUp pt40 text-center">
                                <Emerge delay={1500} enter="slideInUp">
                                    <img className="z2 home-img-1 w100 text-center" src="/static/imgs/orange2.png" />
                                </Emerge>
                            </div>
                        </Layer></Section>
                        <Section>   <Layer flex fill >
                            <Layer className="w100 center-width mtb100">
                                <Layer className="h100px">
                                    <Emerge>
                                        <h2 className="super text-right mb10 h60px">You need help <strong style={{ color: 'rgb(255, 184, 195)' }}>
                                            <TextLoop speed={2000}>
                                                <span>visualizing</span>
                                                <span>building</span>
                                                <span>creating</span>
                                            </TextLoop></strong> it</h2>
                                        <h2 className="text-right light">Showcasing investors or clients, slides or pictures isn't going to cut it.</h2>
                                    </Emerge>
                                </Layer>
                            </Layer>
                            <Layer overflow className="posrel dopeback2 pt40 text-center">
                                <Emerge delay={500} triggerOnce enter="fadeIn tings">
                                    <div />
                                    <img className="feat-img-1" src="/static/imgs/iMac.png" />
                                    <img className="feat-img-2" src="/static/imgs/iPad.png" />
                                    <img className="feat-img-3 z3" src="/static/imgs/phone.png" />
                                </Emerge>
                            </Layer>
                        </Layer></Section>
                        <Section>
                            <Layer flex fill>
                                <Layer className="w100 center-width mtb100">
                                    <Layer className="h100px">
                                        <Emerge>
                                            <h2 className="super text-left mb10 h60px">So we'll build sweet<strong style={{ color: '#ff9a48' }}> <TextLoop speed={2000}>
                                                <span>prototype</span>
                                                <span>concept</span>
                                                <span>design</span>
                                            </TextLoop></strong></h2>
                                            <h2 className="text-left light">From eCommerce websites to mobile applications. We've got you covered.</h2>
                                        </Emerge>
                                    </Layer>
                                </Layer>
                                <Layer className="w100 pt40 dopeback4 center-width">
                                    <Emerge delay={1500} enter="slideInUp">
                                        <img className=" picit" src="/static/imgs/candy.png" />
                                    </Emerge>
                                </Layer>
                            </Layer></Section>
                        <Section>
                            <Layer flex fill>
                                <MailchimpSubscribe
                                    url={url}
                                    render={({ subscribe, status, message }) => (
                                        <Layer fill flex>
                                            <Layer flexCenter className={status !== "sending" && status !== "success" ? "h100px mtb100 w100 m0auto" : "h100 w100 m0auto"}>
                                                <Emerge overflow>
                                                    {status !== "sending" && status !== "success" ? <div className="animated fadeInUp"> <h2 className="super text-right">Let's get started! <strong style={{ color: '#00af60' }}>Contact us</strong></h2></div> : <div />}
                                                    {status === "sending" ? <div className="animated fadeInUp"><h2 className="super text-right"><i className="fa fa-circle-o-notch fa-spin" /> Submitting <strong style={{ color: '#00af60' }}>form</strong></h2></div> : <div />}
                                                    {status === "success" ? <div className="animated fadeInUp"><h2 className="super text-right">Sent!<strong style={{ color: '#00af60' }}> Don't forget to follow us =)</strong></h2></div> : <div />}
                                                    {status === "success" ?
                                                        <Toolbar className="mt20 text-right">
                                                            <Emerge>
                                                                <div />
                                                                <div className="dinblock"><Button size="xlarge" className="floatL " simple icon="facebook" /></div>
                                                                <div className="dinblock"><Button size="xlarge" className="floatL " simple icon="linkedin" /></div>
                                                                <div className="dinblock"><Button size="xlarge" className="floatL " simple icon="twitter" /></div>
                                                            </Emerge>
                                                        </Toolbar> : <div />}

                                                </Emerge>
                                            </Layer>
                                            <Layer flexCenter fill className={status !== "sending" && status !== "success" ? "ptb40 dopeback3 h100" : "ptb0 dopeback3 h0"}>
                                                <Layer className="w100 text-center m0auto">
                                                    <Open openToHeight={'300px'} if={status !== "sending" && status !== "success"} className={"ps20"}>
                                                        <form>
                                                            <Toolbar block flex>
                                                                <Input onChange={this.onChange.bind(this, 'FNAME')} theme="success" advanced material block size={this.props.appStore.mobile ? "small" : "xlarge"} title="Full name" className="mr20" />
                                                                <Input onChange={this.onChange.bind(this, 'EMAIL')} theme="success" advanced material block size={this.props.appStore.mobile ? "small" : "xlarge"} title="Email" />
                                                            </Toolbar>
                                                            <Toolbar block flex spacing className="mt20">
                                                                <Input onChange={this.onChange.bind(this, 'PHONE')} theme="success" advanced material block size={this.props.appStore.mobile ? "small" : "xlarge"} title="Phone Number" className="mr20" />
                                                                <Input onChange={this.onChange.bind(this, 'COMPANY')} theme="success" advanced material block size={this.props.appStore.mobile ? "small" : "xlarge"} title="Company" />
                                                            </Toolbar>
                                                            <Toolbar block flex spacing className="mt20">
                                                                <Input onChange={this.onChange.bind(this, 'IDEA')} theme="success" advanced material block size={this.props.appStore.mobile ? "small" : "xlarge"} title="Idea" />
                                                            </Toolbar>
                                                            <Toolbar block spacing className="mt20">
                                                                <Button submit disabled={status === "success"} advanced onClick={this.submitForm.bind(this, subscribe)} theme="success" right size={this.props.appStore.mobile ? "small" : "xlarge"} >Submit Your Message</Button>
                                                            </Toolbar>
                                                        </form>
                                                    </Open>

                                                </Layer>
                                            </Layer>

                                            <Layer className="e-NightMode p10">
                                                <Toolbar block textCenter spacing className="w100 center-width">
                                                    {!mobile ? <Button left simple>© 2018 Wulvs</Button> : null}
                                                    <Button icon="twitter" />
                                                    <Button icon="linkedin" />
                                                    <Button icon="facebook" />
                                                    {!mobile ? <Button right simple>Privacy Policy</Button> : null}
                                                </Toolbar>
                                            </Layer>


                                        </Layer>
                                    )}
                                />
                            </Layer>
                        </Section>
                    </SectionsContainer>


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



// <strong style={{ color: '#2cb5e8' }} >
//                                             <TextLoop speed={2000}>
//                                                 <span>idea</span>
//                                                 <span>dream</span>
//                                                 <span>concept</span>
//                                             </TextLoop>
//                                         </strong>



{/* <strong style={{ color: 'rgb(255, 184, 195)' }}>
                                    <TextLoop speed={2000}>
                                        <span>visualizing</span>
                                        <span>building</span>
                                        <span>creating</span>
                                    </TextLoop></strong> */}




                                //     <Layer className="e-NightMode p10">
                                //     <Toolbar block textCenter spacing className="w100 center-width">
                                //         {!mobile ? <Button left simple>© 2018 Wulvs</Button> : null}
                                //         <Button icon="twitter" />
                                //         <Button icon="linkedin" />
                                //         <Button icon="facebook" />
                                //         {!mobile ? <Button right simple>Privacy Policy</Button> : null}
                                //     </Toolbar>
                                // </Layer>


