console.log('start is here');

let submit = document.querySelector('#submit');
let loader = document.querySelector('.cloader');
let sub;

/* 
let socket = io();
socket.on('message', (message) => {
    console.log(`Good! pal; ${message}`);
    
});
//socket.emit('message', 'how are you');

socket.on('progress', (progress) => {
    console.log(progress);
});





socket.on('success', (booking) => {

    let b = document.querySelector('#dstBooking');
    b.value = booking;
    sub.disabled = false;
    //loader.style.display = "none";
});

 */
async function handler() {
  let shot =  fetch('/screenshot');
    let data = fetch('/data').then((res) => res.json()).then((json) => console.log(json));

}

submit.addEventListener('click', handler);


//{srcBookMaker: "bet9ja", srcBooking: "Z6VR9QK2", dstBookMaker: "betking", dstBooking: ""}

async function fet(file, data) {
    let res = await fetch(file, {
        method: 'POST',
        headers: {
            'Accept': '*',
            'Content-Type': 'application/json'

        },
        body: data

    });
    let json = await res.json();
    return json;
}

/**Fetch resources from internet */
function fetchData(arg) {
    let xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {



        xhr.timeout = 20000;
        xhr.onreadystatechange = res => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 304) {
                    //console.log('connection exists');
                    //console.log(xhr.response);

                    resolve(xhr.response);

                } else {

                    //console.log('connection does not exist');
                    //alert('no internet connection');
                    reject('false');

                }
            }
        }
        if (arg.method == "POST") {
            https: //sportsapi.betagy.services/api/api/BetCoupons/AddSelections/en?selectionIds[0]=213638218


                xhr.open("POST", arg.file, true);
            xhr.setRequestHeader("Accept", "*/*");
            //xhr.setRequestHeader("Accept","application/json");
            //xhr.setRequestHeader("Accept","text/plain");
            xhr.setRequestHeader("Content-Type", "application/json");

            //xhr.setRequestHeader("Accept-Language","en-US");

            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");

            xhr.send(arg.param);
        }
        if (arg.method == "OPTIONS") {
            xhr.open("OPTIONS", arg.file, true);
            xhr.setRequestHeader("Access-Control-Request-Headers", "content-type");
            xhr.setRequestHeader("Access-Control-Request-Method", "POST");
            xhr.send(arg.param);
        }
        if (arg.method == "GET") {
            xhr.open("GET", arg.file, true);
            xhr.setRequestHeader("Accept", "*/*");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Accept", "text/plain");
            xhr.send();
        }

    });

}