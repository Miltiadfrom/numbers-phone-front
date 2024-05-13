import { NavLink } from "react-router-dom";
import { useDeleteUserMutation, useGetUsersQuery } from "../api/users"

export const Users = () => {
    const { data: usersData, isLoading: loadingUsers, isError: errorUser } = useGetUsersQuery();
    const [deleteUser, { isLoading, data, isError }] = useDeleteUserMutation();

    return (

        <div>
            {usersData ? (<table>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Адрес</th>
                        <th>Тип</th>
                        <th>Изменить</th>
                        <th>Удалить</th>
                    </tr>
                </thead>

                <tbody>

                    {usersData.result.map((elem, index) => <tr key={index}>
                        <td>{elem.name}</td>
                        <td>{elem.address}</td>
                        <td>{elem.type}</td>
                        <td><NavLink to={`/user/${elem.id}`}>изменить</NavLink></td>
                        <td><a href="#" onClick={async () => {
                            await deleteUser(elem.id)
                            location.reload()
                        }}>удалить</a></td>
                    </tr>)}
                </tbody>
            </table>) : loadingUsers ? <div>Загрузка..</div> : null}
        </div>

    )
}   