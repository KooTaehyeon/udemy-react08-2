import { useState } from 'react';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import Usehttp from '../../hooks/use-http';
const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequsest } = Usehttp();

  const enterTaskHandler = async (taskText) => {
    const createTask = (taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };
    sendTaskRequsest(
      {
        url: 'https://udemy-react-f19a8-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { text: taskText },
      },
      createTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
