
import { useState } from "react"
import Select from 'react-select'
import { useSaveUserMutation } from "../api/users";

export const Form = () => {
    const [saveUser, {isLoading, data, isError}] = useSaveUserMutation();
    const [address, setAdress] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const typeUserOptions = [{value: 'физлицо', label: "физлицо"}, {value: "юрлицо", label: "юрлицо"}];

    const onClickHandler = async () => {
        let user = {
            "address": address,
            "name": name,
            "type": type
        }

        if (!user.name) {
            alert("Введите данные")
        } else {
            try {
                await saveUser(user)
                location.reload()
            } catch (e) {
                alert(e)
            }
        }
    }
    return (
        <div>
            <div>Адрес</div>
            <input type="text" placeholder={address} onChange={(event) => setAdress(event.target.value)} />
            <div>Имя</div>
            <input type="text" placeholder={name} onChange={(event) => setName(event.target.value)} />
            <div>Тип пользователя</div>
            <Select options={typeUserOptions} onChange={(event) => setType(event.value)} />

            <button onClick={() => onClickHandler()}>
                Добавить
            </button>
        </div>
    )
}