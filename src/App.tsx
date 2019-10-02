import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './style/global-style';
import SmartBooking from 'routes/SmartBooking';
import BookingResult from 'routes/BookingResult';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'style/theme';

const Content = styled.div`
  position: relative;
  width: 800px;
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
        </Content>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const LoggedInRoutes: React.FC = () => (
  <Switch>
    <Route path="/" exact={true}>
      <SmartBooking />
    </Route>
    <Route path="/booking/:bookingId">
      <BookingResult />
    </Route>
  </Switch>
);

export default App;
