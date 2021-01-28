import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const MenuButton = (props) => {
  const { display, onClick, text } = props;

  return (
    <>
      {
        display && (
          <Button
            color="inherit"
            onClick={onClick}
          >
            {text}
          </Button>
        )
      }
    </>
  );
};

MenuButton.propTypes = {
  display: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

MenuButton.defaultProps = {
  display: true,
};

export default MenuButton;
