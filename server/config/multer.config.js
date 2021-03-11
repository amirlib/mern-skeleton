/* eslint-disable no-unused-vars */
import multer from 'multer';
import { validateFileMulter } from '../../validators/file.validator';
import InvalidFileError from '../../validators/Errors/InvalidFileError';

const extensions = ['jpg', 'jpeg', 'png'];
const types = ['image/jpeg', 'image/pjpeg', 'image/png'];

const fileFilter = function (req, file, cb) {
  try {
    validateFileMulter(
      file,
      {
        fieldName: 'Profile picture',
        options: {
          extensions,
          types,
        },
      },
    );

    return cb(null, true);
  } catch (err) {
    return cb(err, false);
  }
};

const multerConfig = {
  fileFilter,
  limits: {
    fileSize: 1048576,
  },
};

const multerErrorHandling = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err instanceof InvalidFileError) {
    return res
      .status(400)
      .json({ error: err.message });
  }

  return res
    .status(400)
    .json({ error: 'An error occurred while uploading the file' });
};

export { multerConfig, multerErrorHandling };
