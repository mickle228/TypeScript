"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const carService = {
    getAll: () => fetch('http://owu.linkpc.net/carsAPI/v1/cars').then(value => value.json()),
    create: (car) => fetch('http://owu.linkpc.net/carsAPI/v1/cars', {
        method: 'POST',
        body: JSON.stringify(car),
        headers: { 'Content-type': 'application/json' }
    }).then(value => value.json()),
    deleteById: (id) => fetch(`http://owu.linkpc.net/carsAPI/v1/cars/${id}`, {
        method: 'DELETE'
    })
};
class CarRender {
    static run() {
        this._initForm();
        this._carsShow();
    }
    static _carsShow() {
        return __awaiter(this, void 0, void 0, function* () {
            const carsDiv = document.querySelector('#carsDiv');
            carsDiv.innerHTML = '';
            const cars = yield carService.getAll();
            cars.forEach(car => {
                const { id, brand, price, year } = car;
                const itemDiv = document.createElement('div');
                itemDiv.innerText = `${id}) ${brand} -- ${price} -- ${year}`;
                const btn = document.createElement('button');
                const btnInfo = document.createElement('button');
                btn.innerText = 'delete';
                btnInfo.innerText = 'info';
                btn.onclick = () => __awaiter(this, void 0, void 0, function* () {
                    yield carService.deleteById(id);
                    yield this._carsShow();
                });
                btnInfo.onclick = () => {
                    location.href = 'car.html?id=' + `${id}`;
                };
                itemDiv.appendChild(btn);
                itemDiv.appendChild(btnInfo);
                carsDiv.appendChild(itemDiv);
            });
        });
    }
    static _initForm() {
        const form = document.forms.namedItem('form');
        // const {brand, price, year} = form;
        const brand = form.brand;
        const price = form.price;
        const year = form.year;
        form.onsubmit = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            yield carService.create({ brand: brand.value, price: +price.value, year: +year.value });
            yield this._carsShow();
            form.reset();
        });
    }
}
CarRender.run();
// carService.getAll().then(value => console.log(value))
// // carService.create({brand:'AUDi',price:5000, year:2000}).then(value => console.log(value))
// // carService.deleteById(9964)
