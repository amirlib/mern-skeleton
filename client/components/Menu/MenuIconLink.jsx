import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff4081' };

  return { color: '#ffffff' };
};

const MenuIconLink = (props) => {
  const history = useHistory();
  const {
    display,
    iconComponent,
    label,
    path,
  } = props;

  return (
    <>
      {
        display && (
          <Link to={path}>
            <IconButton
              aria-label={label}
              style={isActive(history, '/')}
            >
              {iconComponent}
            </IconButton>
          </Link>
        )
      }
    </>
  );
};

MenuIconLink.propTypes = {
  display: PropTypes.bool,
  iconComponent: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

MenuIconLink.defaultProps = {
  display: true,
};

export default MenuIconLink;
