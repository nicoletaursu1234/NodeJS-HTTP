import axios from 'axios';
import net from 'net';
import fs from 'fs';

const port = 80;
const address = '81.180.73.230';
const regEx = /(?:(?:https?)+\:\/\/+[a-zA-Z0-9\/\._-]{1,})+(?:(?:jpe?g|png|gif))/gsim

let imgs = new Set<string>();

const socket: net.Socket = new net.Socket();

const urlToImg = async (url): Promise<void> => {
  const reg = /.*\.(png|jpe?g|gif)/;
  const format = url.match(reg);
  const date = Date.now().toString();

  const { data } = await axios({
    method: 'get',
    url,
    responseType: 'arraybuffer',
  });

  let img = await Buffer.from(data, 'base64');
  
  fs.writeFile(`src/imgs/${date}.${format[1]}`, img, err => {console.error(err)});
}

socket.connect(port, address, () => {
  console.log(`Connected to socket ${address}:${port}`);
});

socket.write(`GET / HTTP/1.0
Host: me.utm.md\r\n
`);

socket.on('data', (data) => {
  let res = '';
  res += data;

  const allMatches = res.match(regEx);

  allMatches?.forEach ( match => {
    (match) && imgs.add(match);
  })
  
});

socket.on('close', () => {
  imgs.forEach( async elem => {
    await urlToImg(elem);
  });

  console.log('Bye');
});
