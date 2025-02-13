import { UserRepository, User } from "../repositories/users-repository";

export function useCreateUser(onSucess: VoidFunction, onError: VoidFunction) {
  const userRepository = new UserRepository();

  const createUser = (user: User) => {
    userRepository.createUser(user, onSucess, onError);
  };

  return {
    createUser,
  };
}
