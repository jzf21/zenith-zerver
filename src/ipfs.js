const IPFS = require('ipfs-http-client');
const fs = require('fs');
const audiofile = './speech.mp3';


// Create an IPFS client connected to a local IPFS node or a public IPFS gateway
const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// Read the audio file as a buffer
const audioBuffer = fs.readFileSync(audiofile);

// Add the audio file to IPFS
ipfs.add(audioBuffer).then(response => {
  const ipfsHash = response.cid.toString();
  console.log(`Audio file added to IPFS. IPFS hash: ${ipfsHash}`);
}).catch(error => {
  console.error(`Error adding audio file to IPFS: ${error.message}`);
});
