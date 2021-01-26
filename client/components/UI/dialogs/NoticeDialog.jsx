import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const NoticeDialog = (props) => {
  const {
    dialogText,
    dialogTitle,
    open,
    setOpen,
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
        <Button
          autoFocus="autoFocus"
          color="primary"
          onClick={() => setOpen(false)}
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

NoticeDialog.propTypes = {
  dialogText: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
};

NoticeDialog.defaultProps = {
  open: false,
};

export default NoticeDialog;
