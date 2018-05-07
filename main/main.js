const datbase = require('../main/datbase');
var loadAllItems = datbase.loadAllItems();
var loadPromotions = datbase.loadPromotions();

function addCount(inputs) {
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
}

function moveToItems() {
    var items = [];
    for (var i = 0; i < loadAllItems.length; i++)
        if (loadAllItems[i].count != 0)
            items.push(loadAllItems[i]);
    return items;
}

function addDiscount(items) {
    for (var i = 0; i < items.length; i++) {
        items[i].discount = 0;
        for (var j = 0; j < loadPromotions[0].barcodes.length; j++)
            if (loadPromotions[0].barcodes[j] == items[i].barcode) {
                items[i].discount = parseInt(items[i].count / 3);
                break;
            }
    }
    return items;
}

function arrangeItems(inputs) {
    addCount(inputs);
    var items = moveToItems();
    items = addDiscount(items)
    return items;
}

function addText1(items, printInventory) {
    for (var i = 0; i < items.length; i++)
        printInventory += '名称：' + items[i].name + '，数量：' + items[i].count + items[i].unit + '，单价：' + (items[i].price).toFixed(2) + '(元)，小计：' + (items[i].price * (items[i].count - items[i].discount)).toFixed(2) + '(元)\n';
    printInventory += '----------------------\n';
    return printInventory;
}

function addSendText(items, printInventory) {
    printInventory += '挥泪赠送商品：\n';
    for (var i = 0; i < items.length; i++)
        if (items[i].discount !== 0)
            printInventory += '名称：' + items[i].name + '，数量：' + items[i].discount + items[i].unit + '\n';
    printInventory += '----------------------\n';
    return printInventory;
}

function addSumText(items, printInventory) {
    var sum = 0, discount_sum = 0;
    for (var i = 0; i < items.length; i++) {
        sum += items[i].price * items[i].count;
        discount_sum += items[i].price * (items[i].count - items[i].discount);
    }
    printInventory += '总计：' + discount_sum.toFixed(2) + '(元)\n' + '节省：' + (sum - discount_sum).toFixed(2) + '(元)\n' + '**********************';
    return printInventory;
}

module.exports = function main(inputs) {
    var items = arrangeItems(inputs);
    var printInventory = '***<没钱赚商店>购物清单***\n';
    printInventory = addText1(items, printInventory);
    printInventory = addSendText(items, printInventory);
    printInventory = addSumText(items, printInventory);
    console.log(printInventory);
}