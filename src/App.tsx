import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './style/global-style';
import SmartBooking from 'routes/SmartBooking';
import BookingResult from 'routes/BookingResult';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'style/theme';
import CounterContainer from 'components/Counter/CounterContainer';

const Content = styled.div`
  position: relative;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 20px;

  & > div {
    animation: fadeIn 0.3s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Content>
          <LoggedInRoutes />
          <CounterContainer />
        </Content>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const LoggedInRoutes: React.FC = () => (
  <Switch>
    <Route path="/:floor?" component={SmartBooking} />
    <Route path="/booking/:bookingId" component={BookingResult} />
  </Switch>
);

export default App;
