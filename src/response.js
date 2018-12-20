function sendText(message, number) {
  // const url = 'https://sms-service-46064.herokuapp.com/';
  const url = '/sms';
  console.log(message, number);
  let userSecret = process.env.USER_SECRET;
  console.log(userSecret);

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(
      {
        messageBody: message,
        userNumber: number,
        userSecret: userSecret
      },
    ),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export { sendText };
