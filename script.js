document.addEventListener('DOMContentLoaded', function() {
    const client = document.querySelector('.client');

    const image = client.innerHTML;

    client.innerHTML += image; 

    let position = 0;
    const speed = 1;    

    function scrollImages(){
        position += speed;
        if(position <= -client.scrollWidth / 5){
            position = 0;
        }
        client.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(scrollImages);
    }

    scrollImages();
});

async function fetchMarketPrice(){

    try{
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await response.json();
        
        let price = parseFloat(data.price);
        
        let formattedPrice = price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        document.querySelector('.three').textContent = `R$${formattedPrice}`;
    } catch (err) {
        console.error('erro ao buscar o preço:', err)
    }
}

setInterval(fetchMarketPrice, 5000);

fetchMarketPrice();

