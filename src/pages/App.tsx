import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import rp from 'request-promise';

import useStyles from './AppStyles';
import ServerBlock from '../components/ServerBlock';

interface IServerResponseList {
  name: string;
  url: string;
  status: string;
  color: string;
  responseStr: string;
}

interface IResponseList {
  status: string;
  color: string;
  responseStr: string;
}

const REFRESH_TIME = 5*60000; // 5 minutes

const App = () => {
  const classes = useStyles();

  let initialServersList: IServerResponseList[] = [
    {
      name: 'Stackworx Server',
      url: 'https://stackworx.io/',
      responseStr: "",
      status: "OTHER",
      color: "grey",
    },
    {
      name: 'Vantage Server',
      url: 'https://dev.vantage.run/health/',
      responseStr: "",
      status: "OTHER",
      color: "grey",
    },
    {
      name: 'Gitlab Server',
      url: 'https://status.gitlab.com/',
      responseStr: "",
      status: "OTHER",
      color: "grey",
    },
    {
      name: 'HttpStat Test Server',
      url: 'https://httpstat.us/403/',
      responseStr: "",
      status: "OTHER",
      color: "grey",
    }
  ];

  let [serversList, setResponseList] = useState(initialServersList);

  const makeApiCall = (url: string): any => {
    let serverResponse: IResponseList;
    return rp({
      url : url,
      method : 'GET',
      resolveWithFullResponse: true,
      json: true
    })
    .then(function (response: any) {
      serverResponse = {
        responseStr: response.statusCode,
        status: "UP",
        color: "green",
      };
      return serverResponse;
    })
    .catch(function (error: any) {
      if (error.name === "StatusCodeError") {
        serverResponse = {
          responseStr: error.message,
          status: "DOWN",
          color: "red",
        };
        return serverResponse;
      }
      else {
        serverResponse = {
          responseStr: error.message,
          status: "OTHER",
          color: "grey",
        };
        return serverResponse;
      };
    });
  };

  const processServerResponses = async () => {
    let result: IServerResponseList[];
    let promises: IServerResponseList[] = [];
  
    for(let i = 0; i < serversList.length; i++){
      promises.push(makeApiCall(serversList[i].url));
    }

    result = await Promise.all(promises);
    for(let i = 0; i < serversList.length; i++){
      console.log(result[i].responseStr);
      serversList[i].responseStr = JSON.stringify(result[i].responseStr);
      serversList[i].status = result[i].status;
      serversList[i].color = result[i].color;
    }

    return serversList;
  };

  useEffect(() => {
    (async () => {
      let result: IServerResponseList[] = await processServerResponses();
      setResponseList([...result]);
    })();

    const interval = setInterval(async () => {
      let result: IServerResponseList[] = await processServerResponses();
      setResponseList([...result]);
    }, REFRESH_TIME);
  
    return () => clearInterval(interval);
  });

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
          <Grid container justify="center" spacing={2}>
            {serversList.map((value, index) => (
              <Grid key={index} item>
                <ServerBlock name={value.name} status={value.status} color={value.color} response={value.responseStr}/>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;