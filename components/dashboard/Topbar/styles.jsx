import { red } from "@material-ui/core/colors";

export default theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.border}`,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    zIndex: theme.zIndex.appBar
  },
  toolbar: {
    minHeight: 'auto',
    width: '100%'
  },
  title: {
    marginLeft: theme.spacing(1)
  },
  menuButton: {
    marginLeft: '-4px'
  },
  notificationsButton: {
    marginLeft: 'auto'
  },
  signOutButton: {
    marginLeft:  theme.spacing(1),
    color : red[800]
  },
  popper : {
    zIndex : 10000
  },
  chip : {
    padding: theme.spacing(0.5)
  },
  buttonsContainers : {
    display : 'inline-flex',
    alignItems : 'center',
    '& > :first-child' : {
      marginRight : 15
    }
  },
  badge : {
    top : 6,
    right : 6
  },
  badgeMobile : {
    top : 14
  },
  reduceScale : {
    transform : 'scale(0.8)',
    marginRight : -15
  }
});
