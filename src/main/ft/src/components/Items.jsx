import axios from 'axios';

export async function Items() {
  try {
    const response = await axios.get('/ft/item/list');
    const itemList = response.data;
    
    // 각 아이템에 대해 상세 정보(옵션과 태그)를 가져와서 추가합니다.
    const itemsWithDetail = await Promise.all(itemList.map(async (item) => {
      const detail = await getItemDetail(item.iid);
      return { ...item, ...detail }; // 기존 아이템 정보와 상세 정보를 합칩니다.
    }));

    return itemsWithDetail;
  } catch (error) {
    console.error('Error fetching product list:', error);
    return [];
  }
}

export async function getItemDetail(iid) {
  try {
    const response = await axios.get(`/ft/item/detail/${iid}/em`);
    const { item, options, tags } = response.data;

    const formattedItem = {
      iid: item.iid,
      name: item.name,
      category: item.category,
      img1: item.img1,
      img2: item.img2,
      img3: item.img3,
      price: item.price,
      saleDate: item.saleDate,
      salePrice: item.salePrice,
      totalSta: item.totalSta,
    };

    const formattedOptions = options ? options.map(option => ({
      ioid: option.ioid,
      option: option.option,
      stock: option.count,
      count: 0,
      price: option.price,
    })) : [];

    const formattedTags = tags ? tags.map(tag => ({
      itid: tag.itid,
      tag: tag.tag,
    })) : [];

    return { item: formattedItem, options: formattedOptions, tags: formattedTags };
  } catch (error) {
    console.error('Error fetching item detail:', error);
    return null;
  }
}
