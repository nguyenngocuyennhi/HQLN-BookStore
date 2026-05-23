    function increaseQty(){
        let qty = document.getElementById("qty");
        qty.value = parseInt(qty.value) + 1;
    }
    function decreaseQty(){
        let qty = document.getElementById("qty");
        if(parseInt(qty.value) > 1){
            qty.value = parseInt(qty.value) - 1;
        }
    }