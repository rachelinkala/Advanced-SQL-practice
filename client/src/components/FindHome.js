import React from 'react'
import axios from 'axios'
import { Form, List } from 'semantic-ui-react'

class FindHome extends React.Component {
  state = { properties: [], agents: [], agent: null, buyers: [], buyer: null }

  componentDidMount() {
    axios.get('/api/agents')
      .then( res => this.setState({ agents: res.data }) )
  }

  showProperties = () => {
  const { properties } = this.state;
  return properties.map( p =>
    <List key={p.id}>
      <List.Content>
        <List.Header>${p.price} - {p.sq_ft}</List.Header>
        <List.Description>{p.city}</List.Description>
      </List.Content>
    </List>
  )
}

  getBuyers = (e, { value }) => {
    this.setState({ agent: value }, () => {
      axios.get(`/api/agents/${this.state.agent}`)
        .then( res => this.setState({ buyers: res.data }) )
    })
  }

  buyerList = () => {
    const { buyers } = this.state
    return buyers.map( buyer => {
      return {
        key: buyer.id,
        value: buyer.id,
        text: `${buyer.first_name} ${buyer.last_name}`
      }
    })
  }

  agentList = () => {
    const { agents } = this.state
    return agents.map( agent => {
      return { 
        key: agent.id, 
        value: agent.id,
        text: `${agent.first_name} ${agent.last_name}`
      }
    })
  }

  getProperties = (e, { value }) => {
    this.setState({ buyer: value }, () => {
      axios.get(`/api/buyers/${this.state.buyer}`)
        .then( res => this.setState({ properties: res.data }) )
    })
  }

  render() {
    const { agent, properties } = this.state
    return (
      <div>
        <Form.Select 
          options={this.agentList()} 
          onChange={this.getBuyers}
          label="Agents"
        />
        { agent &&
            <Form.Select
              options={this.buyerList()}
              label="Buyers"
              onChange={this.getProperties}
            />
        }
        { properties.length > 0 && this.showProperties() }
      </div>
    )
  }
}

export default FindHome
