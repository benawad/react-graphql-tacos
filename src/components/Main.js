import React, { Component } from 'react';

import { Link } from 'react-router';
import { Header, Container } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Main extends Component {
  render() {
    return (
      <Container text>
        <Header as="h1" textAlign="center">
          <Link to="/">GraphQL</Link>
        </Header>
        {React.cloneElement(this.props.children, this.props)}
      </Container>
    );
  }
}

const createTacoMutation = gql`
mutation {
  createTaco(meat: "chicken", cheese: "cheddar", salsa: "hot") {
    _id
    meat
    cheese
    salsa
  }
}
`;
const createSecretBurritoMutation = gql`
mutation {
  createSecretBurrito(size: "huge") {
    _id
    size
  }
}
`;



const createTaco = graphql(createTacoMutation, {
  props: ({ ownProps, mutate }) => ({
    createTaco() {
      return mutate()
      .then((result) => {
        console.log(result);
      });
    },
  }),
});

const createSecretBurrito = graphql(createSecretBurritoMutation, {
  props: ({ ownProps, mutate }) => ({
    createSecretBurrito() {
      return mutate()
      .then((result) => {
        console.log(result);
      });
    },
  }),
});

export default compose(
  createTaco,
  createSecretBurrito,
)(Main);
