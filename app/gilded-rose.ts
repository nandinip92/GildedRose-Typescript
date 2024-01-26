export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const updateAgedBrieQuality = (item) => {
      // The Quality of an item can never increase to be more than 50
      if (item.quality < 50) {
        item.quality += 1;
      }
      if (item.sellIn <= 0 && item.quality < 50) {
        item.quality += 1;
      }
    };

    const updateBackstageQuality = (item) => {
      // The Quality of an item can never increase to be more than 50
      if (item.quality < 50) {
        item.quality++;
      }
      // Quality increases by 2 when there are 10 days or less
      if (item.sellIn < 11 && item.quality < 50) {
        item.quality++;
      }
      // Quality increase by 3 when sellIn are 5 days o less
      if (item.sellIn < 6 && item.quality < 50) {
        item.quality++;
      }
      // Quality of 'Backstage passes' drop to 0
      if (item.sellIn <= 0) {
        item.quality = 0;
      }
    };
    const updateQualityForOthers = (item) => {
      if (item.quality > 0) item.quality -= 1;
      if (item.quality > 0 && item.sellIn <= 0) item.quality -= 1;
    };

    const updateConjuredQuality = (item) => {
      if (item.quality >= 2) item.quality -= 2;
      else if (item.quality <= 1) item.quality = 0;
      else if (item.quality >= 2 && item.sellIn <= 0) item.quality -= 2;
      else if (item.quality <= 1 && item.sellIn <= 0) item.quality = 0;
    };

    this.items.forEach((item) => {
      if (item.name === "Aged Brie") {
        updateAgedBrieQuality(item);
      } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        updateBackstageQuality(item);
      } else if (item.name === "Conjured Mana Cake") {
        updateConjuredQuality(item);
      } else {
        updateQualityForOthers(item);
      }
      if (item.name !== "Sulfuras, Hand of Ragnaros") {
        item.sellIn = item.sellIn - 1;
      }
    });
    return this.items;
  }
  updateQuality_original() {
    for (let i = 0; i < this.items.length; i++) {
      // select the items not belong to 'Aged Brie' or 'Backstage passes to a concert' as these two increase quality
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // check quality great than 0, min quality is 0
        if (this.items[i].quality > 0) {
          // check item is not Sulfuras, which will not change quality'
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            // descrease quality with increase of sellIn
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
        // it's 'Aged Brie' or 'Backstage passes'
      } else {
        // The Quality of an item can never increase to be more than 50
        if (this.items[i].quality < 50) {
          // increase quality with growing sellIn
          this.items[i].quality = this.items[i].quality + 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // Quality increases by 2 when there are 10 days or less
            if (this.items[i].sellIn < 11) {
              // check the quality is always not greater than 50
              if (this.items[i].quality < 50) {
                // why not increase by 2?
                this.items[i].quality = this.items[i].quality + 1;
              }
            } // Quality increase by 3 when sellIn are 5 days o less
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                // why not increase by 3?
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      // check the items are not sulfuras
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      // check sellIn smaller than 0
      if (this.items[i].sellIn < 0) {
        // check item is not 'Aged Brie'
        if (this.items[i].name != "Aged Brie") {
          // check item is not 'Backstage passes'
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // check quality greater than 0
            if (this.items[i].quality > 0) {
              // check item is not sulfuras
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                // quality decrease by 1
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            // item is 'Backstage passes'
            // Quality of 'Backstage passes' drop to 0
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          // item is 'Aged Brie'
          //check quality always smaller than 50
          if (this.items[i].quality < 50) {
            // 'Aged Brie' quality increased by 1
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

// let gildedRose = new GildedRose([new Item("foo", 0, 0)]); // [ Item { name: 'foo', sellIn: -1, quality: 0 } ]

// gildedRose = new GildedRose([new Item("Aged Brie", -3, 49)]);
// const items = gildedRose.updateQuality_original();

// console.log(items);
