import { useState } from 'react';
import useRequest from '../hooks/useRequest';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const { error, isLoading, sendRequest } = useRequest();
  const dataHandler = (taskText, data) => {
    props.onAddTask({ id: data.name, text: taskText });
  };

  const enterTaskHandler = async (taskText) => {
    sendRequest(
      {
        url: 'https://testtasks-ec0d0-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'POST',
        body: { text: taskText },
        headers: {
          'Content-Type': 'application/json',
        },
      },
      dataHandler.bind(null, taskText),
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
