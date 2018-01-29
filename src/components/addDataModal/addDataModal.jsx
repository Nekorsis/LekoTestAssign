import React from 'react';
import { Modal, Button, Label } from 'react-bootstrap';

class AddDataModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInputValue: '',
      descriptionInputValue: '',
      executionInputValue: '',
      killedByInputValue: '',
      murderWeaponInputValue: '',
      errors: null,
    };
  }

  userNameInputHandle = (e) => {
    this.setState({
      nameInputValue: e.target.value,
    });
  };

  descriptionInputValueHandle = (e) => {
    this.setState({
      descriptionInputValue: e.target.value,
    });
  };

  executionInputValueHandle = (e) => {
    this.setState({
      executionInputValue: e.target.value,
    });
  };
  
  killedByInputValueHandle = (e) => {
    this.setState({
      killedByInputValue: e.target.value,
    });
  };

  murderWeaponInputValueHandle = (e) => {
    this.setState({
      murderWeaponInputValue: e.target.value,
    });
  };

  validateInputs = (form, validators) => {
    return Object.keys(form)
      .map((key) => {
        const validator = validators[key];
        return validator(form);
      })
      .filter(Boolean);
  };

  getFromState = () => {
    return {
      name: this.state.nameInputValue,
      role: this.state.descriptionInputValue,
      execution: this.state.executionInputValue,
      killedBy: this.state.killedByInputValue,
      murderWeapon: this.state.murderWeaponInputValue,
    };
  };

  validators = {
    name: form => form.name === '' ? 'name_error' : undefined,
    role: form => form.role === '' ? 'description_error' : undefined,
    execution: form => form.execution === '' ? 'execution_error' : undefined,
    killedBy: form => form.killedBy === '' ? 'killedBy_error' : undefined,
    murderWeapon: form => form.murderWeapon === '' ? 'murderWeapon_error' : undefined,
  };

  resetModalState = () => {
    this.setState({
      nameInputValue: '',
      descriptionInputValue: '',
      executionInputValue: '',
      killedByInputValue: '',
      murderWeaponInputValue: '',
      errors: null,
    });
  };

  onAddSuccsess = () => {
    this.setState(() => {
      return { errors: this.validateInputs(this.getFromState(), this.validators) };
    });
    const localErrors = this.validateInputs(this.getFromState(), this.validators);
    if (localErrors && localErrors.length === 0) {
      this.props.onSuccsess(this.getFromState());
      this.resetModalState();
    }
  };

  onCancel = () => {
    this.resetModalState();
    this.props.onCancel();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.errors && this.state.errors.includes('name_error') ? <Label bsStyle="danger">Enter name</Label> : null}
          <input
            maxLength={100}
            type="text"
            className="form-control"
            value={this.state.nameInputValue}
            onChange={this.userNameInputHandle}
            placeholder="Name"
          />
          {this.state.errors && this.state.errors.includes('description_error') ? <Label bsStyle="danger">Enter description</Label> : null}
          <input
            maxLength={100}
            className="form-control"
            value={this.state.descriptionInputValue}
            onChange={this.descriptionInputValueHandle}
            placeholder="Description"
          />
          {this.state.errors && this.state.errors.includes('execution_error') ? <Label bsStyle="danger">Enter execution</Label> : null}
          <input
            maxLength={100}
            className="form-control"
            value={this.state.executionInputValue}
            onChange={this.executionInputValueHandle}
            placeholder="Execution"
          />
          {this.state.errors && this.state.errors.includes('killedBy_error') ? <Label bsStyle="danger">Enter killer name</Label> : null}
          <input
            maxLength={100}
            className="form-control"
            value={this.state.killedByInputValue}
            onChange={this.killedByInputValueHandle}
            placeholder="Killed by"
          />
          {this.state.errors && this.state.errors.includes('murderWeapon_error') ? <Label bsStyle="danger">Enter weapon</Label> : null}
          <input
            maxLength={100}
            className="form-control"
            value={this.state.murderWeaponInputValue}
            onChange={this.murderWeaponInputValueHandle}
            placeholder="Murder weapon"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onCancel}>Отмена</Button>
          <Button bsStyle="primary" onClick={this.onAddSuccsess}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddDataModal;
