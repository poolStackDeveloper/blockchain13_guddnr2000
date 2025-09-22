const avante = () => {
    // new Promise(resolve, reject);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve("아반떼 go!");
        }, 3000);
    })
};

const sonata = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve("소나타 go!");
        }, 2000);
    })
};

const genesis = () => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve("제네시스 go!");
             }, 1000);
        } catch (error) {
            reject(error);
        }  
    })
};

const asyncCar = async() => {
    const car1 = await avante();
    console.log(car1);
    const car2 = await genesis();
    console.log(car2);
    const car3 = await sonata();
    console.log(car3);
}

asyncCar();