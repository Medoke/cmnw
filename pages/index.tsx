import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import '../i18n';
import MetaHead from '../libs/components/MetaHead';
import { SearchForm } from '../libs/components/SearchForm';
import { INDEX_PAGE } from '../libs/constants';

const useStyles = makeStyles(() => ({
  main: {
    overflow: 'hidden',
    height: '95vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  root: {
    overflow: 'hidden',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <MetaHead
        title={'CMNW'}
        description={INDEX_PAGE.description}
        wowhead={false}
      />
      <Container maxWidth={false} className={classes.root}>
        <SearchForm/>
      </Container>
    </main>
  )
}

export default Home;
