import React from 'react';
import PropTypes from 'prop-types';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

const UsersList = (props) => {
  const { users } = props;

  return (
    <List dense>
      {users.map((item) => (
        <Link
          key={item._id}
          to={`/user/${item._id}`}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>

            <ListItemText primary={item.name} />

            <ListItemSecondaryAction>
              <IconButton>
                <ArrowForward />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
};

UsersList.defaultProps = {
  users: [],
};

export default UsersList;
