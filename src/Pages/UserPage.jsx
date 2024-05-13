import { useParams } from "react-router-dom"
import { useGetUserByIdQuery } from "../api/users"
import { useDeletePhoneMutation, useGetPhonesBySubIdQuery } from "../api/phones"

export const UserPage = () => {
    const { user_id } = useParams()
    const { data, isLoading, isError } = useGetUserByIdQuery(user_id)
    const { data: phonesData, isLoading: loadingPhone, isError: errorPhone } = useGetPhonesBySubIdQuery(user_id)
    const [deletePhone, {isLoading: loadingDelPhone, isError: errorDelPhone, data: phoneData}] = useDeletePhoneMutation()


    return (<div>
        {data ? <div>
            <div>{data.result.name}</div>
            <div>{data.result.address}</div>
            <div>{data.result.type}</div>
            <table>
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Состояние</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {phonesData ? phonesData.result.map((elem, index) => <tr key={index}>
                        <td>{elem.number}</td>
                        <td>{elem.is_activate ? "Активно" : "Неактивно"}</td>
                        <td><a href="#" onClick={async () => {
                            await deletePhone(elem.number)
                            location.reload()
                        }}>Удалить</a></td>
                    </tr>) : null}

                </tbody>
            </table>
        </div> : isLoading ? <div>Загрузка...</div> : null}
    </div>)
}