import {request} from './request.js'

export function getDetail(iid) {
	return request({
		url: '/detail',
		params: {
			iid
		}
	})
}
export class Goods {
	constructor(itemInfo, columns, services) {
		this.title = itemInfo.title;
		this.desc = itemInfo.desc;
		this.newPrice = itemInfo.price;
		this.lowNowPrice = itemInfo.lowNowPrice;
		this.oldPrice = itemInfo.oldPrice;
		this.discount = itemInfo.discountDesc;
		this.discountBgColor = itemInfo.discountBgColor;
		this.columns = columns;
		this.services = services;
		this.nowPrice = itemInfo.highNowPrice;
	}
}

export class Shop {
	constructor(shopInfo) {
		this.logo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.fans = shopInfo.cFans;
		this.sells = shopInfo.cSells;
		this.score = shopInfo.score;
		this.goodsCount = shopInfo.cGoods;
	}
}
export class GoodsParams {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export function getRecommend() {
	return request({
		url: '/recommend'
	})
}