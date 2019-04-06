// import {
//   Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
// } from 'antd';
import React from "react";
import PropTypes from "prop-types";
import { Upload, message, Form, Icon, Select, Input, Button, Slider, Switch, DatePicker, InputNumber, Row, Col } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment';
import APIRoutes from 'helpers/api_routes';
import Utils from 'helpers/utils';
import UploadButton from './UploadButton';
import SliderBar from './SliderBar';
import ActiveStorageProvider from "react-activestorage-provider";
import PicturesWall from './PicturesWall';
import Avatar from './Avatar';
import '../../../assets/stylesheets/createFormTenant.css';

class CreateFormTenants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant: {
        name: '',
        description: '',
        email: '',
        phone: '',
        rent_min: 0,
        rent_max: 5000,
        housing_type: "other_housing_type",
        property_type: "other_property_type",
        number_of_bedrooms: 1,
        location: "other_location",
        referral_agency_id: this.props.current_userID,
        date_needed: new Date(),
        avatar: null,
        number_of_bathrooms: 1,
        mobility_aids: true,
        accessible_shower: true,
        car_parking: true,
        lift_access: true,
        family_size: 1,
        living_arrangements: '',
        income: '',
        benefits: true,
        local_council: true,
        ex_offender: true,
        local_area_link: '',
      },
      categories: props.categories,
      nice_housing_types: props.categories.nice_housing_types,
      nice_property_types: props.categories.nice_property_types,
      nice_locations: props.categories.nice_locations,
      housing_types: props.categories.housing_types,
      property_types: props.categories.property_types,
      locations: props.categories.locations,
      // avatar: this.props.tenant.avatar,
      fileList: [],
      imageRemoveList: [],
      disabled: false, //to prevent multiple form submissions
      stage: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.sliderChanges = this.sliderChanges.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.renderUpload = this.renderUpload.bind(this);
    this.setFile = this.setFile.bind(this);

    this.renderStageOne = this.renderStageOne.bind(this);
    this.renderStageTwo = this.renderStageTwo.bind(this);
    this.renderStageThree = this.renderStageThree.bind(this);
    this.renderStageFour = this.renderStageFour.bind(this);
    this.renderStageFive = this.renderStageFive.bind(this);
    this.renderStageSix = this.renderStageSix.bind(this);
    this.renderFormStage = this.renderFormStage.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  // componentDidMount() {
  //   render() {
  //     return <div>{this.renderStageOne()}</div>
  //   }
  // }

  convertToDict() {
    const tenant = this.state.tenant;
    const keys = ["name", "description", "email", "phone", "rent_min", "rent_max", "housing_type", "property_type", "number_of_bedrooms", "location", "referral_agency_id", "date_needed", "avatar", "number_of_bathrooms", "mobility_aids", "accessible_shower", "car_parking", "lift_access"];
    const values = [tenant.name, tenant.description, tenant.email, tenant.phone, tenant.rent_min, tenant.rent_max, tenant.housing_type, tenant.property_type, tenant.number_of_bedrooms, tenant.location, tenant.referral_agency_id, tenant.date_needed, tenant.avatar, tenant.number_of_bathrooms, tenant.mobility_aids, tenant.accessible_shower, tenant.car_parking, tenant.lift_access];
    let result = keys.reduce((obj, k, i) => ({...obj, [k]: values[i] }), {})
    return result
  }


  // api create
  handleCreate() {
    console.log(this.state.tenant);
    this.setState({disabled: true});
    var body = this.convertToDict()
    console.log(body);
    body = JSON.stringify({tenant: body});
    var request = APIRoutes.tenants.create;
    fetch(request, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {
      window.location = '/';
    }).catch((data) => {
      console.error(data);
    });
  }

  removeImages(imageList) {
    var i;
    for (i = 0; i < imageList.length; i++) {
      let request = APIRoutes.properties.delete_image(imageList[i]);
      (request, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
        }
      }).catch((data) => {
        console.error(data);
      });
    }
  }
  sliderChanges([value1, value2]) {
    const tenant = this.state.tenant;
    tenant["rent_min"] = value1;
    tenant["rent_max"] = value2;
    this.setState({ tenant: tenant });
  }
  handleChange(attr) {
    const tenant = this.state.tenant;
    tenant[attr] = event.target.value;
    this.setState({ tenant: tenant });
    console.log(attr);
    console.log(event.target.value);
    console.log(tenant);
  }
  handleChangeDate(date) {
    console.log(date);
    const tenant = this.state.tenant;
    tenant["date_needed"] = date.format("YYYY-MM-DD");
    this.setState({ tenant: tenant });
  }
  handleChangeSelect(attr, value) {
    const tenant = this.state.tenant;
    tenant[attr] = value;
    this.setState({ tenant: tenant })
    console.log(attr);
    console.log(value);
  }

  setFile(e) {
    const files = e.target.files;
    if (!files || !files[0]) {
      return;
    }
    this.setState({ avatar: files[0] });
  }

  renderUpload() {
    let buttonProps = null;
      buttonProps = {
        listType: 'picture-card',
        fileList: this.state.fileList,
        onRemoveRequest: (e) => this.state.imageRemoveList.push(e.uid),
        className: 'upload-list-inline',
        onChange: (fileList) => this.handleChangeImage(fileList)
      };

      // <ActiveStorageProvider
      //   endpoint={{
      //     path: '/api/tenants/' + this.state.tenant.id.toString(),
      //     model: "Tenant",
      //     attribute: 'avatar',
      //     method: "PUT",
      //   }}
      //   headers={{
      //     'Content-Type': 'application/json'
      //   }}
      //   render={Utils.activeStorageUploadRenderer}
      // />

    return (
      <div>
        Images
        <PicturesWall {...buttonProps} />
      </div>
    )
  }

  renderStageOne() {
    const { tenant } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    return (
      <div className="container">
        <div>Step 1: blah blah blah</div>
        <Form className="grid-container">
          <Form.Item
            label="Name"
          >
            {getFieldDecorator('name', {
              initialValue: tenant.name,
              rules: [{
                required: true, message: 'Please input your Name!',
              }],
            })(
              <Input onChange={() => this.handleChange("name")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Email"
          >
            {getFieldDecorator('email', {
              initialValue: tenant.email,
              rules: [{
                required: true, message: 'Please input your email!',
              }, {
                type: 'email', message: 'The input is not a valid email!'
              }],
            })(
              <Input onChange={() => this.handleChange("email")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Phone Number"
          >
            {getFieldDecorator('phone', {
              initialValue: tenant.phone,
              rules: [{
                required: true, message: 'Please input your phone number!',
              }]
            })(
              <Input onChange={() => this.handleChange("phone")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Location"
          >
          {getFieldDecorator('location', {
            initialValue: tenant.location,
            rules: [{
              required: true, message: 'Please pick a number of bedrooms!',
            }],
          })(
            <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("location", value)}>
            {
              this.state.nice_locations.map((obj, i) => {
                return <Option key={i} value={this.state.locations[i]}>{obj}</Option>
              })
            }
            </Select>
          )}
          </Form.Item>
          <Form.Item
            label="Family Size"
          >
            {getFieldDecorator('family_size', {
              initialValue: tenant.family_size,
              rules: [{
                required: true, message: 'Please pick you family size!',
              }],
            })(
              <InputNumber
                min={0}
                max={30}
                value={tenant.family_size}
                onChange={(value) => this.handleChangeSelect("family_size", value)}
              />
            )}
          </Form.Item>
          <Form.Item
            label="Current Living Arrangements"
          >
            {getFieldDecorator('living_arrangements', {
              initialValue: tenant.living_arrangements,
              rules: [{
                required: true, message: 'Please input your current living arrangements!',
              }]
            })(
              <Input onChange={() => this.handleChange("living_arrangements")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Household Income"
          >
            {getFieldDecorator('income', {
              initialValue: tenant.income,
              rules: [{
                required: true, message: 'Please input your household income!',
              }]
            })(
              <Input onChange={() => this.handleChange("income")}/>
            )}
          </Form.Item>
          <Form.Item
            label="Receiving Benefits?"
          >
            {getFieldDecorator('benefits', {
              initialValue: tenant.benefits,
              rules: [{
                required: true, message: 'Please select a response!',
              }],
            })(
              <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("benefits", value)}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            )}
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {window.location = '/'}}>Cancel</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(2)}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageTwo() {
    const marks = {
      0: "$0",
      2500: "$2500",
      5000: "$5000"
    }
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    const { tenant } = this.state;
    return (
      <div className="container">
        <div>Step 2: Housing preferences</div>
        <Form>
          <div className="grid-container">
            <Form.Item
              label="Housing Type"
              >
              {getFieldDecorator('housing_type', {
                initialValue: tenant.housing_type,
                rules: [{
                  required: true, message: 'Please pick a number of bedrooms!',
                }],
              })(
                <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("housing_type", value)}>
                {
                  this.state.nice_housing_types.map((obj, i) => {
                    return <Option key={i} value={this.state.housing_types[i]}>{obj}</Option>
                  })
                }
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Property Type"
            >
              {getFieldDecorator('property_type', {
                initialValue: tenant.property_type,
                rules: [{
                  required: true, message: 'Please pick a number of bedrooms!',
                }],
              })(
                <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("property_type", value)}>
                {
                  this.state.nice_property_types.map((obj, i) => {
                    return <Option key={i} value={this.state.property_types[i]}>{obj}</Option>
                  })
                }
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Number of Bedrooms"
            >
              {getFieldDecorator('number_of_bedrooms', {
                initialValue: tenant.number_of_bedrooms,
                rules: [{
                  required: true, message: 'Please pick a number of bedrooms!',
                }],
              })(
                <InputNumber
                  min={0}
                  max={10}
                  value={tenant.number_of_bedrooms}
                  onChange={(value) => this.handleChangeSelect("number_of_bedrooms", value)}
                />
              )}
            </Form.Item>
            <Form.Item
              label="Number of Bathrooms"
            >
              {getFieldDecorator('number_of_bathrooms', {
                initialValue: tenant.number_of_bathrooms,
                rules: [{
                  required: true, message: 'Please pick a number of bathrooms!',
                }],
              })(
                <InputNumber
                  min={0}
                  max={10}
                  value={tenant.number_of_bathrooms}
                  onChange={(value) => this.handleChangeSelect("number_of_bathrooms", value)}
                />
              )}
            </Form.Item>
            <Form.Item
              label="Date Needed"
            >
              {getFieldDecorator('date_needed', {
                initialValue: moment(tenant.date_needed, "YYYY-MM-DD"),
                rules: [{
                  required: true, message: 'Please pick the date needed!',
                }],
              })(
                <DatePicker onChange={this.handleChangeDate}/>
              )}
            </Form.Item>
          </div>
          <Form.Item
            label="Rent"
          >
            {getFieldDecorator('rent', {
              rules: [{
                required: true, message: 'Please select your range for rent!',
              }],
            })(
              <Row gutter={10}>
                <Col span={6}>
                  <InputNumber
                    min={0}
                    max={5000}
                    style={{ width: 80 }}
                    value={tenant.rent_min}
                    onChange={() => this.handleChange("rent_min")}
                  />
                </Col>
                <Col className="slider" span={12}>
                  <Slider
                    range marks={marks}
                    min={0}
                    max={5000}
                    style={{ width: 200, paddingLeft: 10 }}
                    defaultValue={typeof tenant.rent_min === 'number' && typeof tenant.rent_max === 'number'? [tenant.rent_min, tenant.rent_max] : [0, 5000]}
                    onChange={this.sliderChanges}/>
                </Col>
                <Col span={6}>
                  <InputNumber
                    min={0}
                    max={5000}
                    style={{ width: 80 }}
                    value={tenant.rent_max}
                    onChange={() => this.handleChange("rent_max")}
                  />
                </Col>
              </Row>
            )}
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(1)}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(3)}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageThree() {
    const { tenant } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    return (
      <div className="container">
        <div>Step 3: blah blah</div>
        <Form>
          <div className="grid-container">
            <Form.Item
              label="Mobility Aids"
            >
              {getFieldDecorator('mobility_aids', {
                initialValue: tenant.mobility_aids,
                rules: [{
                  required: true, message: 'Please select a response!',
                }],
              })(
                <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("mobility_aids", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Accessible Shower"
            >
              {getFieldDecorator('accessible_shower', {
                initialValue: tenant.accessible_shower,
                rules: [{
                  required: true, message: 'Please select a response!',
                }],
              })(
                <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("accessible_shower", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Car Parking"
            >
              {getFieldDecorator('car_parking', {
                initialValue: tenant.car_parking,
                rules: [{
                  required: true, message: 'Please select a response!',
                }],
              })(
                <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("car_parking", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Lift Access"
            >
              {getFieldDecorator('lift_access', {
                initialValue: tenant.lift_access,
                rules: [{
                  required: true, message: 'Please select a response!',
                }],
              })(
                <Select placeholder="Select One" onChange={(value) => this.handleChangeSelect("lift_access", value)}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
          </div>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(2)}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(4)}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageFour() {
    const { tenant } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="container">
        <div>Step 4: Wooo description</div>
        <Form>
          <Form.Item
            label="Description"
          >
            {getFieldDecorator('description', {
              initialValue: tenant.description,
              rules: [{
                required: true, message: 'Please input your description!',
              }],
            })(
              <Input style={{ height: 120 }} onChange={() => this.handleChange("description")}/>
            )}
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(3)}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(5)}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageFive() {
    const { tenant } = this.state;
    return (
      <div className="container">
        <div>Step 5: Add a profile photo</div>
        <Form>
          <Form.Item
            label="Upload Avatar"
          >
            <ActiveStorageProvider
              endpoint={{
                path: '/api/tenants/' + 'new',
                model: "Tenant",
                attribute: 'avatar',
                method: "PUT",
              }}
              multiple={true}
              headers={{
                'Content-Type': 'application/json'
              }}
              render={Utils.activeStorageUploadRenderer}
            />
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(4)}}>Previous</Button>
          <Button className="next" type="primary" onClick={() => {this.nextButton(6)}}>Next</Button>
        </div>
      </div>
    )
  }

  renderStageSix() {
    const { tenant } = this.state;
    return (
      <div className="container">
        <div>Step 5: Add Default Client Form</div>
        <Form>
          <Form.Item
            label="Upload Form"
          >
            <ActiveStorageProvider
              endpoint={{
                path: '/api/tenants/' + 'new',
                model: "Tenant",
                attribute: 'form',
                method: "PUT",
              }}
              multiple={true}
              headers={{
                'Content-Type': 'application/json'
              }}
              render={Utils.activeStorageUploadRenderer}
            />
          </Form.Item>
        </Form>
        <div className="buttons">
          <Button className="previous" onClick={() => {this.nextButton(5)}}>Previous</Button>
          <Button className="next" type="primary" onClick={this.handleCreate}>Submit</Button>
        </div>
      </div>
    )
  }

  nextButton(stage) {
    this.setState({ stage: stage });
  }

  renderFormStage() {
    const { stage } = this.state;
    console.log("in renderFormStage");
    if (stage == 1) {
      return (
        <div>{this.renderStageOne()}</div>
      )
    }
    if (stage == 2) {
      return (
        <div>{this.renderStageTwo()}</div>
      )
    }
    if (stage == 3) {
      return (
        <div>{this.renderStageThree()}</div>
      )
    }
    if (stage == 4) {
      return (
        <div>{this.renderStageFour()}</div>
      )
    }
    if (stage == 5) {
      return (
        <div>{this.renderStageFive()}</div>
      )
    }
    if (stage == 6) {
      return (
        <div>{this.renderStageSix()}</div>
      )
    }
  }

  render() {
    let component = this.renderFormStage();
    return (
      <div>
        {component}
      </div>
    )
  }

}
// const WrappedProfileFormTenants = Form.create({name: 'profileTenants'})(ProfileFormTenants);
export default Form.create()(CreateFormTenants);