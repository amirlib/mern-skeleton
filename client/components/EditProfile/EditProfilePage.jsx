import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import EditProfileActions from './EditProfileActions';
import EditProfileForm from './EditProfileForm';
import NoticeDialog from '../UI/dialogs/NoticeDialog';
import TitleTypography from '../UI/typographies/TitleTypography';
import { AuthContext } from '../../contexts/auth.context';
import { TitleType } from '../../style/types';
import { read, update } from '../../user/user.api';
import { sanitizeValues, validateProfile } from '../../validators/values.validator';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
}));

const EditProfilePage = () => {
  const history = useHistory();
  const params = useParams();
  const classes = useStyles();
  const { user, verify } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchProfileAsync = async (signalToAbort) => {
      const isVerified = await verify();

      if (!isVerified) return;

      const res = await read(
        params.userId,
        signalToAbort,
      );

      if (res && res.error) {
        setError(res.error);
      } else {
        setError('');
        setValues({
          ...values,
          email: res.email,
          name: res.name,
        });
      }
    };

    fetchProfileAsync(signal);

    return function cleanup() {
      abortController.abort();
    };
  }, [params.userId]);

  if (params.userId && params.userId !== user._id.toString()) {
    history.push(`/user/edit/${user._id}`);
  }

  const handleSaveClick = async () => {
    if (error) setError('');

    const sanitizedValues = sanitizeValues(values);
    const validations = validateProfile(sanitizedValues);

    if (validations.error) {
      setError(validations.error);

      return;
    }

    const res = await update(
      params.userId,
      sanitizedValues,
    );

    if (res && res.error) {
      setError(res.error);
    } else {
      setError('');
      setOpen(true);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <TitleTypography
            title="Edit Profile"
            type={TitleType.Protected}
          />

          <EditProfileForm
            error={error}
            handleChange={handleChange}
            values={values}
          />

          <EditProfileActions onSave={handleSaveClick} />
        </CardContent>
      </Card>

      <NoticeDialog
        dialogText="The changes have been saved."
        dialogTitle="Edit profile"
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

EditProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string,
    }),
  }).isRequired,
};

export default EditProfilePage;
