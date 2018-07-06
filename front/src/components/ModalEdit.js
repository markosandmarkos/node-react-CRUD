import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Form, FormGroup, Label, Input} from 'reactstrap';
export default class ModalEdit extends Component {

  render() {
    return (
      <Modal isOpen={this.props.editModal} toggle={this.props.toggleEditModal}>
        <ModalHeader toggle={this.toggleEditModal}>Edit user</ModalHeader>
        <ModalBody>
          <Form>
              <FormGroup>
                <Label for="examplePassword">Username</Label>
                <Input type="text" onChange={this.props.usernameChange} value={this.props.username} name="username" id="examplePassword" placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" onChange={this.props.emailChange} value={this.props.email} name="email" id="exampleEmail" placeholder="Email" />
              </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.editAction}>Edit</Button>
          <Button color="secondary" onClick={this.props.toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}