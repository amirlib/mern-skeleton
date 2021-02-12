import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import DeleteProfile from './DeleteProfile';
import TitleTypography from '../UI/typographies/TitleTypography';
import { AuthContext } from '../../contexts/auth.context';
import { TitleType } from '../../style/types';

const Profile = (props) => {
  const { profile } = props;
  const { user } = useContext(AuthContext);

  return (
    <>
      <TitleTypography
        title="Profile"
        type={TitleType.Protected}
      />

      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            primary={profile.name}
            secondary={profile.email}
          />

          {
            user
            && user._id === profile._id
            && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton
                    aria-label="Edit"
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                </Link>

                <DeleteProfile userId={user._id} />
              </ListItemSecondaryAction>
            )
          }
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary={`Joined: ${new Date(profile.createdAt).toDateString()}`} />
        </ListItem>
      </List>
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string,
    createdAt: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
};

Profile.defaultProps = {
  profile: PropTypes.shape({
    _id: '',
    createdAt: '',
    email: '',
    name: '',
  }),
};

export default Profile;
