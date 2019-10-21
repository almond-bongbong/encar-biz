import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 -2px 2px 2px rgba(0, 0, 0, 0.1);
  font-size: 0;
  text-align: center;

  > a {
    display: inline-block;
    font-size: 22px;

    & + a {
      margin-left: 20px;
    }
  }
`;

const FooterNavigation: React.FC = () => {
  return (
    <Container>
      <Link to={'/'}>Home</Link>
      <Link to={'/mypage'}>My page</Link>
    </Container>
  );
};

export default FooterNavigation;
