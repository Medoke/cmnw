import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import '../i18n';
import { initReactI18next } from 'react-i18next';
import { useTranslation } from 'react-i18next';
import MetaHead from '../libs/components/MetaHead';
import { INDEX_PAGE } from '../libs/constants';
import { SearchForm } from '../libs/components/SearchForm';

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
