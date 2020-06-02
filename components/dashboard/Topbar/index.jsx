import React,{useState,useContext} from 'react';
import {env} from '@helpers'
import Portlet from '@components/shared/Portlet'
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useCookies} from 'react-cookie'
import {BlockPicker} from 'react-color'
import Global from '@constants/Global'

// Material helpers
import { makeStyles } from '@material-ui/styles';

// Material components
import {useMediaQuery} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import TodayIcon from '@material-ui/icons/Today';
import SignoutIcon from '@material-ui/icons/ExitToAppOutlined';
import Popper from '@material-ui/core/Popper';
import Zoom from '@material-ui/core/Zoom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { ThemeContext } from '~/context/theme-context';
import Hamburger from '@components/shared/Hamburger';
// Component styles
import styles from './styles';

const useStyles = makeStyles(styles)

const Topbar = ({
  className,
  title,
  isSidebarOpen,
  onToggleSidebar,
  onToggleSidebarRight,
}) => {
  const { changeThemeColor } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openColors, setOpenColors] = useState(false);
  const classes = useStyles();
  const [,,removeCookie] = useCookies('accessToken');
  const isMd = useMediaQuery('(max-width:600px)');  

  const handleSignOut = () => {
    removeCookie('accessToken',{domain : 'localhost'})
    removeCookie('accessToken')
    window.location.reload();
  };
  function openChangeColor(e){
    setAnchorEl(e.currentTarget);
    setOpenColors(!openColors)
  }
  const handleClickAway = () => {
    setOpenColors(false)
  };

  const rootClassName = classNames(classes.root, className);
  
  return (
    <>
      <div className={rootClassName}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            onClick={onToggleSidebar}
            variant="text"
          >
           <Hamburger />
          </IconButton>
          <Typography noWrap className={classes.title} variant={isMd ? "h6" : "h4"}>
            {title}
          </Typography>
          <div style={{flex : 1}} />
          <div className={classNames(classes.buttonsContainers ,{[classes.reduceScale] : isMd})}>
            <IconButton onClick={openChangeColor}>
              <InvertColorsIcon color="primary" />
            </IconButton>
            <Tooltip title="Salir" placement="bottom-end">
              <IconButton className={classes.signOutButton} onClick={handleSignOut}>
                <SignoutIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
        <ThemeContext.Consumer>
          {({themeColor})=>(
            <Popper className={classes.popper} open={openColors} anchorEl={anchorEl} placement="bottom" transition>
              {({ TransitionProps }) => (
                <Zoom {...TransitionProps} timeout={50}>
                    <Portlet>
                      <ClickAwayListener onClickAway={handleClickAway}>
                        <BlockPicker triangle="hide" color={`#${themeColor}`} colors={Global.colors} onChange={changeThemeColor}/>
                       </ClickAwayListener>
                    </Portlet>
                </Zoom>
              )}
            </Popper>
          )}
        </ThemeContext.Consumer>
      </div>
    </>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string,
};

Topbar.defaultProps = {
  onToggleSidebar: () => {},
};

export default Topbar;
