import axios from 'axios';
import {API_KEY, API_URL} from '../helpers/Variables';

export const getCompareCoin = async (coin, listCoins) => {
  try {
    const strCoins = listCoins.join(',');
    const url = `${API_URL}price?fsym=${coin}&tsyms=${strCoins}&api_key=${API_KEY}`;
    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getDailyPair = async (coin, compare, limit = 7) => {
  try {
    const url = `${API_URL}v2/histoday?fsym=${coin}&tsym=${compare}&limit=${limit}&api_key=${API_KEY}`;
    const res = await axios.get(url);
    return res.data['Data'].Data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
