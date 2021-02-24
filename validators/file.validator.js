import InvalidFileError from './Errors/InvalidFileError';

const createExtensionRegExp = (extensions) => {
  const reducer = (acc, val) => `${acc}|${val}`;
  const regex = extensions.reduce(reducer);

  return `\\.(${regex})$`;
};

const isValidExt = (name, extensions) => {
  const strings = name.split('.');

  if (strings.length !== 2) return false;

  const regexp = new RegExp(createExtensionRegExp(extensions));

  if (!name.match(regexp)) return false;

  return true;
};

const isValidSize = (fileSize, maxSize, minSize) => {
  if (fileSize <= maxSize && fileSize >= minSize) return true;

  return false;
};

const isValidType = (fileType, types) => {
  if (types.some((type) => type === fileType)) return true;

  return false;
};

const defaultOptions = {
  extensions: [],
  maxSize: Number.MAX_SAFE_INTEGER,
  minSize: 0,
  required: false,
  types: [],
};

const validateImageFileBrowser = (file, attributes) => {
  const { fieldName, options = defaultOptions } = attributes;
  const {
    extensions,
    maxSize,
    minSize,
    required,
    types,
  } = options;

  if (!file || (file instanceof File === false && Object.getOwnPropertyNames(file).length === 0)) {
    if (required) throw new InvalidFileError('ERR_FILE_NOT_EXISTS', fieldName);

    return;
  }

  if (file instanceof File === false) {
    throw new InvalidFileError('ERR_INVALID_FILE');
  }

  if (!isValidType(file.type, types)) {
    throw new InvalidFileError('ERR_FILE_TYPE', fieldName);
  }

  if (!isValidExt(file.name, extensions)) {
    throw new InvalidFileError('ERR_FILE_EXT', fieldName);
  }

  if (!isValidSize(file.size, maxSize, minSize)) {
    throw new InvalidFileError('ERR_FILE_SIZE', fieldName);
  }
};

const validateImageFileMulter = (file, attributes) => {
  const { fieldName, options = defaultOptions } = attributes;
  const {
    extensions,
    types,
  } = options;

  if (!isValidType(file.mimetype, types)) {
    throw new InvalidFileError('ERR_FILE_TYPE', fieldName);
  }

  if (!isValidExt(file.originalname, extensions)) {
    throw new InvalidFileError('ERR_FILE_EXT', fieldName);
  }
};

export { validateImageFileBrowser, validateImageFileMulter };
