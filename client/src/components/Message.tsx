import React from "react";

//компонент отрисовки сообщения как элемента списка внутри блока ChatScreen

export default function Message({id, name, text} : {id: number, name: string, text: string}) {
  return (
    <li>
      <p className="MessageDiv">
        <label className="UsernameLabel">{name}:</label>
        {text}
      </p>
    </li>
  )
}

