import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import logo from '../../../assets/images/logo.png';

class PropertyLandingCard extends React.Component {
	constructor(props) {
	super(props);
	}
	render() {
		return ( 
				<Card style={{width:"80%", height:"60%"}} >
					<CardImg top width="100%" src={logo} alt="Card image cap"/>
					<CardBody>
						<CardTitle> {this.props.property.housing_type}</CardTitle>
						<CardSubtitle>From</CardSubtitle>
						<CardText>Some quick example</CardText>
					</CardBody>
				</Card>
		)
	}
}
export default PropertyLandingCard;
