import React from 'react';
import Banner from './Banner';
import HowItWork from './HowItWork';
import Featured from './Featured';
import WhyItMatters from './WhyItMatters';
import SuccessStory from './SuccessStory';
import CountdownModal from '../../Hooks/CountdownModal';

const Home = () => {
    return (
        <div className='relative'>
            <CountdownModal></CountdownModal>
            <Banner></Banner>
            <HowItWork></HowItWork>
            <Featured></Featured>
            <WhyItMatters></WhyItMatters>
            <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;



 