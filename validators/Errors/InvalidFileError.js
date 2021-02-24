const errorMessages = {
  ERR_FILE_EXT: 'file extension not supported',
  ERR_FILE_NOT_EXISTS: 'file is required',
  ERR_FILE_SIZE: 'file size is not between the valid range',
  ERR_FILE_TYPE: 'file format not supported',
  ERR_INVALID_FILE: 'Invalid file',
};

class InvalidFileError extends Error {
  constructor(code, fieldName = '') {
    super();

    this.code = code;
    this.fieldName = fieldName;
    this.message = errorMessages[code];
    this.name = 'InvalidFileError';

    Error.captureStackTrace(this, InvalidFileError);
  }
}

export default InvalidFileError;
