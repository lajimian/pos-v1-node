const datbase = require('../main/datbase');
var loadAllItems=datbase.loadAllItems();
var loadPromotions= datbase.loadPromotions();
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
    
    for(var i=0;i<items.length;i++){
        items[i].discount=0;
        for(var j=0;j<loadPromotions[0].barcodes.length;j++)
            if(loadPromotions[0].barcodes[j]==items[i].barcode)
            {
                items[i].discount=parseInt(items[i].count/3);
                break;
            }            
    }
    var sum =0;
    var discount_sum = 0;

    for(var i=0;i<items.length;i++){
        printInventory +='名称：'+items[i].name+'，数量：'+items[i].count+items[i].unit+'，单价：'+(items[i].price).toFixed(2)+'(元)，小计：'+(items[i].price*(items[i].count-items[i].discount)).toFixed(2)+'(元)\n';
        sum += items[i].price*items[i].count ;
        discount_sum += items[i].price*(items[i].count-items[i].discount);
     }

     printInventory +='----------------------\n';
     
     printInventory +='挥泪赠送商品：\n';
     for(var i=0;i<items.length;i++)
      
          if(items[i].discount!==0)
          printInventory +='名称：'+items[i].name+'，数量：'+items[i].discount+items[i].unit+'\n';

    


         



     printInventory +='----------------------\n';



     printInventory +='总计：'+discount_sum.toFixed(2) +'(元)\n'+'节省：'+(sum-discount_sum).toFixed(2)+'(元)\n';

     printInventory+='**********************';





       
   
    
    console.log(printInventory);   
}


