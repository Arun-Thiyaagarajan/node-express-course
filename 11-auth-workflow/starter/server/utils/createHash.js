import crypto from 'crypto';

const createHashString = (string) => {
    crypto.createHash('md5').update(string).digest('hex');
}

export default createHashString;