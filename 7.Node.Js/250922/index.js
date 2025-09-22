const avante = (callback) => {
    setTimeout(() => {
        console.log("아반떼 Go");
        callback();
    }, 3000);
};

const sonata = (callback) => {
    setTimeout(() => {
        console.log("Sonata Go");
        callback();
    }, 2000);
    
};

const genesis = (callback) => {
    setTimeout(() => {
        console.log("Genesis Go");
        callback();
    }, 1000);
    
};

avante(()=>{
    genesis(() => {
        sonata(()=> {
            
        });
    });
});

