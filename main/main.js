const datbase = require('../main/datbase');
var loadAllItems=datbase.loadAllItems();

module.exports = function main(inputs) {   
    

    for (var i = 0; i < loadAllItems.length; i++) {
        loadAllItems[i].count = 0;
        for (var j = 0; j < inputs.length; j++)
            if (inputs[j].slice(0, 10) == loadAllItems[i].barcode) {
                if (inputs[j].length == 10)
                    loadAllItems[i].count++;
                else
                    loadAllItems[i].count += Number(inputs[j].slice(11, inputs[j].length));
            }
    }
    
    var items=[];
    for(var i=0;i<loadAllItems.length;i++)
        if(loadAllItems[i].count!=0)
         items.push(loadAllItems[i]);
        
       

     
    var printInventory = '***<没钱赚商店>购物清单***\n';
    
    
    console.log(items);   
}


