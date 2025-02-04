import React, { FC, Fragment } from 'react';
import MUIDataTable from "mui-datatables";
import { logTable } from '../../types/components';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    borderRadius: '15px',
  },
  table: {
    color: 'white',
    padding: '1rem',
    borderRadius: '15px',
    border: 'solid 25px white',
  }
}));

const columns = [
  {
    name: 'event',
    label: 'Event',
  },
  {
    name: 'action',
    label: 'Action',
  },
  {
    name: 'original',
    label: 'Original',
  },
  {
    name: 'updated',
    label: 'Updated',
  },
  {
    name: 't0',
    label: 'After',
    type: 'date',
  },
  {
    name: 't1',
    label: 'Before',
    type: 'date',
  }
];

const options = {
  download: false,
  fixedSelectColumn: false,
  selectableRows: 'none',
}


export const LogTable: FC<logTable> = ({ logs }) => {
  if (!logs || logs.length === 0) return (<div/>);
  const classes = useStyles();
  const data = logs.map(l => Object.assign(l, { id: l._id }));
  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.table}>
          <MUIDataTable
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </Fragment>
  )
};
