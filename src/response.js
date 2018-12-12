function sendText(message, number) {
  const url = 'http://localhost:2000';
  // const url = '/sms';
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(
      {
        messageBody: message,
        userNumber: number,
      },
    ),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export { sendText };
