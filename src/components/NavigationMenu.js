import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import '../style/style.css';
import Drawer from './Drawer';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      },
    },
  },
}));



class SearchAppBar extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      inputInput: PropTypes.string.isRequired,
      inputRoot: PropTypes.string.isRequired,
      menuButton: PropTypes.string.isRequired,
      root: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      searchIcon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    appRef: PropTypes.shape({
      current: PropTypes.any
    }).isRequired
  };

  state = {
    searchValue: '',
    showMenu: true,
    scrollPosition: 0,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.toggleMenu);
  }

  handleChange = (event) => {
    this.setState({ searchValue: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchValue } = this.state;

    this.setState({
      searchValue
    }, () => {
      const { history } = this.props;
      history.push(`/search/${searchValue}`);
    })
  }

  toggleMenu = () => {
    const newPosition = window.scrollY;
    const { scrollPosition } = this.state;

    if (scrollPosition > newPosition) {
      this.setState({ showMenu: true, scrollPosition: newPosition });
    }
    else {
      this.setState({ showMenu: false, scrollPosition: newPosition })
    }
  }

  scrollToTop = () => {
    const { appRef } = this.props;
    appRef.current.scrollIntoView({ behavior: 'smooth' })
  }



  render() {

    const { searchValue, showMenu } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed"
          style={showMenu ? { height: '64px', transition: 'height .4s' } : { height: '0px', transition: 'height .4s' }}

        >
          < Toolbar >
            <form onSubmit={this.handleSubmit}
              style={showMenu ? { marginTop: '0px', transition: 'margin-top .4s' } : { marginTop: '-100px', transition: 'margin-top .4s' }}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <Drawer />
              </IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link to='/' onClick={this.scrollToTop} style={{ textDecoration: 'none', color: 'wheat' }}>
                  MovieTajm
            </Link>
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon onClick={this.handleSubmit} />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  className="searchfield"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={this.handleChange}
                  value={searchValue}
                  type="text"
                />
              </div>
            </form>
          </Toolbar>
        </AppBar>
      </div >
    );
  }
}

export default withStyles(useStyles)(withRouter(SearchAppBar))

