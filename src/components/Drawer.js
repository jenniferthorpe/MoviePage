import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import '../style/style.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { sessionIDAction } from '../actions/actions';


const linkStyle = {
    textDecoration: 'none'
}

const useStyles = makeStyles({
    list: {
        width: 250,
    },

});


function TemporaryDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <Link to='/' style={linkStyle}>
                    <ListItem button key="1">
                        <ListItemIcon><HomeOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Link to='/account/favorites' style={linkStyle}>
                    <ListItem button key="2">
                        <ListItemIcon><StarsIcon /></ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItem>
                </Link>
                <Link to='/account/watchlater' style={linkStyle}>
                    <ListItem button key="3" style={linkStyle}>
                        <ListItemIcon><WatchLaterIcon /></ListItemIcon>
                        <ListItemText primary="Watch later" />
                    </ListItem>
                </Link>
                {props.sessionID ?
                    <Link to='/' style={linkStyle} >
                        <ListItem button key="2" onClick={() => {
                            return (
                                props.setSessionID(''),
                                sessionStorage.clear()
                            )
                        }}>
                            <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
                            <ListItemText primary="Log out" />
                        </ListItem>
                    </Link> :
                    <Link to='/login' style={linkStyle}>
                        <ListItem button key="login">
                            <ListItemIcon><LockOpenIcon /></ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    </Link>
                }

            </List>
        </div >
    );


    return (
        <div>
            <div onClick={toggleDrawer('left', true)}><MenuIcon style={{ color: 'wheat' }} /></div>

            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>

        </div>
    );
}

const mapState = (state) => ({
    sessionID: state.userInfo.sessionID
})
const mapDispatch = (dispatch) => ({
    setSessionID: (sessionID) => dispatch(sessionIDAction(sessionID))
})

export default connect(mapState, mapDispatch)(TemporaryDrawer)