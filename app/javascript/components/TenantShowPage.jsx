import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import SplitViewContainer from "./individual/SplitViewContainer.jsx";
import RATenantView from "./RATenantView.jsx";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Icon, Button, Tabs } from "antd";

class TenantShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: props.applications,
      properties: props.properties,
      // potentialTenants: props.potentialTenants
    }
  }

  render() {
    Utils.setup(this.state.applications, this.props.form);
    Utils.setup(this.state.properties, this.props.propertyimages);
    Utils.setup(this.state.properties, this.props.propertyForms);
    Utils.setup(this.state.properties, this.props.propertyStatuses);
    const leftComponent = (
      <RATenantView
        key={this.props.tenant.id}
        tenant={this.props.tenant}
        mode="ra_edit"
        avatar={this.props.url}
        status={this.props.status}/>
    );
    const rightComponent = (
      <div>
        <h1>Applications</h1>
        <ListView
          key={this.props.tenant.id}
          applications={this.state.applications}
          resources={this.state.properties}
          property_modal={true}
          type="property"
          displayTag={true}
          renderModal={true}/>
      </div>
    );

    return (
      [
      <Button type="default" href={"/"}>
        <Icon type="left" /> Back
      </Button>,
      <SplitViewContainer
        leftComponent={leftComponent}
        rightComponent={rightComponent}
      />
      ]
    );
  }
}

TenantShowPage.propTypes = {
  status: PropTypes.number,
  applications: PropTypes.array,
  form: PropTypes.array,
  tenant: PropTypes.object,
  properties: PropTypes.array,
  tagValues: PropTypes.array,
  url: PropTypes.string
};
export default TenantShowPage;
