import { useQuery } from "react-query";
import { api } from "../api";

type Users = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export async function getUsers(): Promise<Users[]> {
    const { data } = await api.get('/users')
    
    const users = data.users.map(user => {
        return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR')
        };
    })

    return users;
}

export function useUsers() {

   return useQuery('users', getUsers, {
        staleTime: 1000 * 5 // -- 5 seg -- determina o tempo em que os dados permanecem fresh, ou seja, sem necessidade de refecth.
      })

}
