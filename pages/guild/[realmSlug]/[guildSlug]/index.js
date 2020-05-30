import React from "react";
import fetch from 'node-fetch'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Link from "../../../../src/Link";
import MaterialTable from 'material-table';
import {
    Container, Grid,
    Divider, Typography,
    AppBar, Paper, Box, Tabs, Tab,
} from "@material-ui/core";

import {
    AddBox, ArrowDownward, Check,
    ChevronLeft, ChevronRight, Clear,
    DeleteOutline, Edit, FilterList,
    FirstPage, LastPage, Remove,
    SaveAlt, Search, ViewColumn
} from '@material-ui/icons';

const tableIcons = {
    Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: React.forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: React.forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: React.forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: React.forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: React.forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: React.forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    root: {
        marginTop: theme.spacing(2),
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        marginTop: theme.spacing(10),
        padding: theme.spacing(6, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    title: {
        fontFamily: 'Fira Sans',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        fontWeight: 400,
        textTransform: 'uppercase'
    },
    cardTitle: {
        fontSize: '1.1em',
        fontWeight: 600
    },
}));

function GuildPage({
       id,
       name,
       realm,
       updatedBy, guild_log,
       members,
       achievement_points, created_timestamp, member_count,
       //crest,
       createdAt, updatedAt
    }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    let join, leave, demote, promote;
    if (guild_log) ({join, leave, demote, promote} = guild_log);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
                <Container maxWidth="lg">
                    <Typography component="h1" variant="h2" align="center" color="secondary" className={classes.title} gutterBottom>
                        {name}@{realm.name}
                    </Typography>
                </Container>
            </div>
            {/* End hero unit */}
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item key={0} xs={12} sm={6} md={6}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            Summary
                        </Typography>
                        <Divider light />
                        <Typography variant="caption" display="block">
                            ID: {id}
                        </Typography>
                        <Typography variant="caption" display="block">
                            Achievements: {achievement_points}
                        </Typography>
                        <Typography variant="caption" display="block">
                            Members: {member_count}
                        </Typography>
                    </Grid>
                    <Grid item key={1} xs={12} sm={6} md={6}>
                        <Typography gutterBottom variant="overline" display="block" component="h2" className={classes.cardTitle}>
                            {updatedBy}
                        </Typography>
                        <Divider />
                        <Typography variant="caption" display="block">
                            Founded: {new Date(created_timestamp).toLocaleString('en-GB')}
                        </Typography>
                        <Typography variant="caption" display="block">
                            Indexed: {new Date(createdAt).toLocaleString('en-GB')}
                        </Typography>
                        <Typography variant="caption" display="block">
                            Updated: {new Date(updatedAt).toLocaleString('en-GB')}
                        </Typography>
                    </Grid>
                </Grid>
                <div className={classes.root}>
                    <AppBar position="static" color="primary">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="GuildLog"
                            centered
                        >
                            <Tab label="Members" {...a11yProps(0)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Paper className={classes.paper}>
                            <MaterialTable
                                title="Basic Sorting Preview"
                                icons={tableIcons}
                                columns={[
                                    {
                                        field: 'url_id',
                                        title: 'Name',
                                        render: rowData => <Link href={rowData.url_id} color="secondary" underline="hover">{rowData._id}</Link>
                                    },
                                    {
                                        title: 'Rank',
                                        field: 'rank',
                                        type: 'numeric',
                                        render: rowData => (parseInt(rowData.rank) === 0) ? ('GM') : (rowData.rank)
                                    },
                                    {
                                        field: 'url_a',
                                        title: 'Hash A',
                                        render: rowData => <Link href={rowData.url_a} color="secondary" underline="hover">{rowData.a}</Link>
                                    },
                                    {
                                        field: 'url_b',
                                        title: 'Hash B',
                                        render: rowData => <Link href={rowData.url_b} color="secondary" underline="hover">{rowData.b}</Link>
                                    },
                                    {
                                        field: 'url_c',
                                        title: 'Hash C',
                                        render: rowData => <Link href={rowData.url_c} color="secondary" underline="hover">{rowData.c}</Link>
                                    },
                                    {
                                        field: 'url_ex',
                                        title: 'Hash EX',
                                        render: rowData => <Link href={rowData.url_ex} color="secondary" underline="hover">{rowData.ex}</Link>
                                    },
                                    {
                                        title: 'Last Modified',
                                        field: 'lastModified',
                                        render: rowData => new Date(rowData.lastModified).toLocaleString('en-GB')
                                    },
                                ]}
                                data={members.map(({_id, name, realm, guild, hash, lastModified}) => {
                                    let row = {
                                        _id: _id,
                                        url_id: `/character/${realm.name}/${name}`,
                                        rank: `${guild.rank}`,
                                        a: 0,
                                        url_a: ``,
                                        b: 0,
                                        url_b: ``,
                                        c: 0,
                                        url_c: ``,
                                        ex: 0,
                                        url_ex: ``,
                                        lastModified: lastModified
                                    };
                                    if (hash) {
                                        if ("a" in hash) {
                                            row.a = hash.a;
                                            row.url_a = `/find/${hash.a}`;
                                        }
                                        if ("b" in hash) {
                                            row.b = hash.b;
                                            row.url_b = `/find/${hash.b}`;
                                        }
                                        if ("c" in hash) {
                                            row.c = hash.c;
                                            row.url_c = `/find/${hash.c}`;
                                        }
                                        if ("ex" in hash) {
                                            row.ex = hash.ex;
                                            row.url_ex = `/find/${hash.ex}`;
                                        }
                                    }
                                    return row
                                })}
                                options={{
                                    sorting: true,
                                    pageSize: 20,
                                    pageSizeOptions: [10,25,50],
                                    showTitle: false,
                                }}
                            />
                        </Paper>
                    </TabPanel>
                </div>
            </Container>
        </main>
    )
}

export async function getServerSideProps({query}) {
    const {realmSlug, guildSlug} = query;
    const res = await fetch(encodeURI(`http://localhost:3030/api/guilds/${(guildSlug)}@${realmSlug}`));
    const json = await res.json();
    return { props: json}
}

export default GuildPage