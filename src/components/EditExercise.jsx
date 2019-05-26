import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

class EditExercise extends Component {
  state = {
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({
      date,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, description, duration, date } = this.state;
    const { id } = this.props.match.params;

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    console.log(exercise);
    axios
      .post('http://localhost:5000/exercises/update/' + id, exercise)
      .then((res) => console.log(res.data));

    window.location = '/';
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get('http://localhost:5000/exercises/' + id)
      .then((res) => {
        const { username, description, duration, date } = res.data;
        this.setState({
          username,
          description,
          duration,
          date: new Date(date),
        });
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:5000/users/')
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map((user) => user.username)
          });
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              placeholder="description"
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="number"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              placeholder="Enter duration in minutes"
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditExercise;
