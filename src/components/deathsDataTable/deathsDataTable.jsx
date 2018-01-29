import React from 'react';
import { Table } from 'react-bootstrap';

class DeathsDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      isFiltering: false,
    };
  }

  filterNameByAlphabet = () => {
    if (this.state.isFiltering === true) {
      this.setState({
        filteredData: null,
        isFiltering: false,
      });
      return;
    }
    const filteredData = this.props.deathData.data.map(item => item).sort((a, b) => a.name.localeCompare(b.name));
    this.setState({
      filteredData: { data: filteredData },
      isFiltering: true,
    });
  };

  filterDescriptionByAlphabet = () => {
    if (this.state.isFiltering === true) {
      this.setState({
        filteredData: null,
        isFiltering: false,
      });
      return;
    }
    const filteredData = this.props.deathData.data.map(item => item).sort((a, b) => a.role.localeCompare(b.role));
    this.setState({
      filteredData: { data: filteredData },
      isFiltering: true,
    });
  };

  filterExecutionByAlphabet = () => {
    if (this.state.isFiltering === true) {
      this.setState({
        filteredData: null,
        isFiltering: false,
      });
      return;
    }
    const filteredData = this.props.deathData.data.map(item => item).sort((a, b) => a.execution.localeCompare(b.execution));
    this.setState({
      filteredData: { data: filteredData },
      isFiltering: true,
    });
  };

  filterKilledByByAlphabet = () => {
    if (this.state.isFiltering === true) {
      this.setState({
        filteredData: null,
        isFiltering: false,
      });
      return;
    }
    const filteredData = this.props.deathData.data.map(item => item).sort((a, b) => a.killedBy.localeCompare(b.killedBy));
    this.setState({
      filteredData: { data: filteredData },
      isFiltering: true,
    });
  };

  filterMurderWeaponByAlphabet = () => {
    if (this.state.isFiltering === true) {
      this.setState({
        filteredData: null,
        isFiltering: false,
      });
      return;
    }
    const filteredData = this.props.deathData.data.map(item => item).sort((a, b) => a.murderWeapon.localeCompare(b.murderWeapon));
    this.setState({
      filteredData: { data: filteredData },
      isFiltering: true,
    });
  };

  render() {
    const renderData = this.state.isFiltering ? this.state.filteredData : this.props.deathData;
    return (
      <div>
        {this.props.deathData === null || this.props.deathData.data.length === 0 ?
          'Nothing found'
          :
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th onClick={this.filterNameByAlphabet}>Name</th>
                <th onClick={this.filterDescriptionByAlphabet}>Description</th>
                <th onClick={this.filterExecutionByAlphabet}>Execution</th>
                <th onClick={this.filterKilledByByAlphabet}>Killed by</th>
                <th onClick={this.filterMurderWeaponByAlphabet}>Murder weapon</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.deathData !== null ? renderData.data.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.execution}</td>
                    <td>{user.killedBy}</td>
                    <td>{user.murderWeapon}</td>
                    <td onClick={() => { this.props.deleteUser(user.id); }}>Delete</td>
                  </tr>
                );
              }) : null}
            </tbody>
          </Table>
        }
      </div>
    );
  }
}

export default DeathsDataTable;
