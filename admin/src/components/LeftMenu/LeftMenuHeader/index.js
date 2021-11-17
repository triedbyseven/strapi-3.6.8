import React from 'react';
import { Link } from 'react-router-dom';
import Img from '../../../containers/AuthPage/components/Logo/Img';
import LogoStrapi from '../../../assets/images/logo_strapi.png';

import Wrapper from './Wrapper';

const LeftMenuHeader = () => (
  <Wrapper>
    <Link to="/" className="leftMenuHeaderLink">
      <Img src={LogoStrapi} style={{ height: '100%' }}/>
    </Link>
  </Wrapper>
);

export default LeftMenuHeader;