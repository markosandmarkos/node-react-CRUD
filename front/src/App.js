import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Container, Row, Button, Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import ModalCreate from './components/ModalCreate';
import ModalEdit from './components/ModalEdit';
import ModalDelete from './components/ModalDelete';

class App extends Component {

  state = {
    serverData: [],
    createModal: false,
    editModal:false,
    delModal:false,
    username: '',
    email: '',
    editUsername: '',
    editEmail: '',
    dataId: ''
  }

  toggleCreateModal = () => {
    this.setState({
      createModal: !this.state.createModal
    });
  }

  toggleEditModal = (e) => {

    this.setState({
      editModal: !this.state.editModal,
      dataId: e.currentTarget.dataset.id,
      username: e.currentTarget.dataset.username,
      email: e.currentTarget.dataset.email
    });
    
  }

  toggleDelModal = (e) => {
    this.setState({
      delModal: !this.state.delModal,
      dataId: e.currentTarget.dataset.id,
    });
  }

  createAction = () => {
    axios.post('http://localhost:3001/', {
      username: this.state.username,
      email: this.state.email
    })
      .then( (response) => {
        if(response.data.status) {
          this.setState({
            serverData: response.data.data,
            createModal: false,
            username: '',
            email: ''
          })
        } else {
          alert('Email is invalid');
        }
        
      })
  }

  editAction = () => {
    axios.put('http://localhost:3001/'+ this.state.dataId, {
      username: this.state.username,
      email: this.state.email
    })
      .then( (response) => {
        if(response.data.status) {
          this.setState({
            serverData: response.data.data,
            editModal: false,
            username: '',
            email: '',
            dataId: false
          })
        } else {
          alert('Email is invalid');
        }
      })
  }

  delAction = () => {
    axios.delete('http://localhost:3001/'+ this.state.dataId)
      .then( (response) => {
        if(response.data.status) {
          this.setState({
            serverData: response.data.data,
            delModal: false,
            username: '',
            email: '',
            dataId: false
          })
        }
      })
  }

  componentDidMount () {
    axios.get('http://localhost:3001')
      .then( (response) => {
        this.setState({
          serverData: response.data,
        })
      })
      .then(() => {
        console.log(this.state.serverData)
      })
  }

  emailChange = (e) => {
    this.setState({email: e.target.value})
  }

  usernameChange = (e) => {
    this.setState({username: e.target.value})
  }

  render() {
    return (
      <Container>
          <Row>

            <Button onClick={this.toggleCreateModal} outline color="success" className="my-3">Add new user</Button>

            <Table>

              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.serverData.length &&
                this.state.serverData.map((value) => (
                  <tr key={value._id}>
                      <td>{value._id}</td>
                      <td>{value.username}</td>
                      <td>{value.email}</td>
                      <td>

                        <Button 
                          data-id={value._id} 
                          data-username={value.username} 
                          data-email={value.email} 
                          size="sm" 
                          outline 
                          className="mr-2" 
                          color="info" 
                          onClick={this.toggleEditModal}>
                            Edit
                          </Button>

                          <Button 
                            data-id={value._id} 
                            onClick={this.toggleDelModal} 
                            size="sm" 
                            outline 
                            className="mr-2" 
                            color="danger">
                            Delete
                          </Button>

                      </td>
                  </tr>))}
              </tbody>
            </Table>
          </Row>

          <ModalCreate 
            createModal={this.state.createModal} 
            usernameChange={this.usernameChange}
            emailChange={this.emailChange}
            username={this.state.username}
            email={this.state.email}
            createAction={this.createAction}
            toggleCreateModal={this.toggleCreateModal}
          />

           <ModalEdit 
            editModal={this.state.editModal} 
            usernameChange={this.usernameChange}
            emailChange={this.emailChange}
            username={this.state.username}
            email={this.state.email}
            editAction={this.editAction}
            toggleEditModal={this.toggleEditModal}
          />

          <ModalDelete
            delModal={this.state.delModal} 
            delAction={this.delAction}
            toggleDelModal={this.toggleDelModal}
          />

      </Container>

    );
  }
}

export default App;
