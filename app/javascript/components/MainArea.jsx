import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropertyLandingCard from './individual/PropertyLandingCard'
import '../../assets/stylesheets/mainArea.css';

class MainArea extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
				properties: props.properties,
		}
	}
	render () {
		let propertyCards = this.state.properties.map(property => {
			return (
				<Col xs="3" >
					<PropertyLandingCard property={property}/>
				</Col>
			)
		})
		return (
			<Container className="container">
				<Row >
					{propertyCards}
				</Row>
			</Container>
		)
	}
}

export default MainArea;
