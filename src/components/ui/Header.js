import React, { useState, useEffect }from 'react';
import { AppBar, Toolbar, useScrollTrigger} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../../assets/logo.svg';
import { Tabs, Tab } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
 


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
      marginBottom: '1em'
    },
    logo: {
      height:'5em',
      "&:hover":{
        backgroundColor: 'transparent'
      }
    },
    logoContainer:{
      padding: '0'
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
    }
    
  }))


export default function Header(props){
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleChange = (e, value) => {
    setValue(value)
  }

  const handleClick = (e)=>{
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }  
  const handleClose = (e)=>{
    setAnchorEl(null)
    setOpen(false)
  }

  const handleMenuItemClick = (e, i)=>{
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i)

  }

const menuOption = [{name: "Services", link: '/services'}, {name: 'Custom Software Development', link: '/customsoftware'}, {name: 'Mobile App Development', link: '/mobileapps'}, {name: 'Websites', link: '/websites'}]

  useEffect(()=>{
    if(window.location.pathname === '/' && value !== 0){
      setValue(0)
    }else if(window.location.pathname === '/services' && value !== 1){
      setValue(1)
    }else if(window.location.pathname === '/revolution' && value !== 2){
      setValue(2)
    }else if(window.location.pathname === '/about' && value !== 3){
      setValue(3)
    }else if(window.location.pathname === '/contact' && value !== 4){
      setValue(4)
    }else if(window.location.pathname === '/estimate' && value !== 5){
      setValue(5)
    }

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

    return (
      <React.Fragment>
        <AppBar position="fixed" color="primary" >
            <Toolbar disableGutters >
              <Button component={Link} to='/' onClick={()=>{setValue(0)}}className={classes.logoContainer} disableRipple>
                 <img alt= 'company logo' className={classes.logo} src={logo} />
              </Button>
              
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

                </Menu>
            </Toolbar>
        </AppBar>
        <div className = {classes.toolbarMargin} />
      </React.Fragment>

    )


}