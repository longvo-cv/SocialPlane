import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
//MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
//Icon
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
//redux
import { connect } from 'react-redux';
import { markNotificationsRed } from '../../redux/actions/userActions';
var relativeTime = require('dayjs/plugin/relativeTime');
class Notifications extends Component {
  state = {
    anchorElement: null
  };
  handleOpen = (event) => {
    this.setState({ anchorElement: event.target });
  };
  handleClose = () => {
    this.setState({ anchorElement: null });
  };
  onMenuOpen = () => {
    let unreadNoti = this.props.notifications
      .filter((noti) => !noti.read)
      .map((not) => not.notificationId);
    this.props.markNotificationsRed(unreadNoti);
  };
  render() {
    const notifications = this.props.notifications;
    const anchorElement = this.state.anchorElement;
    dayjs.extend(relativeTime);

    let notiIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((noti) => noti.read === false).length > 0
        ? (notiIcon = (
            <Badge
              badgeContent={
                notifications.filter((noti) => noti.read === false).length
              }
              color='error'
            >
              <NotificationsIcon />
            </Badge>
          ))
        : (notiIcon = <NotificationsIcon />);
    } else {
      notiIcon = <NotificationsIcon />;
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((noti) => {
          const verb = noti.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(noti.createdAt).fromNow();
          const iconColor = noti.read ? 'primary' : 'error';
          const icon =
            noti.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );
          return (
            <MenuItem key={noti.createdAt} 
            onClick={this.handleClose}
           >
              {icon}
              <Typography
                component={Link}
                coor='default'
                variant='body1'
                color='textPrimary'
                to={`users/${noti.recipient}/whisper/${noti.postId} `}
              >
                {noti.sender} {verb} your post {time}
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications
        </MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement='top' title='Notifications'>
          <IconButton
            aria-owns={anchorElement ? 'simple-menu' : undefined}
            aria-haspopup='true'
            onClick={this.handleOpen}
          >
            {notiIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorElement}
          open={Boolean(anchorElement)}
          onClose={this.handleClose}
          onEnter={this.onMenuOpen}
                PaperProps={{
                    style: {
                        backgroundColor: '#c5c6c7',
                        boxShadow: 'none'
                    }
                }}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}
Notification.propTypes = {
  markNotificationsRed: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};
const mapStateToProps = (state) => ({
  notifications: state.user.notifications
});
export default connect(
  mapStateToProps,
  { markNotificationsRed }
)(Notifications);
