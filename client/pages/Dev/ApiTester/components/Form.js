import React from 'react';
import { Field } from 'redux-form/immutable'; // imported Field
import { Form, FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup, Panel } from 'react-bootstrap';
import Helmet from 'react-helmet';

import Inspector from 'react-json-inspector';
import 'react-json-inspector/json-inspector.css';
import JSONEditor from 'components/JSONEditor';
// import Immutable from 'immutable';
import BaseForm from 'pages/BaseForm';

import FormManager from 'helpers/FormManager';
import auth from 'helpers/auth';

const initialValues = {
  path: '/axapi/v3/auth',
  method: 'POST',
  body: { credentials: { username: 'admin', password: 'a10' } }
};

class AxapiForm extends BaseForm {

  state = { sessionId: auth.getToken() }

  setHistoryQuery(historyData) {
    const dateReg = /^\d{4}.*:\d{2}$/;
    if (dateReg.test(historyData['key'])) {
      this.props.initialize(historyData.value.data);
    }
    return false;
  }

  clearHistoryQuery() {
    localStorage.removeItem('axapi');
    this.props.initialize(initialValues);
    this.forceUpdate();
  }

  initSession() {
    const promise = this.props.axapiRequest(initialValues);
    promise.then(() => {
      this.setState({ sessionId: auth.getToken() });
    });
  }

  fetchHistory() {
    const historyData = JSON.parse(localStorage.getItem('axapi')) || [];
    let result = {};
    historyData.forEach((value) => {
      const path = value.body.data.path.replace('/axapi/v3/', '');
      if (!result[path]) {
        result[path] = [] ;
      }
      result[path][value['at']] = value['body'];
    });
    return result;
  }

  render() {
    const { submitting, reset, pristine } = this.props;
    const { axapiResponse, handleSubmit } = this.props;
    const historyData = this.fetchHistory();
    // console.log(axapiResponse);
    // console.log(this.context, '>>>>>>>>>>>>>props');
    return (
      <div className="container-fluid">
        <Helmet title="API TESTER"/>
          <Row>
            <Col xs={2}>
              <h4>Request History </h4>
              <Inspector data={historyData || {}} onClick={::this.setHistoryQuery} /> 
              <Button onClick={::this.clearHistoryQuery} >Clear</Button>
            </Col>
            <Col xs={5}>   
              <h4>Request </h4>   
              <Panel>
                <Form onSubmit={handleSubmit(this.props.axapiRequest)} horizontal>
                  <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                      Session
                    </Col>
                    <Col sm={10}>
                  <FormControl.Static>
                  { this.state.sessionId } 
                  <Button onClick={::this.initSession} bsSize="small" >Init Session</Button> 
                  </FormControl.Static>             
                      </Col>
                  </FormGroup>  
                        
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Path</Col>
                    <Col sm={10}>
                      <Field name="path" component='input' type="text" placeholder="path without prefix" className="form-control"/>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Method</Col>
                    <Col sm={10}>
                      <Field component="select" name="method" className="form-control">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PUT">PUT</option>
                      </Field>
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>

          
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>Body</Col>
                    <Col sm={10}>
                      <Field component={JSONEditor} className="form-control" name="body"  />
                    </Col>
                    <FormControl.Feedback />
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <ButtonToolbar>
                        <ButtonGroup bsSize="large">
                          <Button type="submit" disabled={submitting} bsStyle="success">
                            {submitting ? <i/> : <i/>} Request
                          </Button>
                          <Button type="button" disabled={pristine || submitting} onClick={reset}>
                            Reset
                          </Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                      </Col>
                  </FormGroup>
                </Form>
              </Panel>
            </Col>
            <Col xs={5}>
              <h4>Current Result </h4>
              <Inspector data={axapiResponse && axapiResponse.toJS() || {}} />              
            </Col>
          </Row>
      </div>      
    );
  }
}

const InitializeFromStateForm = FormManager({
  page: 'axapiTesterTool',
  initialValues
})(AxapiForm);

export default InitializeFromStateForm;
