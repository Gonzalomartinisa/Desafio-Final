process.on("message",(cant) => {
    const resultado =  {};

    for (let i = 0; i < cant; i++) {
        const numero = Math.floor(Math.random() * 1000 + 1);
        if (numero in resultado) resultado[numero]++;
        else resultado[numero] = 1;
    };
    process.send(resultado);  
});


