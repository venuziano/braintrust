import { trpc } from '../utils/trpc';
import type { LoginRequest } from '../../../server/src/modules/auth/application/dto/login.dto';

/**
 * Login function that authenticates a user with email and password
 */
export function useLogin() {
  const loginMutation = trpc.auth.login.useMutation();
  
  const login = async (credentials: LoginRequest) => {
    return loginMutation.mutateAsync(credentials);
  };

  return {
    login,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
  };
} 