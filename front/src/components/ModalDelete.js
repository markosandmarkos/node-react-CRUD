import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap';
export default class ModalDelete extends Component {

  render() {
    return (
      <Modal isOpen={this.props.delModal} toggle={this.props.toggleDelModal}>
        <ModalHeader toggle={this.toggleDelModal}>Delete user</ModalHeader>
        <ModalBody>
          Are you sure delete ? 
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.delAction}>Delete</Button>
          <Button color="secondary" onClick={this.props.toggleDelModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}