import { trpc } from '../utils/trpc';

// hook to get all clients
export function useClients() {
  return trpc.clients.getAll.useQuery();
}

// hook to get one client by ID
// export function useClient(id: number) {
//   return trpc.clients.getById.useQuery({ id });
// }
