import setData from '~/helpers/setData';
import { createNewUser } from '~/queries/Users';

export async function createUser(newUser) {
  return setData(createNewUser, { data: newUser }, '/system');
}
