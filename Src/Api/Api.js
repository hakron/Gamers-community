import axios from '../axios';

const CLIENT_ID = 'duecfq1es6f5rgg0bxny2jgir00ggz';
const BASE_URL = 'https://api.twitch.tv/kraken/';

export function getChannelInfo(channel) {
  return axios.get(`${BASE_URL}channels/${channel}/?client_id=${CLIENT_ID}&callback=`);
}

export function getStreamInfo(channel) {
  return axios.get(`${BASE_URL}streams/${channel}/?client_id=${CLIENT_ID}&callback=`);
}
