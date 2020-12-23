let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el) => document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

pizzaJson.map ((item, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

   

    pizzaItem.querySelector('a').addEventListener('click', (e)=> {
        e.preventDefault(); //bloqueia a atualização da tela, e clica nos itens selecionados
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if (sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        
                
        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout (()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
       
       
    });

    // let valoresPizza = document.getElementById("za")
    //     dump(d.innerHTML);

    c('.pizza-area').append( pizzaItem );
});

//eventos do modal, voltar (mobile) e cancelar(web)

function closeModal () {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}
        cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
            item.addEventListener('click', closeModal);
        });

    c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
        if (modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
        }
    });

    c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
        modalQt++;
        c('.pizzaInfo--qt').innerHTML = modalQt;

    });
    
    cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
        size.addEventListener('click', (e)=> {
            c('.pizzaInfo--size.selected').classList.remove('selected');
            size.classList.add('selected');

        });
    });

    c('.pizzaInfo--addButton').addEventListener('click', () => {          
        let size =  parseInt (c('.pizzaInfo--size.selected').getAttribute('data-key'));

        let identifier = pizzaJson[modalKey].id+'@'+size;

        let key = cart.findIndex((item)=>item.identifier == identifier);
     
        if(key > -1 ) {
            cart[key].qt += modalQt;
        } else {
            cart.push({
                identifier,
                id:pizzaJson[modalKey].id,
                size,
                qt:modalQt
            });
        }
        updateCart();
        closeModal();
 });

function updateCart(){
    if(cart.length > 0){
        c('aside').classList.add('show');

        c('.cart').innerHTML = '';

        let subtotal = 0;
        let entrega = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=> item.id == cart [i].id);

            subtotal +=pizzaItem.price * cart[i].qt;


            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;    
                case 2:
                    pizzaSizeName = 'G';
                    break;    
            }

            let pizzaName = `${pizzaItem.name}(${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart [i].qt--;
                } else {
                    cart.splice(i, 1);
                }

                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
               cart[i].qt++;
               updateCart();
            });

            c('.cart').append(cartItem);
        
         
        };
               
        if (subtotal >= 50){
            entrega = 0;
        } else {
            entrega = 3.99;
        };
        
        // Para pedidos acima de R$50 a entrega é gratis
        total = subtotal + entrega;        
       

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.entrega span:last-child').innerHTML = `R$ ${entrega.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;


   } else {
        c('aside').classList.remove('show');
    }
}

href="https://web.whatsapp.com/send?phone=5516997774016&text=Ol%C3%A1+NOMECLIENTE+seu+pedido+de+PIZZA+n+15281+est%C3%A1+em+andamento%21action-button%3FIniciar+convers%3Faaction-button%3send"


