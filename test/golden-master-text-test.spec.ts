import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

// Add a master test here
describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
    expect(items[0].sellIn).to.equal(-1);
    expect(items[0].quality).to.equal(0);
    expect(items).to.deep.equal([{ name: "foo", sellIn: -1, quality: 0 }]);
    expect(items).to.deep.equal([new Item("foo", -1, 0)]);
  });

  describe("check Age Brie", function () {
    it("quality is should be no more than 50", function () {
      const gildedRose = new GildedRose([
        new Item("Aged Brie", 14, 50),
        new Item("Aged Brie", -3, 49),
      ]);
      const items = gildedRose.updateQuality();
      const output = [
        new Item("Aged Brie", 13, 50),
        new Item("Aged Brie", -4, 50),
      ];
      expect(items).to.deep.equal(output);
    });

    it("quality increases by 1 and sellIn decreases by 1", function () {
      const gildedRose = new GildedRose([
        new Item("Aged Brie", 10, 5),
        new Item("Aged Brie", 3, 5),
      ]);
      const items = gildedRose.updateQuality();
      const output = [new Item("Aged Brie", 9, 6), new Item("Aged Brie", 2, 6)];
      expect(items).to.deep.equal(output);
    });

    it("Quality increases by 2 when the sellin is less than 0", function () {
      const gildedRose = new GildedRose([
        new Item("Aged Brie", 0, 5),
        new Item("Aged Brie", -3, 5),
      ]);
      const items = gildedRose.updateQuality();
      const output = [
        new Item("Aged Brie", -1, 7),
        new Item("Aged Brie", -4, 7),
      ];
      expect(items).to.deep.equal(output);
    });
    it("Edge Case: When Quality is 49 and Sellin<=0 instead of increasing by 2 it should stop at 50", function () {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 49)]);
      const items = gildedRose.updateQuality();
      const output = [new Item("Aged Brie", -1, 50)];
      expect(items).to.deep.equal(output);
    });
  });

  describe("check for Backstage passes", function () {
    it("Quality increases by 2 if Sellin less than or equal to 10", function () {
      const inputItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 9, 45),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 15),
      ];
      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      const output = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 8, 47),
        new Item("Backstage passes to a TAFKAL80ETC concert", 9, 17),
      ];
      expect(items).to.deep.equal(output);
    });

    it("quality increases by 3 and sellIn <= 5", function () {
      const inputItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 18),
        new Item("Backstage passes to a TAFKAL80ETC concert", 2, 23),
      ];

      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      const output = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 4, 21),
        new Item("Backstage passes to a TAFKAL80ETC concert", 1, 26),
      ];

      expect(items).to.deep.equal(output);
    });

    it("Quality drop to 0 after the concert/when the sellIn <= 0", function () {
      const inputItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 45),
        new Item("Backstage passes to a TAFKAL80ETC concert", -9, 15),
      ];

      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      const output = [
        new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0),
        new Item("Backstage passes to a TAFKAL80ETC concert", -10, 0),
      ];

      expect(items).to.deep.equal(output);
    });
    it("Quality increase by 1 and sellIn decreases by 1 in all the other cases", function () {
      const inputItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 44, 8),
        new Item("Backstage passes to a TAFKAL80ETC concert", 17, 25),
      ];

      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      const output = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 43, 9),
        new Item("Backstage passes to a TAFKAL80ETC concert", 16, 26),
      ];

      expect(items).to.deep.equal(output);
    });

    it("Quality <= 50", () => {
      const inputItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 44, 50),
        new Item("Backstage passes to a TAFKAL80ETC concert", 17, 50),
      ];
      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      const outputItems = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 43, 50),
        new Item("Backstage passes to a TAFKAL80ETC concert", 16, 50),
      ];
      expect(items).to.deep.equal(outputItems);
    });
  });

  describe("Check for Sulfuras", function () {
    it("should keep quality 80 and never be sold/descrease the quality", function () {
      const inputItems = [
        new Item("Sulfuras, Hand of Ragnaros", 10, 80),
        new Item("Sulfuras, Hand of Ragnaros", 3, 80),
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      ];
      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      expect(items).to.deep.equal(inputItems);
    });
  });

  describe("Check for Conjured Mana Cake", function () {
    it("should descrease the quality by 2 when sellIn > 0", function () {
      const inputItems = [
        new Item("Conjured Mana Cake", 10, 36),
        new Item("Sulfuras, Hand of Ragnaros", 3, 12),
        new Item("Sulfuras, Hand of Ragnaros", 16, 1)
      ];
      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      const outputItems = [
        new Item("Conjured Mana Cake", 9, 34),
        new Item("Sulfuras, Hand of Ragnaros", 2, 10),
        new Item("Sulfuras, Hand of Ragnaros", 15, 0)
      ]
      expect(items).to.deep.equal(inputItems);
    });

    it("should descrease the quality by 4 when sellIn <= 0", function () {
      const inputItems = [
        new Item("Conjured Mana Cake", 0, 25),
        new Item("Sulfuras, Hand of Ragnaros", -3, 17),
        new Item("Sulfuras, Hand of Ragnaros", -8, 3)
      ];
      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      const outputItems = [
        new Item("Conjured Mana Cake", -1, 21),
        new Item("Sulfuras, Hand of Ragnaros", -4, 13),
        new Item("Sulfuras, Hand of Ragnaros", -9, 0)
      ]
      expect(items).to.deep.equal(inputItems);
    });
  });

  describe("Check for All the other items", function () {
    it("Quality should be decreased by 1 and sellIn should be decreased by 1 when sellIn > 0", function () {
      const inputItems = [
        new Item("Tomato", 7, 32),
        new Item("Banana", 19, 27),
        new Item("Carrot", 30, 2),
      ];
      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      const outputItems = [
        new Item("Tomato", 6, 31),
        new Item("Banana", 18, 26),
        new Item("Carrot", 29, 1),
      ];
      expect(items).to.deep.equal(outputItems);
    });

    it("Once the sell by date has passed, ie. sellIn <=0, quality descreased twice as fast", () => {
      const inputItems = [
        new Item("Tomato", 0, 16),
        new Item("Banana", -2, 50),
        new Item("Carrot", -4, 0),
      ];
      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      const outputItems = [
        new Item("Tomato", -1, 14),
        new Item("Banana", -3, 48),
        new Item("Carrot", -5, 0),
      ];
      expect(items).to.deep.equal(outputItems);
    });
    it("Quality cannot be decreased beyond 0", () => {
      const inputItems = [new Item("Spinach", 15, 0)];
      const gildedRose = new GildedRose(inputItems);
      const items = gildedRose.updateQuality();
      expect(items).to.deep.equal([new Item("Spinach", 14, 0)]);
    });
  });
});
