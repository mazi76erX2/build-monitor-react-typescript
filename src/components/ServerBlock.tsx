import React, { useState } from 'react';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FaServer, FaAngleDown } from "react-icons/fa";

import useStyles from './ServerBlockStyles';


type Props = {
  name: string;
  status: string;
  color: string;
  response: string;
}

const ServerBlock = ({ name, status, color, response }: Props): JSX.Element => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="main">
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
          <FaServer size="70px" color={color}></FaServer>
          <Typography variant="body2" component="p">
            server is {status}
          </Typography>
        </CardContent>

        <CardActions>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <FaAngleDown></FaAngleDown>
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {response}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default ServerBlock;