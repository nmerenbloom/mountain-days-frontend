import 'bootstrap/dist/css/bootstrap.css';

import '../App.css';
import { useAppDispatch, useAppSelector } from '../state-management/hooks';
import {
  fetchMountainDaysDataAction,
  showNewRowAction,
  toggleIsLoadingAction,
} from '../state-management/reducer';
import { getAllMountainDays } from './api-calls';
import { useState } from 'react';
import { MountainDay } from '../types/mountain-day';
import { AddNewRow } from './add-new-row';

export const App = () => {
  const mountainDaysData = useAppSelector((state) => state.mountainDaysData);
  const isLoading = useAppSelector((state) => state.isLoading);
  const showNewRow = useAppSelector(
    (state) => state.mountainDaysData.showNewRow
  );
  const dispatch = useAppDispatch();

  const handleFetchClick = async () => {
    dispatch(toggleIsLoadingAction(true));
    let data = await getAllMountainDays();
    // console.log(data);
    if (data === false) {
      data = [];
      alert('Failed to fetch Mountain Days from SQL Db');
    }
    dispatch(fetchMountainDaysDataAction(data));
    dispatch(toggleIsLoadingAction(false));
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h2 className='display-5 mb-4'>
          <u>Mountain Days Log</u>
        </h2>
        <code>Click the button to fetch data from .NET Web API and SQL</code>
        <button
          onClick={() => handleFetchClick()}
          className='btn btn-danger my-1'
        >
          {mountainDaysData.fetchOccured ? 'Reload' : 'Click Me!'}
        </button>
        {mountainDaysData.fetchOccured ? (
          <button
            disabled={showNewRow}
            onClick={() => dispatch(showNewRowAction(true))}
            className='btn btn-success'
          >
            Add Entry
          </button>
        ) : null}
        {isLoading ? <h2>Loading...</h2> : null}
        {mountainDaysData.fetchOccured ? (
          <div className='d-flex justify-content-center mt-3 min-vw-100'>
            {/* <div className='table-responsive w-100'> */}
            <table className='table table-dark table-hover w-75 '>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Rider</th>
                  <th>Mountain</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {showNewRow ? <AddNewRow></AddNewRow> : null}
                {mountainDaysData.mountainDays?.map((md) => {
                  return (
                    <tr key={md.id}>
                      <td>{new Date(md.date).toLocaleDateString()}</td>
                      <td>{md.riderName}</td>
                      <td>{md.mountainName}</td>
                      <td>{md.conditions}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* </div> */}
          </div>
        ) : null}
      </header>
    </div>
  );
};
