import { useQuery } from "react-query";
import { api } from "../api";

type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

type GetUsersResponse = {
    totalCount: number;
    users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
    const { data, headers } = await api.get('/users', {
        params: {
            page,
        }
    })
    
    const totalCount = Number(headers['x-total-count'])

    const users = data.users.map(user => {
        return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR')
        };
    })

    return {
        users,
        totalCount
    };
}

export function useUsers(page: number) {

   return useQuery(['users', page],() => getUsers(page), {
        staleTime: 1000 * 5 // -- 5 seg -- determina o tempo em que os dados permanecem fresh, ou seja, sem necessidade de refecth.
      })

}

