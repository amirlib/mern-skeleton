import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

const RedirectDialog = (props) => {
  const {
    actionRedirect,
    actionText,
    dialogText,
    dialogTitle,
    open,
  } = props;

  return (
    <Dialog
      disableBackdropClick
      open={open}
    >
      <DialogTitle>
        {dialogTitle}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {dialogText}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Link to={actionRedirect}>
          <Button
            autoFocus="autoFocus"
            color="primary"
            variant="contained"
          >
            {actionText}
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

RedirectDialog.propTypes = {
  actionRedirect: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  dialogText: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

RedirectDialog.defaultProps = {
  open: false,
};

export default RedirectDialog;
