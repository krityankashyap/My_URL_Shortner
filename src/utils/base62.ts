const base62_Char= '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSRUVWXYZ';
export function toBase62(num: number): string{
  if(num === 0) return '0';

  let result= '';

  let temp= num;

  while(temp>0){
    result= base62_Char[temp%62] + result;
    temp= Math.floor(temp/62);
  }

  return result;
}

export function fromBase62(str: string): number{
  let result= 0;

  for(let i=0; i<str.length; i++){
      const char= str[i];
      const value= base62_Char.indexOf(char);
      result= result * 62 + value;
  }

  return result;
}