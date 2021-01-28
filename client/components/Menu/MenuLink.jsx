import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff4081' };

  return { color: '#ffffff' };
};

const MenuLink = (props) => {
  const history = useHistory();
  const { display, path, text } = props;

  return (
    <>
      {
        display && (
          <Link to={path}>
            <Button style={isActive(history, path)}>
              {text}
            </Button>
          </Link>
        )
      }
    </>
  );
};

MenuLink.propTypes = {
  display: PropTypes.bool,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

MenuLink.defaultProps = {
  display: true,
};

export default MenuLink;
