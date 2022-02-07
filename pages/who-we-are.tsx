import { Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../i18n';
import ContributionStar from '../libs/components/ContributionStar';
import MetaHead from '../libs/components/MetaHead';
import { CONTRIBUTORS, WHO_WE_ARE } from '../libs/constants';

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: '65px',
    minHeight: '90vh',
  },
  divider: {
    padding: theme.spacing(2),
  },
  memory: {
    margin: theme.spacing(4),
    textTransform: 'uppercase',
  }
}));

const WhoWeAre = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  return (
    <main className={classes.main}>
      <MetaHead
        title={'The Conglomerat'}
        description={WHO_WE_ARE.description}
        wowhead={false}/>
      <Container maxWidth={false} className={classes.divider}>
        <Divider/>
        <Typography variant="h2" component="h1" align="center" className={classes.memory} gutterBottom>
        {t('WhoWeArePage.GreatManyThanks')}
        </Typography>
        <Divider/>
        <Grid container>
          {CONTRIBUTORS.map((contributor, i) => (
            <Grid item xs={3} key={i}>
              <ContributionStar
                character={contributor.character}
                name={contributor.name}
                discord={contributor.discord}
                twitter={contributor.twitter}
                github={contributor.github}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  )
}

export default WhoWeAre;
