describe("[APP] Esta es la prueba general",() =>{
    test ("Esto debería retornar",()=>{
        const a = 4;
        const b = 4;
        const total = a + b;
        expect(total).toEqual(8);
    });
});