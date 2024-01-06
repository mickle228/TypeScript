let url = new URL(location.href);
let id = url.searchParams.get("id");
fetch('http://owu.linkpc.net/carsAPI/v1/cars/' + id)
    .then((response) => response.json())
    .then((car) => {
        let div = document.createElement('div');
        document.body.appendChild(div);
        for (const carKey in car) {
                let p = document.createElement('p');
                p.innerText = `${carKey} - ${car[carKey]}`;
                div.appendChild(p);
        }
    });