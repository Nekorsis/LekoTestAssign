import React from 'react';
import { Grid, Panel, Button, PageHeader, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import uuidv1 from 'uuid/v1';
import DeathsDataTable from './../../components/deathsDataTable/deathsDataTable.jsx';
import AddDataModal from './../../components/addDataModal/addDataModal.jsx';


import './../../styles/index.css';

class UsersList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deathsData: null,
      isModalOpen: false,
      searchInputValue: '',
      isSearching: false,
      searchResult: null,
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          deathsData: data,
        });
      })
      .catch(err => console.log(err));
  }

  addUser = (inputsData) => {
    const serverData = inputsData;
    serverData.id = uuidv1();
    const requestBody = {
      serverData,
    };
    const httpHeaders = {
      'Content-Type': 'application/json',
    };
    const myHeaders = new Headers(httpHeaders);
    fetch('http://localhost:3000/add_data', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          deathsData: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.closeAddModal();
  };

  deleteUser = (dataId) => {
    const requestBody = {
      index: dataId,
    };
    const httpHeaders = {
      'Content-Type': 'application/json',
    };
    const myHeaders = new Headers(httpHeaders);
    fetch('http://localhost:3000/delete_data', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: myHeaders,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          deathsData: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  openAddModal = () => {
    this.setState(() => ({
      isModalOpen: true,
    }));
  };

  closeAddModal = () => {
    this.setState(() => ({
      isModalOpen: false,
    }));
  };

  searchInputValueHandle = (e) => {
    this.setState({
      searchInputValue: e.target.value,
    });
  };
  
  onSearchClick = () => {
    const searchString = this.state.searchInputValue.toLowerCase();
    if (searchString === '') {
      return;
    }
    const searchResult = this.state.deathsData.data.filter((item) => {
      return (item.name.toLowerCase().includes(searchString)
        || item.role.toLowerCase().includes(searchString)
        || item.execution.toLowerCase().includes(searchString)
        || item.killedBy.toLowerCase().includes(searchString)
        || item.murderWeapon.toLowerCase().includes(searchString));
    });
    this.setState({
      isSearching: true,
      searchResult: { data: searchResult },
    });
  };

  exitSearch = () => {
    this.setState({
      isSearching: false,
      searchResult: null,
      searchInputValue: '',
    });
  };

  render() {
    const deathData = this.state.isSearching ? this.state.searchResult : this.state.deathsData;
    return (
      <Grid>
        <Panel>
          <PageHeader>
            {'Game of thrones deaths'}
          </PageHeader>
          <Button onClick={this.openAddModal} bsStyle="primary" style={{ marginBottom: '20px' }}>
            {'Add data'}
          </Button>
          {this.state.isSearching
            ?
              <Button onClick={this.exitSearch} bsStyle="primary" type="submit" style={{ marginLeft: '20px', marginBottom: '20px' }}>
                {'Exit search'}
              </Button>
            :
            null
          }
          <FormGroup>
            <InputGroup>
              <FormControl type="text" onChange={this.searchInputValueHandle} value={this.state.searchInputValue} maxLength={100} />
              <InputGroup.Button>
                <Button onClick={this.onSearchClick}>
                  {'Search'}
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
          <AddDataModal
            show={this.state.isModalOpen}
            onHide={this.closeAddModal}
            title="Add data"
            onSuccsess={this.addUser}
            onCancel={this.closeAddModal}
          />
          <DeathsDataTable
            deathData={deathData}
            deleteUser={this.deleteUser}
          />
        </Panel>
      </Grid>
    );
  }
}

export default UsersList;
