import { IMessage } from "./components/Chat";

//функция разделения сообщений на "кластеры" по датам

export function groupDataForStore(data: IMessage[]) {
    const dataForStore : {date: string, messages: IMessage[]}[] = [];

    let messagesForCluster = [];
    messagesForCluster.push(data[0]);

    for (let i = 1; i < data.length; i++) {
        if (data[i].date_of_sending != data[i-1].date_of_sending ) { //если у этого сообщения дата не совпадает с предыдущим            
            dataForStore.push({date: data[i-1].date_of_sending, messages: messagesForCluster.reverse()}); //добавляем кластер в итоговый массив
            messagesForCluster = [];
        }
        messagesForCluster.push(data[i]);
    }

    return dataForStore;
}