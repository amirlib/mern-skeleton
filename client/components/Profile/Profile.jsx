import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import ProfileActions from './ProfileActions';
import TitleTypography from '../UI/typographies/TitleTypography';
import { AuthContext } from '../../contexts/auth.context';
import { TitleType } from '../../style/types';

const Profile = (props) => {
  const { profile } = props;
  const { user } = useContext(AuthContext);

  const renderProfileActions = () => {
    if (!user || user._id !== profile._id) return undefined;

    return <ProfileActions />;
  };

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

          {renderProfileActions()}
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
