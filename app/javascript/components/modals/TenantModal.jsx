import React from 'react';
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import { Modal, Button, Icon, Card, Avatar, Table } from 'antd';
import ApplicationStatusButtons from './../individual/ApplicationStatusButtons'
import '../../../assets/stylesheets/modal.css';
import Utils from "helpers/utils";

class TenantModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
    }
  }

  handleButtons() {
    if (this.props.housed == null) {
        return(
          <ApplicationStatusButtons
            property_id={this.props.application.property_id}
            application_id={this.props.application.id}
            status={this.props.application.status}/>
          )
    }
  }

  renderAttachment() {
    if (this.props.application) {
      return(<p><a href={this.props.application.url}><Icon type="paper-clip" />Attachment</a></p>)
    }
  }

  // renderAvatar(images){
  //   if (typeof(images) === "string") {
  //       return (<Avatar size={200} shape="square" src={images} />);
  //   } else {
  //     return (<Avatar size={200} shape="square" src={images[0].url} />)
  //   }
  // }

  renderAvatar = () => {
    return(
      <img className="modal-avatar" height="224" width="224" src={this.props.tenant.url} />
    );
  }

  render() {
    const dataSource = [{
      fileName: 'Tenant Application',
      lastUpdated: 'THIS WILL BE UPDATED',
      attachment: 'THIS TOO'
    }, {
      fileName: 'Additional Files',
      lastUpdated: this.props.application.updated_at,
      attachment: 'Download'
    }];

    const columns = [{
      title: 'File Name',
      dataIndex: 'fileName',
    }, {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
    }, {
      title: 'Attachment',
      dataIndex: 'attachment',
      render: download => <a href={this.props.application.url}>{download}</a>
    }];


    return (
      <div>
        <Modal
          title={this.props.name}
          visible={this.props.visible}
          onOk={this.props.onOk}
          onCancel={this.props.onCancel}
          footer={null}
          width={"1008px"}
        >
          <div className="tenant-modal">
            <div className="modal-content">
              <div className="basic-info">
                {this.renderAvatar()}
                <div className="modal-subsection">
                  <h3>Email</h3>
                  {this.props.tenant.email}
                </div>
                <div className="modal-subsection">
                  <h3>Phone</h3>
                  {this.props.tenant.phone}
                </div>
                <div className="modal-subsection">
                  <h3>Housing Type</h3>
                  {this.props.tenant.housing_type}
                </div>
                <div className="modal-subsection">
                  <h3>Date Needed</h3>
                  {this.props.tenant.date_needed}
                </div>
              </div>
              <div className="detailed-info">
                <h1>{this.props.tenant.name}</h1>
                <div className="modal-subsection">
                  <h3>Status</h3>
                  {Utils.renderStatus(this.props.tenant.status, true)}
                </div>
                <div className="modal-subsection">
                  {this.props.tenant.description}
                </div>
                <div className="table-container">
                  <div className="table">
                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            {this.handleButtons()}
          </div>


        </Modal>
      </div>
    );
  }
}

TenantModal.propTypes = {
  email: PropTypes.string,
  phone: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  app: PropTypes.object,
  property_id: PropTypes.number,
  housed: PropTypes.bool
};

TenantModal.defaultProps = {
  app: null,
};

export default TenantModal;
