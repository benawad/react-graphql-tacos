import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends Component {

  constructor(props) {
    super(props);
    this.handleTacoButton = this.handleTacoButton.bind(this);
    this.handleBurritoButton = this.handleBurritoButton.bind(this);
  }

  handleTacoButton() {
    this.props.createTaco();
    this.props.tacos.refetch();
  }

  handleBurritoButton() {
    this.props.updateSecretBurritos();
    this.props.initSecretBurritos.refetch();
  }

  render() {
    const { initSecretBurritos } = this.props;
    let secretBurritos = [];
    if (initSecretBurritos.viewer) {
      secretBurritos = initSecretBurritos.viewer.secretBurritos;
    }
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Button onClick={this.handleTacoButton} fluid>
              Create Taco
            </Button>
            <pre>
              {JSON.stringify(this.props.tacos.allTacos, null, 2)}
            </pre>
          </Grid.Column>
          <Grid.Column width={8}>
            <Button onClick={this.handleBurritoButton} fluid>
              Create Secret Burrito
            </Button>
            <pre>
              {JSON.stringify(secretBurritos, null, 2)}
            </pre>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8} />
          <Grid.Column width={8} />
        </Grid.Row>
      </Grid>
    );
  }
}

const getTacosQuery = gql`
{
  allTacos {
    _id
    meat
    cheese
    salsa
  }
}
`;

const getSecretBurritosQuery = gql`
{
  viewer {
    _id
    email
    secretBurritos {
      _id
      size
    }
  }
}
`;

const getTacos = graphql(getTacosQuery, {
  props: ({ data }) => ({
    tacos: data,
  }),
});

const getSecretBurritos = graphql(getSecretBurritosQuery, {
  options: { forceFetch: true },
  props: ({ data }) => ({
    initSecretBurritos: data,
  }),
});

export default compose(
  getTacos,
  getSecretBurritos
)(Home);
