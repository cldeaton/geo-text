import swal from 'sweetalert';

function sendText(message, number) {
  const url = '/sms';
  console.log(message, number);

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
  })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        swal('Your response', 'It worked!!', 'success');
      } else {
        swal('Your response', 'Sorry, it didnt work.', 'error');
      }
    });
}

export { sendText };
