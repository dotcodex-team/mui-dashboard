import React, { useState } from 'react';
// import Head from '@components/utils/Head'
// Externals
import cn from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { makeStyles } from '@material-ui/styles';
import withWidth from '@material-ui/core/withWidth';
// Material components
import Drawer from '@material-ui/core/Drawer';

// Custom components
import Sidebar from '@components/dashboard/Sidebar';
import Topbar from '@components/dashboard/Topbar';
import Head from '@components/utils/Head';

const useStyles = makeStyles(theme => ({
  '@global': {
    '.block-picker' : {
      '& :nth-child(2)' : {
        '& div' : {
          visibility: 'hidden',
          position: 'relative',
          width : '100%',
          '&::after' : {
            content : "'¡ Tú color !'",
            visibility: 'visible',
            // lineHeight : 20,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            textAlign : 'center',
            color : 'white',
            fontWeight : 'bold'
          }
        }
      },
      '& :nth-child(3)':{
        '& :nth-child(2)' : {
          display : 'none'
        }
      }
    }
  },
  topbar: {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    right: 'auto',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen + 100
    })
  },
  topbarShift: {
    marginLeft: '288px',
    width: 'calc(100vw - 288px)'
  },
  drawerPaper: {
    zIndex: 1200,
    width: '288px'
  },
  sidebar: {
    // width: '270px'
  },
  content: {
    padding: theme.spacing(),
    marginTop: '64px',
    overflow : 'auto',
    height : 'calc(100vh - 64px)',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen + 100
    })
  },
  contentShift: {
    marginLeft: '288px'
  }
}))

const DashboardLayout = ({ width, title, children }) => {
  const classes = useStyles();
  const isMobile = ['xs', 'sm', 'md'].includes(width);
  //const {data : {events}} = useQuery(queries.events, {fetchPolicy:'cache-only'});
  const [menuOpen, setMenuOpen] = useState(true);

  const handleClose = () => setMenuOpen(false)

  const handleToggleOpen = () => setMenuOpen(!menuOpen)


  const shiftComponents = menuOpen && !isMobile;

  return (
    <>
      <Head title={process.env.appName} />
      <Topbar
        className={cn(classes.topbar, {
          [classes.topbarShift]: shiftComponents,
        })}
        isSidebarOpen={menuOpen}
        onToggleSidebar={handleToggleOpen}
        title={title}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={handleClose}
        open={menuOpen}
        variant={isMobile ? 'temporary' : 'persistent'}
      >
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <main
        className={cn(classes.content, {
          [classes.contentShift]: shiftComponents,
        })}
      >
        {children}
      </main>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.string.isRequired,
};

export default withWidth()(DashboardLayout);
