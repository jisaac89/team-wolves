import { requests } from './connections/request';

let Patient = (email, password) => {
  return {
    email: email,
    "pass": password,
    "firstName": email,
    "lastName": email,
  }
}

// example for future ref

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/loginhcp', Patient(email, password)),
  register: (email, password) =>
    requests.put('/patients/' + email, Patient(email, password)),
  save: (user) =>
    requests.put('/patients/', user)
};

export default {
  Auth
};