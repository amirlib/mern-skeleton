import { userSchema } from '../schema/user.schema';

const createFormData = (values, schema) => {
  const data = new FormData();
  const pairs = Object.entries(values);

  pairs.forEach((pair) => {
    if (pair[1]
      || (schema
        && schema[pair[0]]
        && !schema[pair[0]].options.required)
    ) data.append(pair[0], pair[1]);
  });

  return data;
};

const createProfileFormData = (values) => createFormData(values, userSchema);

export { createProfileFormData };
