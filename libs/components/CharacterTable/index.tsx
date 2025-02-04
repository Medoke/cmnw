import React, { FC, Fragment } from 'react';
import MUIDataTable from 'mui-datatables';
import { characterTable } from '../../types/components';
import Link from '../Link';
import { makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';

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

const CharacterTable: FC<characterTable> = ({ characters, roster }) => {
  const classes = useStyles();
  const options = {
    download: false,
    fixedSelectColumn: false,
    selectableRows: 'none',
    sortOrder: {
      name: roster ? 'rank' : '_id',
      direction: 'asc',
    }
  }

  const columns = [
    {
      name: '_id',
      label: 'Name',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) =>
          <Link
            href={`/character/${characters[dataIndex]._id}`}
            color='secondary'
            underline='hover'
          >
            {characters[dataIndex]._id.toUpperCase()}
          </Link>
      }
    },
    {
      name: 'hash_a',
      label: 'Hash A',
      options: {
        customBodyRenderLite: (dataIndex) =>
          characters[dataIndex].hash_a ?
          <Link
            href={`/hash/a@${characters[dataIndex].hash_a}`}
            color='secondary'
            underline='hover'
          >
            {`...${characters[dataIndex].hash_a.substr(-6).toUpperCase()}`}
          </Link> : <></>
      }
    },
    {
      name: 'hash_b',
      label: 'Hash B',
      options: {
        customBodyRenderLite: (dataIndex) =>
          characters[dataIndex].hash_b ?
            <Link
              href={`/hash/b@${characters[dataIndex].hash_b}`}
              color='secondary'
              underline='hover'
            >
              {`...${characters[dataIndex].hash_b.substr(-6).toUpperCase()}`}
            </Link> : <></>
      }
    },
    {
      name: 'guild',
      label: 'Guild',
      options: {
        display: roster ? 'excluded' : true,
        customBodyRenderLite: (dataIndex) =>
          characters[dataIndex].guild_id ?
            <Link
              href={`/guild/${characters[dataIndex].guild_id}`}
              color='secondary'
              underline='hover'
            >
              {characters[dataIndex].guild}
            </Link> : <></>
      }
    },
    {
      name: roster ? 'rank' : 'guild_rank',
      label: 'Rank',
      type: 'number',
    },
    {
      name: 'average_item_level',
      label: 'Item Level',
      type: 'number',
    },
    { label: 'Class', name: 'character_class' },
    { label: 'Specialization', name: 'active_spec' },
    { label: 'Achievement Points', name: 'achievement_points', type: 'number', options: { filter: false, display: roster, } },
    { label: 'Level', name: 'level', type: 'number' },
    { label: 'Faction', name: 'faction', options: { display: roster ? 'excluded' : true, }},
    { label: 'Race', name: 'race' },
    { label: 'Gender', name: 'gender' },
    { label: 'Covenant', name: 'chosen_covenant' },
    { label: 'Renown', name: 'renown_level' },
    {
      name: 'last_modified',
      label: 'Last Modified',
      type: 'date',
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex => characters[dataIndex].last_modified
          ? dayjs(characters[dataIndex].last_modified).format('HH:mm DD/MM/YY')
          : <></>
        )
      }
    },
  ];

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.table}>
          <MUIDataTable
            data={characters}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default CharacterTable;
