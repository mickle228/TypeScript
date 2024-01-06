interface ICar {
    id?: number;
    brand: string;
    price: number;
    year: number;
}

const carService = {
    getAll: (): Promise<ICar[]> => fetch('http://owu.linkpc.net/carsAPI/v1/cars').then(value => value.json()),
    create: (car: ICar): Promise<ICar> => fetch('http://owu.linkpc.net/carsAPI/v1/cars', {
        method: 'POST',
        body: JSON.stringify(car),
        headers: {'Content-type': 'application/json'}
    }).then(value => value.json()),
    deleteById: (id: number): Promise<Response> => fetch(`http://owu.linkpc.net/carsAPI/v1/cars/${id}`, {
        method: 'DELETE'
    })
}

class CarRender {
    static run(): void {
        this._initForm()
        this._carsShow()
    }

    private static async _carsShow(): Promise<void> {
        const carsDiv = document.querySelector('#carsDiv') as HTMLDivElement;
        carsDiv.innerHTML = ''
        const cars = await carService.getAll();
        cars.forEach(car => {
            const {id, brand, price, year} = car;
            const itemDiv = document.createElement('div');
            itemDiv.innerText = `${id}) ${brand} -- ${price} -- ${year}`
            const btn = document.createElement('button');
            const btnInfo = document.createElement('button');
            btn.innerText = 'delete'
            btnInfo.innerText = 'info'
            btn.onclick = async (): Promise<void> => {
                await carService.deleteById(id)
                await this._carsShow()
            }
            btnInfo.onclick =(): void => {
                location.href = 'car.html?id=' + `${id}`
            }
            itemDiv.appendChild(btn)
            itemDiv.appendChild(btnInfo)
            carsDiv.appendChild(itemDiv)
        })
    }

    private static _initForm(): void {
        const form = document.forms.namedItem('form');
        // const {brand, price, year} = form;
        const brand = form.brand as HTMLInputElement;
        const price = form.price as HTMLInputElement;
        const year = form.year as HTMLInputElement;
        form.onsubmit = async (e: SubmitEvent): Promise<void> => {
            e.preventDefault()
            await carService.create({brand: brand.value, price: +price.value, year: +year.value})
            await this._carsShow()
            form.reset()
        }
    }
}

CarRender.run()

// carService.getAll().then(value => console.log(value))
// // carService.create({brand:'AUDi',price:5000, year:2000}).then(value => console.log(value))
// // carService.deleteById(9964)
