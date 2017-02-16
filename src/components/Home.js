import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';

import { graphql } from 'react-apollo';
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
    this.props.createSecretBurrito();
    this.props.secretBurritos.refetch();
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Button onClick={this.handleTacoButton} fluid>
              Create Taco
            </Button>
          </Grid.Column>
          <Grid.Column width={8}>
            <Button onClick={() => this.props.createSecretBurrito()} fluid>
              Create Secret Burrito
            </Button>
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
  tacos(meat: "chicken") {
    _id
    meat
    cheese
    salsa
  }
}
`;

const getTacos = graphql(getTacosQuery, {
  options: { forceFetch: true },
  props: ({ data }) => ({
    tacos: data,
  }),
});

export default getTacos(Home);
