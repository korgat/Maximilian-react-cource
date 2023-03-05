import React, { useCallback, useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useRequest from './components/hooks/useRequest';

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest } = useRequest();

  const fetchTasks = useCallback(() => {
    const transformData = (data) => {
      console.log(data);
      const tasks = Object.entries(data).reduce((acc, [id, obj]) => {
        const task = {
          id,
          text: obj.text,
        };
        acc.push(task);
        return acc;
      }, []);

      setTasks(tasks);
    };
    sendRequest.call(
      null,
      {
        url: 'https://testtasks-ec0d0-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
      },
      transformData,
    );
  }, [sendRequest]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
    </React.Fragment>
  );
}

export default App;
