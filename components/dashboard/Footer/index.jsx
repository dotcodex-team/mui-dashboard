import React from 'react';

// Externals
import PropTypes from 'prop-types';
import cn from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4),
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
  },
});

const Footer = ({ classes, className }) => {
  const rootClassName = cn(classes.root, className);

  return (
    <div className={rootClassName}>
      <Divider />
      <Typography className={classes.company} variant="body1">
        &copy; DotCode. 2019
      </Typography>
      <Typography variant="caption">
         {"Creado con <3"}
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
