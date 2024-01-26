import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Golden Master Test', function () {

    describe('Backstage passes to a TAFKAL80ETC concert tests', function () {

        const backStagePassesName = "Backstage passes to a TAFKAL80ETC concert";

        it('quality less than 50, quality should increase by 1', function () {
            const gildedRose = new GildedRose([ new Item(backStagePassesName, 12, 0) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(backStagePassesName);
            expect(items[0].quality).to.equal(1);
        });

        it('quality less than 50, 5 < sellIn < 11, quality should increase by 2', function () {
            const gildedRose = new GildedRose([ new Item(backStagePassesName, 6, 0) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(backStagePassesName);
            expect(items[0].quality).to.equal(2);
        });

        it('quality less than 50, sellIn < 6, quality should increase by 3', function () {
            const gildedRose = new GildedRose([ new Item(backStagePassesName, 5, 0) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(backStagePassesName);
            expect(items[0].quality).to.equal(3);
        });

        it('quality is 49, sellIn < 6, quality should increase by 1', function () {
            const gildedRose = new GildedRose([ new Item(backStagePassesName, 5, 49) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(backStagePassesName);
            expect(items[0].quality).to.equal(50);
        });

        it('quality less than 50, sellIn < 1, sellIn should be -1, quality should be 0', function () {
            const gildedRose = new GildedRose([ new Item(backStagePassesName, 0, 0) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(backStagePassesName);
            expect(items[0].sellIn).to.equal(-1);
            expect(items[0].quality).to.equal(0);
        });
    });

    describe('Aged Brie tests', function () {

        const agedBrieName = "Aged Brie";

        it('quality less than 50, quality should increase by 1', function () {
            const gildedRose = new GildedRose([ new Item(agedBrieName, 12, 0) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(agedBrieName);
            expect(items[0].quality).to.equal(1);
        });

        it('quality > 50, quality should not change', function () {
            const gildedRose = new GildedRose([ new Item(agedBrieName, 12, 50) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(agedBrieName);
            expect(items[0].quality).to.equal(50);
        });

        it('quality less than 50, sellIn < 1, quality should increase by 2', function () {
            const gildedRose = new GildedRose([ new Item(agedBrieName, 0, 0) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(agedBrieName);
            expect(items[0].quality).to.equal(2);
        });

        it('quality > 50, sellIn < 1, quality should not change', function () {
            const gildedRose = new GildedRose([ new Item(agedBrieName, 0, 50) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(agedBrieName);
            expect(items[0].quality).to.equal(50);
        });
    });

    describe('Sulfuras, Hand of Ragnaros tests', function () {

        const handOfRagnarosName = "Sulfuras, Hand of Ragnaros";

        it('does not change', function () {
            const gildedRose = new GildedRose([ new Item(handOfRagnarosName, 12, 5) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(handOfRagnarosName);
            expect(items[0].quality).to.equal(5);
            expect(items[0].sellIn).to.equal(12);
        });

        it('does not change, even with low values', function () {
            const gildedRose = new GildedRose([ new Item(handOfRagnarosName, -1, 5) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(handOfRagnarosName);
            expect(items[0].quality).to.equal(5);
            expect(items[0].sellIn).to.equal(-1);
        });
    });

    describe('Others tests', function () {

        const otherName = "Other";

        it('0 < quality < 50, quality should decrease by 1', function () {
            const gildedRose = new GildedRose([ new Item(otherName, 12, 2) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(otherName);
            expect(items[0].quality).to.equal(1);
            expect(items[0].sellIn).to.equal(11);
        });

        it('sellIn < 0, quality > 0, should decrease by 1', function () {
            const gildedRose = new GildedRose([ new Item(otherName, -1, 2) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(otherName);
            expect(items[0].quality).to.equal(0);
            expect(items[0].sellIn).to.equal(-2);
        });

        it('sellIn < 0, quality < 0, should not change', function () {
            const gildedRose = new GildedRose([ new Item(otherName, -1, -2) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].name).to.equal(otherName);
            expect(items[0].quality).to.equal(-2);
            expect(items[0].sellIn).to.equal(-2);
        });
    });

});
