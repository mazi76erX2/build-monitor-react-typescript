import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

import useStyles from './AppStyles';
import ServerBlock from '../components/ServerBlock';

const App = () => {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);

  const [checkNumber, setCheckNumber] = useState(0);
  const [serverStatus, setServerStatus] = useState({color: "grey"});

  const servers = [
    {
      
    },
  ]

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Server Build Monitor
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.serverGroup}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {[0, 1, 2].map((value) => (
              <Grid key={value} item>
                <ServerBlock name="Server 1" status="UP" color="green" response="Response"/>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>

      <ServerBlock name="Server 1" status="UP" color="green" response="Response"/>
      <ServerBlock name="Server 2" status="DOWN" color="red" response="Response"/>
      <ServerBlock name="Server 3" status="OTHER" color="grey" response="Response"/>
    </div>
  );
}

export default App;