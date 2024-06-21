import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterTasks } from '../redux/actions';
import Task from './Task';

const ListTask = () => {
    const tasks = useSelector((state) => state.tasks);
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Completed') return task.isDone;
        if (filter === 'Active') return !task.isDone;
        return true;
    });

    return (
        <div>
            <div>
                <label>Filter: </label>
                <select onChange={(e) => dispatch(filterTasks(e.target.value))} value={filter}>
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div className="task-list">
                {filteredTasks.map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default ListTask;
