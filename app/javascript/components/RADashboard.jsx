import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import ListView from "./ListView.jsx";
import Utils from 'helpers/utils';
import { Button } from 'antd';

class RADashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenants: props.tenants,
    }
  }

  redirectToNewTenant() {
    window.location = '/tenants/new'
  }

  render() {
    Utils.setup(this.state.tenants, this.props.tenantImages);
    Utils.setup(this.state.tenants, this.props.tenantStatuses);
    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}>
        <div>
          <h2 style={{
            marginTop: "88px",
            marginBottom: "42px",
            marginLeft: "10%",
          }}>Client Dashboard</h2>
          <ListView
            resources={this.state.tenants}
            type="tenant"
            avatar={true}
            tenant_modal={false}
            displayTag={true}
            renderModal={false}
            viewpoint="RA"
          />
        </div>
        <div>
          <Button
            style={{
              width: "208px",
              margin: "1.5% auto",
              marginTop: "154px",
              left: "80%",
            }}
            key='submit'
            type="primary"
            onClick={this.redirectToNewTenant}>+ Add new client
          </Button>
        </div>
      </div>
    );
  }

}

export default RADashboard;
