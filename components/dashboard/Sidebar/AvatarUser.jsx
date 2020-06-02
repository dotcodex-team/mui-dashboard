import React from 'react';
import _ from 'lodash'

// Material components
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// Component styles
import { Tooltip, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';


const useStyles = makeStyles(theme => ({
      profile: {
        width : '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems : 'center'
      },
      avatar: {
        cursor : 'pointer',
        width: 60,
        height: 60,
        marginLeft: '5%',
        marginTop: 0
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
        top : 125,
        left : 67,
        color : 'green',
        width : 25
      },
      crownMini:{
        position : 'absolute',
        top : 22,
        left : 31,
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
        marginTop: '1%',
        marginBottom: 10,
        fontSize : 16,
        textAlign : 'center'
      },
      bioText: {
        marginLeft:'auto',
        marginRight: 'auto',
        fontSize : 12
      },
      miniAvatar:{
        cursor : 'pointer',
        width: 30,
        height: 30,
        marginLeft: '5%'
      },
      countAvatar:{
        width: 25,
        height: 25,
        fontSize : 12,
        backgroundColor : theme.palette.primary.main,
        transform : 'scale(0.8)'
      },
      onlyPicture:{
        cursor : 'pointer',
        width: 30,
        height: 30
      },
      turnsCounter: {
        display: 'flex',
        textAlign: 'center',
        '& div' : {
          maxWidth : 125,
          flexWrap : 'wrap'
        }
      },
      availables : {
        fontSize : 8.5,
        marginLeft : 40,
        marginRight : 40,
        fontWeight : 'bold'
      },
}));

export default function AvatarUser(props) {
    const {small} = props;
    const theme = useTheme();
    const classes = useStyles();
    const user = {
      name: 'Carlos Parra'
    }
  return (
    <div className={classes.profile}>
      <div className={classes.avatar}>
        <Avatar
            alt={user.name}
            classes={{root : classNames(classes.avatar,{[classes.miniAvatar] : small })}}
            src={`https://ariverak-cv.now.sh/juan-rivera-vargas.jpg`}
        />
      </div>
       <div className={classes.profileInfo}>
          <Tooltip placement="top" title={`${user.name} ${user.last_name}`}>
              <Typography 
              noWrap 
              className={classes.nameText} 
              variant="h5">
                  {`${user.name}`} 
              </Typography>
          </Tooltip>
          <Typography className={classes.bioText} variant="caption">
              Administrador
          </Typography>
      </div>
    </div>
  )
}
