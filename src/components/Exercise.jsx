import React from 'react';
import { Link } from 'react-router-dom';

const Exercise = (props) => {
  console.log(props);
  return (
    <tr>
      <td>{props.exercises.username}</td>
      <td>{props.exercises.description}</td>
      <td>{props.exercises.duration}</td>
      <td>{props.exercises.date.slice(0, 10)}</td>
      <td>
        <Link to={'/edit/' + props.exercises._id}>edit</Link> |{' '}
        <button className="btn-link" onClick={() => props.deleteExercise(props.exercises._id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default Exercise;
