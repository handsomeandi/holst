/* function sendPost(url, body) {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                switch(xhr.status) {
                    case 200:
                        res(xhr.responseText);
                        break;
                    default:
                        rej();
                        break;
                }
            }
        };

        const data = JSON.stringify(body);
        xhr.send(data);
    });
} */

const xhr = new XMLHttpRequest();
// function sendPOST(url, body = {}, convertAnsToJSON = true) {
//     return new Promise((resolve, reject) => {
//         let formData = new FormData();
//         for (let name in body)
//             formData.append(name, body[name]);

//         xhr.open("POST", url, true);
//         xhr.onreadystatechange = (event) => {
//             if (xhr.readyState == XMLHttpRequest.DONE) {
//                 console.log(xhr.status, event.currentTarget.responseText);
//                 if (xhr.status != 200) return reject(event.currentTarget.responseText);

//                 let resp = event.currentTarget.responseText;
//                 if (convertAnsToJSON) resp = JSON.parse(resp);

//                 resolve(resp);
//             }
//         }
//         xhr.send(formData);
//     });
// }

function autoSendPOST(url, formObj, convertAnsToJSON = true) {
    return new Promise((resolve, reject) => {
        let formData = new FormData(formObj);

        xhr.open("POST", url, true);
        xhr.onreadystatechange = (event) => {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log(xhr.status, event.currentTarget.responseText);
                if (xhr.status != 200) return reject(event.currentTarget.responseText);

                let resp = event.currentTarget.responseText;
                if (convertAnsToJSON) resp = JSON.parse(resp);

                resolve(resp);
            }
        }
        xhr.send(formData);
    });
}