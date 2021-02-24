import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom';
import { clear } from '../../auth/auth-helper';
import { AuthContext } from '../../contexts/auth.context';
import { remove } from '../../user/user.api';

const DeleteProfile = (props) => {
  const { setEmptyUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const clickButton = () => {
    setOpen(true);
  };

  const removeClick = async () => {
    const res = await remove(props.userId);

    if (res && res.error) console.log(res.error);

    clear();
    setRedirect(true);
    setEmptyUser();
  };

  const cancelClick = () => {
    setOpen(false);
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <span>
      <IconButton
        aria-label="Delete"
        color="secondary"
        onClick={clickButton}
      >
        <DeleteIcon />
      </IconButton>

      <Dialog
        onClose={cancelClick}
        open={open}
      >
        <DialogTitle>
          Delete Account
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color="primary"
            onClick={cancelClick}
          >
            Cancel
          </Button>

          <Button
            autoFocus="autoFocus"
            color="secondary"
            onClick={removeClick}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

DeleteProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DeleteProfile;
