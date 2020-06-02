import React from 'react';

// Externals
import cn from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex'
  }
});

const PortletToolbar = ({ classes, className, children, ...rest }) => {
  const rootClassName = cn(classes.root, className);

  return (
    <div {...rest} className={rootClassName}>
      {children}
    </div>
  );
};

PortletToolbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PortletToolbar);
