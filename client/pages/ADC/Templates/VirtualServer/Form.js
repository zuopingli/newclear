import React from 'react';
// import { FieldArray } from 'redux-form/immutable'; // imported Field
import { Checkbox, Radio, Col, Row, Panel } from 'react-bootstrap';
import Helmet from 'react-helmet';
// import { isEqual } from 'lodash';
// import { Map, fromJS } from 'immutable';
// import { SubmissionError } from 'redux-form';
import { A10FieldSubmit } from 'components/Form/A10Button';
import { A10Field, A10SchemaField } from 'components/Form/A10Field';
import A10Form from 'components/Form/A10Form';

import AppManager from 'helpers/AppManager';
import BaseForm from 'pages/BaseForm';

// import * as logger from 'helpers/logger';
// import { isInt } from 'helpers/validations';
import slbTemplateVirtualServerSchema from 'schemas/slb-template-virtual-server.json';

class TemplateVirtualServerForm extends BaseForm {
 
  render() {
    const { handleSubmit,  ...rest } = this.props; // eslint-disable-line
    const elements = slbTemplateVirtualServerSchema.properties;

    const panelFields = (
      <Panel header={<h4>Basic Field</h4>}>
        <A10SchemaField
          schema={elements['name']}
          name="template-virtual-server.name"
          component={A10Field}
          label="Name"
        />    
        <A10SchemaField
          schema={elements['conn-limit']}
          name="template-virtual-server.conn-limit"
          component={A10Field}
          label="Connection Limit"
        />
        <A10SchemaField
          schema={elements['conn-limit-reset']}
          name="template-virtual-server.conn-limit-reset"
          label="Connection Limit Reset"
          value={false}
        >
          <Checkbox value={true} />
        </A10SchemaField>
        <A10SchemaField
          schema={elements['conn-limit-no-logging']}
          name="template-virtual-server.conn-limit-no-logging"
          label="Connection Limit No Logging"
          value={false}
        >
          <Checkbox value={true} />
        </A10SchemaField>

        <A10SchemaField
          schema={elements['conn-rate-limit']}
          name="template-virtual-server.conn-rate-limit"
          component={A10Field}
          label="Connection Rate Limit"
        />

        <A10SchemaField
          schema={elements['rate-interval']}
          name="virtual-server.rate-interval"
          label="Per"
          value="1"
        >
          <div>
            <Radio value="0" inline> 100ms </Radio>
            <Radio value="1" inline> 1 second </Radio>
          </div>
        </A10SchemaField>

        <A10SchemaField
          schema={elements['conn-rate-limit-reset']}
          name="template-virtual-server.conn-rate-limit-reset"
          label="Connection Rate Limit Reset"
          value={false}
        >
          <Checkbox value={true} />
        </A10SchemaField>

        <A10SchemaField
          schema={elements['conn-rate-limit-no-logging']}
          name="template-virtual-server.conn-rate-limit-no-logging"
          label="Connection Rate Limit No Logging"
          value={false}
        >
          <Checkbox value={true} />
        </A10SchemaField>

        <A10SchemaField
          schema={elements['icmp-rate-limit']}
          name="template-virtual-server.icmp-rate-limit"
          component={A10Field}
          label="ICMP Rate Limit"
        />
        <A10SchemaField
          schema={elements['icmp-lockup']}
          name="template-virtual-server.icmp-lockup"
          component={A10Field}
          label="ICMP Lockup"
        />
        <A10SchemaField
          schema={elements['icmp-lockup-period']}
          name="template-virtual-server.icmp-lockup-period"
          component={A10Field}
          label="ICMP Lockup Period (seconds)"
        />
        <A10SchemaField
          schema={elements['icmpv6-rate-limit']}
          name="template-virtual-server.icmpv6-rate-limit"
          component={A10Field}
          label="ICMPv6 Rate Limit"
        />
        <A10SchemaField
          schema={elements['icmpv6-lockup']}
          name="template-virtual-server.icmpv6-lockup"
          component={A10Field}
          label="ICMPv6 Lockup"
        />
        <A10SchemaField
          schema={elements['icmpv6-lockup-period']}
          name="template-virtual-server.icmpv6-lockup-period"
          component={A10Field}
          label="ICMPv6 Lockup Period (seconds)"
        />

        <A10SchemaField
          schema={elements['subnet-gratuitous-arp']}
          name="template-virtual-server.subnet-gratuitous-arp"
          label="Subnet Gratuitous ARP"
          value={false}
        >
          <Checkbox value={true} />
        </A10SchemaField>
      </Panel> 
    );

    return (
      <div className="container-fluid">
        <Helmet title="Edit Template Virtual Server"/>
        <Row>
         
          <Col xs={12}>                   
              <A10Form schemas={[ slbTemplateVirtualServerSchema ]} edit={false}  horizontal>
                <Row>
                  <Col xs={12}>
                    {panelFields}
                  </Col>

                </Row>

                <A10FieldSubmit {...rest}/>

              </A10Form>              
          </Col>
        </Row>
      </div>      
    );
  }
}


const initialValues = {
};

const InitializeFromStateForm = AppManager({
  page: 'templateVirtualServer',
  form: 'templateVirtualServerForm', 
  initialValues: initialValues
})(TemplateVirtualServerForm);

export default InitializeFromStateForm;
