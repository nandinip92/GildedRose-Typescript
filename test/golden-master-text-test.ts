import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

// Add a master test here
describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal( 'foo');
        expect(items[0].sellIn).to.equal(-1)
        expect(items[0].quality).to.equal(0);
    });

});

// let gildedRose = new GildedRose([ new Item('foo', 0, 0) ]); // [ Item { name: 'foo', sellIn: -1, quality: 0 } ]


// gildedRose = new GildedRose([new Item('tomato',10,50)]) //[ Item { name: 'tomato', sellIn: 9, quality: 49 } ]

// gildedRose = new GildedRose([new Item('Aged Brie',14,50),new Item('Aged Brie',1,5)]) 
// //    [ Item { name: 'Aged Brie', sellIn: 13, quality: 50 },
// //     Item { name: 'Aged Brie', sellIn: 0, quality: 6 },
// //   ]
// gildedRose = new GildedRose([new Item('Aged Brie',0,5), new Item('Aged Brie',-3,5)])
// // [
// //     Item { name: 'Aged Brie', sellIn: -1, quality: 7 },
// //     Item { name: 'Aged Brie', sellIn: -4, quality: 7 }
// //   ]
// gildedRose = new GildedRose([
//     new Item('Backstage passes to a TAFKAL80ETC concert', 20, 45), 
//     new Item('Backstage passes to a TAFKAL80ETC concert', 9, 45), 
//     new Item('Backstage passes to a TAFKAL80ETC concert', 3, 45), 
//     new Item('Backstage passes to a TAFKAL80ETC concert', 0, 45), 
//     new Item('Backstage passes to a TAFKAL80ETC concert', -9, 45)])
// const items = gildedRose.updateQuality();
// // [
// //     Item {
// //       name: 'Backstage passes to a TAFKAL80ETC concert',
// //       sellIn: 19,
// //       quality: 46
// //     },
// //     Item {
// //       name: 'Backstage passes to a TAFKAL80ETC concert',
// //       sellIn: 8,
// //       quality: 47
// //     },
// //     Item {
// //       name: 'Backstage passes to a TAFKAL80ETC concert',
// //       sellIn: 2,
// //       quality: 48
// //     },
// //     Item {
// //       name: 'Backstage passes to a TAFKAL80ETC concert',
// //       sellIn: -1,
// //       quality: 0
// //     },
// //     Item {
// //       name: 'Backstage passes to a TAFKAL80ETC concert',
// //       sellIn: -10,
// //       quality: 0
// //     }
// //   ]