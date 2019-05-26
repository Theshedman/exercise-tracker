import React, { Component } from 'react';
import axios from 'axios';
import Exercise from './Exercise';

class ExercisesList extends Component {
  state = { exercises: [] };

  componentDidMount() {
    axios
      .get('https://exercise-tracking-app.herokuapp.com/exercises')
      .then((res) => {
        this.setState({ exercises: res.data });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise = (id) => {
    axios
      .delete('https://exercise-tracking-app.herokuapp.com/exercises/' + id)
      .then((res) => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  };

  exerciseList = () => {
    return this.state.exercises.map((currentExercise) => {
      return (
        <Exercise
          exercises={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExercisesList;
