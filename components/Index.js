import React from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';
import Search from './Search';

const Index = props => (
  <Container text>
    <Header textAlign="center" as="h1">
      GitHub User Search
    </Header>
    <Divider />
    <Search />
  </Container>
);

export default Index;
