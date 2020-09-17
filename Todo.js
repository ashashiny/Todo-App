import React, { Component } from 'react';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      mockData: [{
        id: '1',
        name: 'Smith',
        done: false,
        date: new Date()
      }, {
        id: '2',
        name: 'Scott',
        done: false,
        date: new Date()
      }, {
        id: '3',
        name: 'Mark',
        done: false,
        date: new Date()
      }, {
        id: '4',
        name: 'Mike',
        done: false,
        date: new Date()
      }],
    }
  }

  onSubmitHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: [...this.state.mockData, {
        id: Date.now(),
        name: event.target.item.value,
        done: false,
        date: new Date()
      }]
    });

    event.target.item.value = '';
  }
  onSubmitSearchHandle(event)
  {
    event.preventDefault();
    let name = event.target.search.value;

    if(name!=="")
    {
      this.setState({
        mockData: this.state.mockData.filter(item => {
          if (item.name === name) {
            return item;
          }
        })
      });
    }
    else
    {
            return this.state.mockData;
    }

  }
  onDeleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }

  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      name: arguments[1]
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item['name'] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    });

    this.setState({
      edit: false
    });
  }

  onCompleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = true;
          return item;
        }

        return item;
      })
    });
  }

  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)}>
        <input type="text" name="updatedItem" className="item" defaultValue={this.state.name} />
        <button className="update-add-item button edit">Update</button>
      </form>
    }
  }
  ViewList()
  {
    window.location.reload(false);
  }
  render() {
    return (
      <div>
        {this.renderEditForm()}
        <form onSubmit={this.onSubmitHandle.bind(this)}>
          <input type="text" name="item" className="item" />
          <button className="btn-add-item button add">Add</button>
        </form>
        <form onSubmit={this.onSubmitSearchHandle.bind(this)}>
          <input type="text" name="search" className="search" />
          <button className="btn-add-item button add">Search</button>
        </form>
        <button className="btn-add-item button add" onClick={this.ViewList.bind()}>ViewList</button>

        <table>
          <thead>
          {/* <th>Id</th> */}
            <th>Name</th>
            <th colSpan="2">Action</th>
          </thead>
          {this.state.mockData.map(item => (
            <tr key={item.id} className={ item.done ? 'done' : 'hidden' }>
               {/* <td>  {item.id}</td> */}
            <td>  {item.name}</td>
            <td>              <button className="button delete" onClick={this.onDeleteHandle.bind(this, item.id)}>Delete</button></td>
            <td>              <button className="button edit" onClick={this.onEditHandle.bind(this, item.id, item.name)}>Edit</button></td>
            </tr>
          ))}
        </table>
        <ul>
         
        </ul>
      </div>
    );
  }
}

export default Todo;
