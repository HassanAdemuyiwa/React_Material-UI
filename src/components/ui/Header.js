import React, { useState, useEffect }from 'react';
import { AppBar, IconButton, Toolbar, useScrollTrigger} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../../assets/logo.svg';
import { Tabs, Tab } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem"
import ListItemText from '@material-ui/core/ListItemText'


function ElevationScroll(props) {
    const { children} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }



  const useStyles = makeStyles(theme => ({

    toolbarMargin: {
      ...theme.mixins.toolbar,
      marginBottom: '2em',
      [theme.breakpoints.down('md')]: {
        marginBottom: '1em'
      },
      [theme.breakpoints.down('xs')]: {
        marginBottom: '0.1em'
      }
    },
    logo: {
      height:'7em',
      [theme.breakpoints.down('md')]: {
        height: '6em'
      },
      [theme.breakpoints.down('xs')]: {
        height: '4em'
      },
      "&:hover":{
        backgroundColor: 'transparent'
      }
    },
    logoContainer:{
      padding: '0',
      [theme.breakpoints.down('md')]: {
        padding: '0'
      }
    },
    tabContainer:{
      marginLeft: 'auto'
    },
    tab: {
      ...theme.typography.tab,
      minWidth: 10,
      marginLeft: "25px"
    },
    button:{
      ...theme.typography.estimate,
      borderRadius:'50px',
      marginLeft: '50px',
      marginRight: '25px',
      color: 'white'
    },
    menu: {
      backgroundColor: theme.palette.common.blue,
      color: 'white',
      borderRadius: '0px'
    },
    menuItem:{
      ...theme.typography.tab,
      opacity: 0.7,
      "&:hover":{
        opacity: 1
      }
    },
    drawer:{
      backgroundColor: theme.palette.common.blue,
    },
    drawerItem:{
      ...theme.typography.tab,
      color: 'white',
      opacity: 0.7
    },
    drawerIcon: {
      heigh: '50px',
      width: '50px'
    },
    drawerIconContainer:{
      marginLeft: 'auto',
      "&:hover":{
        backgroundColor: 'transparent'
      }
    },
    drawerItemEstimate:{
      backgroundColor: theme.palette.common.orange
    }, 
    drawerItemSelected: {
      opacity: 1
    }
    
  }))


export default function Header(props){
  const classes = useStyles()
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  const handleClick = (e)=>{
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }  
  const handleClose = (e)=>{
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const handleMenuItemClick = (e, i)=>{
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i)

  }

const menuOption = [{name: "Services", link: '/services'}, {name: 'Custom Software Development', link: '/customsoftware'}, {name: 'Mobile App Development', link: '/mobileapps'}, {name: 'Websites', link: '/websites'}]

  useEffect(()=>{
    // if(window.location.pathname === '/' && value !== 0){
    //   setValue(0)
    // }else if(window.location.pathname === '/services' && value !== 1){
    //   setValue(1)
    // }else if(window.location.pathname === '/revolution' && value !== 2){
    //   setValue(2)
    // }else if(window.location.pathname === '/about' && value !== 3){
    //   setValue(3)
    // }else if(window.location.pathname === '/contact' && value !== 4){
    //   setValue(4)
    // }else if(window.location.pathname === '/estimate' && value !== 5){
    //   setValue(5)
    // }

    switch (window.location.pathname) {
      case '/':
        if(value !== 0){
          setValue(0)
        }
        break;
        case '/services':
          if(value !== 1){
            setValue(1);
            setSelectedIndex(0);
          }
          break;
          case '/customsoftware':
            if(value !== 1){
              setValue(1);
              setSelectedIndex(1);
            }
            break;
          case '/mobileapps':
            if(value !== 1){
              setValue(1);
              setSelectedIndex(2);
            }
            break;
          case '/websites':
            if(value !== 1){
              setValue(1);
              setSelectedIndex(3);
            }
            break;
          case '/revolution':
            if(value !== 2){
              setValue(2);
            }
            break;
          case '/about':
            if(value !== 3){
              setValue(3);
            }
            break;
          case '/contact':
            if(value !== 4){
              setValue(4);
            }
            break;
          case '/estimate':
            if(value !== 5){
              setValue(5);
            }
            break;
      default:
        break;
    }

  },[value]);

  const tabs = (

    <React.Fragment>
        <Tabs value={value} onChange={handleChange} className={classes.tabContainer}>
          <Tab className={classes.tab} component={Link} to="/"label='Home' />
          <Tab aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup={anchorEl ? "true" : undefined } className={classes.tab} component={Link} onMouseOver={event => handleClick(event)} to="/services" label='Services' />
          <Tab className={classes.tab} component={Link}  to="/revolution" label='The Revolution' />
          <Tab className={classes.tab} component={Link} to="about" label='About us' />
          <Tab className={classes.tab} component={Link} to="/contact" label='Contact us' />
          </Tabs>
          <Button variant="contained" color="secondary" className={classes.button}>
            Free Estimate
          </Button>
          <Menu id='simple-menu' anchorEl={anchorEl} open={openMenu} onClose={handleClose} MenuListProps={{onMouseLeave: handleClose}} classes={{paper: classes.menu}} elevation={0} >
              {menuOption.map((option, i) => (
                <MenuItem key={option} component={Link} to={option.link} classes={{root: classes.menuItem}} onClick={(event)=>{handleMenuItemClick(event, i); setValue(1); handleClose()}} selected={i === selectedIndex && value === 1} >
                  {option.name}
                </MenuItem>
              )
              )}
          </Menu>

    </React.Fragment>

  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer} onClose= {()=> setOpenDrawer(false)} onOpen={()=> setOpenDrawer(true)} classes={{paper:classes.drawer}}>
       <List disablePadding>
         <ListItem divider button onClick={()=> {setOpenDrawer(false); setValue(0)}} component={Link} to='/' selected={value === 0}>
            <ListItemText className={value ===0 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem} disableTypography>Home</ListItemText>
         </ListItem>
         <ListItem divider button onClick={()=>{setOpenDrawer(false); setValue(1)}} component={Link} to='/services' selected={value === 1}>
            <ListItemText className={value ===1 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}  disableTypography>Services</ListItemText>
         </ListItem>
         <ListItem divider button onClick={()=>{setOpenDrawer(false); setValue(2)}} component={Link} to='/revolution' selected={value === 2}>
            <ListItemText className={value === 2 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}  disableTypography>The Revolution</ListItemText>
         </ListItem>
         <ListItem divider button onClick={()=>{setOpenDrawer(false); setValue(3)}} component={Link} to='/about' selected={value === 3}>
            <ListItemText className={value === 3 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}  disableTypography>About us</ListItemText>
         </ListItem>
         <ListItem divider button onClick={()=>{setOpenDrawer(false); setValue(4)}} component={Link} to='/contact' selected={value === 4}>
            <ListItemText className={value === 4 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}  disableTypography>Contact us</ListItemText>
         </ListItem>
         <ListItem className={classes.drawerItemEstimate} divider button onClick={()=>{setOpenDrawer(false); setValue(5)}} component={Link} to='/estimate' selected={value === 5}>
            <ListItemText className={value === 5 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}  disableTypography>Free Estimate</ListItemText>
         </ListItem>
       </List>
      </SwipeableDrawer>
      <IconButton className={classes.drawerIconContainer} onClick={()=>setOpenDrawer(!openDrawer)} disableRipple>
        <MenuIcon className={classes.drawerIcon}/>
      </IconButton>

    </React.Fragment>

  );

    return (
      <React.Fragment>
        <AppBar position="fixed" color="primary" >
            <Toolbar disableGutters >
              <Button component={Link} to='/' onClick={()=>{setValue(0)}}className={classes.logoContainer} disableRipple>
                 <img alt= 'company logo' className={classes.logo} src={logo} />
              </Button>

              {matches ? drawer : tabs}
              
               {/* <Tabs value={value} onChange={handleChange} className={classes.tabContainer}>
                <Tab className={classes.tab} component={Link} to="/"label='Home' />
                <Tab aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup={anchorEl ? "true" : undefined } className={classes.tab} component={Link} onMouseOver={event => handleClick(event)} to="/services" label='Services' />
                <Tab className={classes.tab} component={Link}  to="/revolution" label='The Revolution' />
                <Tab className={classes.tab} component={Link} to="about" label='About us' />
                <Tab className={classes.tab} component={Link} to="/contact" label='Contact us' />
                </Tabs>
                <Button variant="contained" color="secondary" className={classes.button}>
                  Free Estimate
                </Button>
                <Menu id='simple-menu' anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{onMouseLeave: handleClose}} classes={{paper: classes.menu}} elevation={0} >
                    {menuOption.map((option, i) => (
                      <MenuItem key={option} component={Link} to={option.link} classes={{root: classes.menuItem}} onClick={(event)=>{handleMenuItemClick(event, i); setValue(1); handleClose()}} selected={i === selectedIndex && value === 1} >
                        {option.name}
                      </MenuItem>
                    )
                    )}


                    {/* <MenuItem onClick={()=> {handleClose(); setValue(1)}} component={Link} to='/services' classes={{root: classes.menuItem}}>Services</MenuItem>
                    <MenuItem onClick={()=> {handleClose(); setValue(1)}} component={Link} to='/customsoftware' classes={{root: classes.menuItem}}>Custom Software Development</MenuItem>
                    <MenuItem onClick={()=> {handleClose(); setValue(1)}} component={Link} to='/mobileapps' classes={{root: classes.menuItem}}>Mobile App Development</MenuItem>
                    <MenuItem onClick={()=> {handleClose(); setValue(1)}} component={Link} to='/websites' classes={{root: classes.menuItem}}>Software Development</MenuItem> */}

                {/* </Menu> */} 
            </Toolbar>
        </AppBar>
        <div className = {classes.toolbarMargin} />
      </React.Fragment>

    )


}