import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../api/users";
import {
  useDeletePhoneMutation,
  useGetPhonesBySubIdQuery,
  useSavePhoneMutation,
} from "../api/phones";
import {
  useGetPaymentsBySubIdQuery,
  useSavePaymentMutation,
} from "../api/payments";
import { useState } from "react";

export const UserPage = () => {
  const { user_id } = useParams();
  const { data, isLoading, isError } = useGetUserByIdQuery(user_id);
  const {
    data: phonesData,
    isLoading: loadingPhones,
    isError: errorPhones,
  } = useGetPhonesBySubIdQuery(user_id);
  const [
    deletePhone,
    { isLoading: loadingDelPhone, isError: errorDelPhone, data: phoneData },
  ] = useDeletePhoneMutation();
  const {
    data: paymentsData,
    isLoading: loadingPayments,
    isError: errorPayments,
  } = useGetPaymentsBySubIdQuery(user_id);

  const [
    savePayment,
    { isLoading: loadPayment, isError: errorPayment, data: dataToSavePayment },
  ] = useSavePaymentMutation();
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [amount, setAmount] = useState("0");

  const onClickSavePayment = async () => {
    let payment = {
      phone_number_id: phoneNumberId,
      amount: amount,
      subscriber_id: user_id,
    };

    if (!payment.phone_number_id) {
      alert("Добавьте данные");
    } else {
      try {
        await savePayment(payment);
        location.reload();
      } catch (e) {
        alert(e);
      }
    }
  };

  const [
    savePhone,
    { isLoading: loadPhone, isError: errorPhone, data: dataPhone },
  ] = useSavePhoneMutation();

  const [phoneNumber, setPhoneNumber] = useState("");

  const onClickSavePhone = async () => {
    let phone = {
      sub: user_id,
      number: phoneNumber,
    };

    if (!phone.number) {
      alert("Добавьте данные");
    } else {
      try {
        await savePhone(phone);
        location.reload();
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <div>
      {data ? (
        <div>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <div>
              <h3>Пользователь</h3>
              <div>{data.result.name}</div>
              <div>{data.result.address}</div>
              <div>{data.result.type}</div>
            </div>
            <div>
              <h3>Добавить номер</h3>

              <div>Номер телефона</div>
              <input
                type="number"
                placeholder={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />

              <button onClick={() => onClickSavePhone()}>Добавить номер</button>
            </div>
            <div>
              <h3>Добавить платеж</h3>

              <div>Айди номера телефона</div>
              <input
                type="number"
                placeholder={phoneNumberId}
                onChange={(event) => setPhoneNumberId(event.target.value)}
              />

              <div>Сумма</div>
              <input
                type="number"
                placeholder={amount}
                onChange={(event) => setAmount(event.target.value)}
              />

              <button onClick={() => onClickSavePayment()}>
                Добавить платеж
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Номер</th>
                <th>Состояние</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {phonesData
                ? phonesData.result.map((elem, index) => (
                    <tr key={index}>
                      <td>{elem.id}</td>
                      <td>{elem.number}</td>
                      <td>{elem.is_activate ? "Активно" : "Неактивно"}</td>
                      <td>
                        <a
                          href="#"
                          onClick={async () => {
                            await deletePhone(elem.number);
                            location.reload();
                          }}
                        >
                          Удалить
                        </a>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Номер</th>
                <th>Дата пополнения</th>
                <th>Сумма</th>
              </tr>
            </thead>
            <tbody>
              {paymentsData
                ? paymentsData.result.map((elem, index) => (
                    <tr key={index}>
                      <td>{elem.phone_number}</td>
                      <td>{elem.date}</td>
                      <td>{elem.amount} руб.</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      ) : isLoading ? (
        <div>Загрузка...</div>
      ) : null}
    </div>
  );
};
