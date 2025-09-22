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

avante()
    .then((data)=>{
        console.log(data);
        return genesis();
    }).then((data)=>{
        console.log(data);
        return sonata();
    }).then((data)=>{
        console.log(data);
    }).catch((err)=>{
        //reject가 여기에 담긴다.
        console.log(err);
        
    })