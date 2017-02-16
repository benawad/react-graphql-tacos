import React, { Component } from 'react';

import { Link } from 'react-router';
import { Header, Container } from 'semantic-ui-react';

import { browserHistory } from 'react-router';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Main extends Component {
  render() {
    return (
      <Container text>
        <Header as="h1" textAlign="center">
          <Link to="/">Title</Link>
        </Header>
        {React.cloneElement(this.props.children, this.props)}
      </Container>
    );
  }
}

const logginMutation = gql`
mutation ($email: String!, $password: String!) {
  loggin(email: $email, password: $password) {
    token
    data {
      secretBurritos {
        size
      }
    }
  }
}
`;
const signUpMutation = gql`
mutation ($email: String!, $password: String!) {
  signUp(email: $email, password: $password) {
    _id
  }
}
`;
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

const getAllTacosQuery = gql`
{
  allTacos {
    _id
    meat
    cheese
    salsa
  }
}
`;

const loggin = graphql(logginMutation, {
  props: ({ ownProps, mutate }) => ({
    loggin(email, password) {
      return mutate({
        variables: {
          email,
          password,
        },
      })
      .then(({ data }) => {
        window.localStorage.token = data.loggin.token;
        // todo: add to redux store
        browserHistory.push('/');
        ownProps.secretBurritos = data;
      });
    },
  }),
});

const signup = graphql(signUpMutation, {
  props: ({ ownProps, mutate }) => ({
    signup(email, password) {
      return mutate({
        variables: {
          email,
          password,
        },
      })
      .then((result) => {
        browserHistory.push('/login');
      });
    },
  }),
});

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

const getAllTacos = graphql(getAllTacosQuery, {
  name: 'AllTacos',
});

export default compose(
  loggin,
  signup,
  createTaco,
  createSecretBurrito,
  getAllTacos,
)(Main);
