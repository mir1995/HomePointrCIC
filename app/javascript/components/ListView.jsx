import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Card, Col, Row, Button, Avatar, Icon } from "antd";
import TenantModal from "./modals/TenantModal";
import PropertyModal from "./modals/PropertyModal";
import "antd/dist/antd.css";

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: props.resources,
      type: props.type,
      checkbox: props.checkbox,
      avatar: props.avatar,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resources !== this.props.resources){
      this.setState({resources: nextProps.resources});
    }
  }

  renderCheckbox(id) {
    if (this.props.checkbox === true) {
      return (<Checkbox onChange={(e) => this.props.CheckboxChange(e, id)}>Checkbox</Checkbox>)
    }
  }

  renderAvatar(url){
    if (this.props.avatar === true) {
      if (url === undefined) {
        return (<Avatar size={200} shape="square" icon="user" />)
      } else {
        return (<Avatar size={200} shape="square" src={url} />)
      }
    } else {
      return null;
    }
  }

  renderTenantModal(resource, index) {
    if (this.props.apps) {
      return(<TenantModal property_id={this.props.property_id} app={this.props.apps[index]} name={resource.name} email={resource.email} description={resource.description} phone={resource.phone} housed={this.props.housed}/>)
    } else {
      return(<TenantModal name={resource.name} email={resource.email} description={resource.description} phone={resource.phone}/>)
    }
  }

  renderPropertyModal(resource) {
    if (this.props.property_modal) {
      return(<PropertyModal location={resource.location} description={resource.description} />)
    } else {
      return(<Button type="default" href={"/properties/" + resource.id}>
        View Info
      </Button>)
    }
  }

  render() {
    return this.state.resources.map((resource, index) => {
      const { Meta } = Card;
      return (
        <div
          style={{
            background: "#ECECEC",
            padding: "30px",
            marginLeft: "20%",
            marginRight: "20%",
            marginTop: "2%"
          }}
        >
          <Row gutter={16}>
            {this.state.type === "property" ? (
              <Card bordered={false}>
                <Meta
                  avatar={this.renderAvatar(resource.url)}
                  title={resource.location}
                  description={resource.description}
                />
                {this.renderCheckbox(resource.id)}
                {this.renderPropertyModal(resource)}
              </Card>
            ) : (
              <Card title={resource.name} bordered={false}>
                <Meta
                  avatar={this.renderAvatar(resource.url)}
                />
                {this.renderCheckbox(resource.id)}
                {this.renderTenantModal(resource, index)}
              </Card>
            )}
          </Row>
        </div>
      );
    });
  }
}

ListView.propTypes = {
  resources: PropTypes.array
};
ListView.defaultProps = {
  property_id: null,
  apps: null,
  housed: null,
  property_modal: null
};
export default ListView;
