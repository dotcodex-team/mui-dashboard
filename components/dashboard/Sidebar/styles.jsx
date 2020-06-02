import hexToRgba from 'hex-to-rgba';

export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  titleContainer : {
    display: 'flex',
    flexDirection : 'column',
    alignItems : 'center'
  },
  title : {
    fontWeight : 'bold'
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '63px',
    flexShrink: 0,
    cursor:'pointer'
  },
  logoLink: {
    fontSize: 0
  },
  logoImage: {
    width : 30,
    height : 30
  },
  logoDivider: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    width: '100%',
    display: 'flex',
    minHeight : 80,
    flexDirection: 'row',
  },
  avatar: {
    cursor : 'pointer',
    width: 60,
    height: 60,
    marginLeft: '5%'
  },
  profileInfo:{
    display:'flex',
    width : '100%',
    overflow : 'hidden',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  crown : {
    position : 'absolute',
    top : 120,
    left : 67,
    color : 'green',
    width : 18
  },
  super_admin : {
    position : 'absolute',
    top : 130,
    left : 65,
    color : 'yellow',
    width : 18
  },
  nameText: {
    marginTop: theme.spacing(1),
    marginBottom: 0,
    textAlign : 'center'
  },
  bioText: {
    marginLeft:'auto',
    marginRight:'auto'
  },
  profileDivider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  listSubheader: {
    color: theme.palette.text.secondary
  },
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      background: hexToRgba(theme.palette.primary.main, 0.1),
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        color: theme.palette.primary.main,
        marginLeft: '-4px'
      }
    },
    '& + &': {
      marginTop: theme.spacing(1)
    }
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '4px',
    background: hexToRgba(theme.palette.primary.main, 0.03),
    '& $listItemText': {
      color: theme.palette.primary.main
    },
    '& $listItemIcon': {
      color: theme.palette.primary.main,
      marginLeft: '-4px'
    }
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  listDivider: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing()
  },
  badge : {
    top : 'calc(50% - 3px)',
    right : -30,
    animationName: '$blinker',
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount:'infinite',
  },
  badgeMobile : {
    top : 14
  },
  '@keyframes blinker': {
    from: {opacity: 0.2},
    to: {opacity: 1}
  }
  
});
