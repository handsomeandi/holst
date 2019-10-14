// Swal.fire(
//   'Good job!',
//   'You clicked the button!',
//   'success'
// );

$(document).ready(() => {
    $('#form').submit(e => {
        e.preventDefault();

        // const email = $('#emailInput').val();
        // const phone = $('#phoneInput').val();
        // const name = $('#nameInput').val();
        // const style = $('#selectStyle').val();
        // const size = $('#selectSize').val();
        // const img = document.getElementById('inputFile').files[0];

        // console.log(email, phone, name, style, size);
        autoSendPOST('send-email', document.getElementById('form'), false)
            .then(respText => {
                Swal.fire('Ура!', 'Мы получили ваш запрос! Ожидайте звонка :)', 'success');
                console.log('Success:', respText);
            })
            .catch(error => {
                Swal.fire('Упс!', 'Что-то пошло не так', 'error');
                console.log('Fail:', error);
            });
        // sendPOST('send-email', {email, phone, name, style, size, img}, false)
        //     .then(respText => {
        //         Swal.fire('Ура!', 'Мы получили ваш запрос! Проверьте почту :)', 'success');
        //         console.log('Success:', respText);
        //     })
        //     .catch(error => {
        //         Swal.fire('Упс!', 'Что-то пошло не так', 'error');
        //         console.log('Fail:', error);
        //     });
    });
});