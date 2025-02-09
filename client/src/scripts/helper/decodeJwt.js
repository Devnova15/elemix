export const decodeJwt = (token) =>{
    const tokenParts = token.split(' ')[1].split('.'); // Разделяем токен на части
    const decodedHeader = JSON.parse(atob(tokenParts[0])); // Декодируем заголовок
    const decodedPayload = JSON.parse(atob(tokenParts[1])); // Декодируем полезную нагрузку

    return {
        header: decodedHeader,
        payload: decodedPayload,
    }


}