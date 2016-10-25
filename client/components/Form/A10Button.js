import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getComponentVar } from 'helpers/stateHelper';
import { widgetWrapper } from 'helpers/widgetWrapper';
import FieldConnector from 'helpers/FieldConnector';
import { buildInstancePath } from 'helpers/actionHelper';
// import { setComponentVisible } from 'redux/modules/app/component';
// import { change } from 'redux-form/immutable';
// import invariant from 'invariant';

class A10Button extends Component {
  static displayName = 'A10Button'
  static contextTypes = {
    props: PropTypes.object,
    context: PropTypes.object
  }

  // context defined at page
  constructor(props, context) {
    super(props, context);
    //this._parentProps = context.props;
    this.modelVisible = false;
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { env, app, form, children, onClick, componentClass, instancePath,
      popup: { id, pageClass, title,  connectOptions,
      urlKeysConnect,  ...modalProps }, attrs } = this.props;
    /* eslint-enable no-unused-vars */

    let popupContent = null, click = onClick, modal = null;
    if (pageClass) {
      const modalInstancePath = buildInstancePath(instancePath[0], instancePath[1], pageClass.displayName, pageClass.componentId);
      // const modalInstancePath = this.props.findTargetByName(pageClass.displayName);
      this.modelVisible = getComponentVar(app, modalInstancePath, 'visible');
      // console.log(this.modelVisible, 'modal instance', modalInstancePath);
      click = () => {
        this.props.kickBall('showMe', null, modalInstancePath);
        return false;
      };

      if (!this.modelVisible) {
        modal = children;
      } else {
        const changeFormField = (name, value) => {
          this.context.props.change(instancePath[0], name, value);
        };

        popupContent = React.createElement(pageClass, {
          modalInstancePath,
          fieldConnector: new FieldConnector(connectOptions, form, env, changeFormField),
          urlKeysConnect
        });

        modal = (
          <span>{children}
            <Modal show={this.modelVisible}  {...modalProps}>
                <Modal.Header>
                  <Modal.Title>{ title || children }</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  {popupContent}
                </Modal.Body>

            </Modal>
          </span>
        );
      }
    } else {
      modal = children;
    }

    let buttonStyle = {
      cursor: 'pointer'
    };

    return React.createElement( componentClass || Button, { onClick: click, style: buttonStyle, ...attrs }, modal);
  }
}

export default widgetWrapper(A10Button);
