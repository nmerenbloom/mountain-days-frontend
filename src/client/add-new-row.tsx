import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state-management/hooks';
import {
  addMountainDayAction,
  showNewRowAction,
  toggleIsLoadingAction,
} from '../state-management/reducer';
import { MountainDay } from '../types/mountain-day';
import { addMountainDay } from './api-calls';

export const AddNewRow = () => {
  const dispatch = useAppDispatch();

  const keys = ['date', 'riderName', 'mountainName', 'conditions'];
  const initFormState: MountainDay = {
    id: 0,
    mountainName: '',
    riderName: '',
    date: '',
    conditions: '',
  };

  const [newDay, setNewDay] = useState<MountainDay>(initFormState);

  return (
    <tr>
      {keys.map((k) => {
        const type = k === 'date' ? 'date' : 'text';
        const currVal = newDay[k as keyof MountainDay];
        return (
          <td id={k}>
            <input
              onChange={(e) => setNewDay({ ...newDay, [k]: e.target.value })}
              value={currVal ?? ''}
              className={`${
                currVal === '' && k !== 'conditions'
                  ? 'form-error'
                  : 'form-success'
              } form-control`}
              type={type}
            />
          </td>
        );
      })}
      <td>
        <button
          onClick={() => dispatch(showNewRowAction(false))}
          className='btn btn-danger'
        >
          X
        </button>
      </td>
      <td>
        <button
          disabled={!newDay.riderName || !newDay.mountainName || !newDay.date}
          className='btn btn-success'
          onClick={async () => {
            dispatch(toggleIsLoadingAction(true));
            dispatch(showNewRowAction(false));
            dispatch(addMountainDayAction(newDay));
            const postedToServer = await addMountainDay(newDay);
            if (!postedToServer) {
              alert('Error saving New Day to SQL Db');
            } else {
              alert('New Day successfully saved to SQL Db!');
            }

            dispatch(toggleIsLoadingAction(false));
          }}
        >
          ✓
        </button>
      </td>
    </tr>
  );
};
