import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from 'style/global-style';
import Reservation from 'routes/Reservation';
import MyPage from 'routes/MyPage';
import ReservationResult from 'routes/ReservationResult';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'style/theme';

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
        </Content>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const LoggedInRoutes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Reservation} />
    <Route path="/mypage" component={MyPage} />
    <Route path="/reservation/:reservationId" component={ReservationResult} />
  </Switch>
);

export default App;
