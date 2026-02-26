import React from 'react';
import AboutBanner from './AboutBanner';
import OurMission from './OurMission';
import OurTeam from './OurTeam';
import SuccessStory from '../Home/SuccessStory';

const About = () => {
    return (
        <div>
            <AboutBanner></AboutBanner>
            <OurMission></OurMission>
            <OurTeam></OurTeam>
            <SuccessStory></SuccessStory>
        </div>
    );
};

export default About;