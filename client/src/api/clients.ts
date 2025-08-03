import { trpc } from '../utils/trpc';

// hook to get all clients with pagination
export function useClients(page: number = 1, limit: number = 10) {
  return trpc.clients.getAll.useQuery({ page, limit });
}

// hook to get one client by ID
// export function useClient(id: number) {
//   return trpc.clients.getById.useQuery({ id });
// }
