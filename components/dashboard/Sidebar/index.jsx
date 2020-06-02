import React from 'react';
import Link from 'next/link';
import NavLink from '@components/shared/NavLink';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn'
import FaceIcon from '@material-ui/icons/Face'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import AlarmOnIcon from '@material-ui/icons/AlarmOn'
import PerfectScrollbar from 'react-perfect-scrollbar'
import BookIcon from '@material-ui/icons/Book';
// Component styles
import styles from './styles';
import { ListItemAvatar,Typography } from '@material-ui/core';
import AvatarUser from './AvatarUser'

const Sidebar = ({ classes, className }) => {
const rootClassName = classNames(classes.root, className);

  return (
    <PerfectScrollbar>
        <nav className={rootClassName}>
        <Link href="/">
            <ListItem>
                <ListItemAvatar>
                    <img height="45" src="/images/logos/logo.png" />
                </ListItemAvatar>
                <ListItemText style={{marginLeft: 10}}>
                    <Typography color="primary" variant="h5">
                        {process.env.appName}
                    </Typography>
                </ListItemText>
            </ListItem>
        </Link>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
            <React.Fragment>
                <AvatarUser />
            </React.Fragment>
        </div>    
        <Divider className={classes.profileDivider} />
        <List component="div" disablePadding>
            <NavLink href="/" activeClassName={classes.activeListItem}>
                <ListItem
                    className={classes.listItem}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                    <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Página 1"
                    />
                </ListItem>
            </NavLink>
            <NavLink href="/pagina2" activeClassName={classes.activeListItem}>
                <ListItem
                    className={classes.listItem}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <AssignmentTurnedIn />
                    </ListItemIcon>
                    <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Página 2"
                    />
                </ListItem>
            </NavLink>
            <NavLink href="/pagina3" activeClassName={classes.activeListItem}>
                <ListItem
                    className={classes.listItem}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <FaceIcon />
                    </ListItemIcon>
                    <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Página 3"
                    />
                </ListItem>
            </NavLink>
            <NavLink href="/pagina4" activeClassName={classes.activeListItem}>
                <ListItem
                    className={classes.listItem}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Página 4"
                    />
                </ListItem>
            </NavLink>
            <NavLink href="/pagina5" activeClassName={classes.activeListItem}>
                <ListItem
                className={classes.listItem}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <AlarmOnIcon />
                    </ListItemIcon>
                    <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Página 5"
                    />
                </ListItem>
            </NavLink>
            <NavLink href="/pagina6" activeClassName={classes.activeListItem}>
                <ListItem
                className={classes.listItem}
                >
                    <ListItemIcon className={classes.listItemIcon}>
                        <BookIcon />
                    </ListItemIcon>
                    <ListItemText
                    classes={{ primary: classes.listItemText }}
                    primary="Página 6"
                    />
                </ListItem>
            </NavLink>
        </List>
        </nav>
    </PerfectScrollbar>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
