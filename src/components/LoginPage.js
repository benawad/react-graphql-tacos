import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { browserHistory } from 'react-router';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    this.props.login(this.state.username, this.state.password);
    e.preventDefault();
    this.setState({ username: '', password: '' });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} >
        <Form.Field>
          <label>Email</label>
          <input
            name="username"
            onChange={e => this.setState({ username: e.target.value })}
            value={this.state.username}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            name="password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
            placeholder="Password"
            type="password"
          />
        </Form.Field>
        <Button type="submit">Login</Button>
      </Form>
    );
  }
}

const loginMutation = gql`
mutation ($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    data {
      secretBurritos {
        size
      }
    }
  }
}
`;

const login = graphql(loginMutation, {
  props: ({ ownProps, mutate }) => ({
    login(email, password) {
      return mutate({
        variables: {
          email,
          password,
        },
      })
      .then(({ data }) => {
        window.localStorage.token = data.login.token;
        // todo: add to redux store
        browserHistory.push('/');
        ownProps.secretBurritos = data;
      });
    },
  }),
});

export default login(LoginPage);
