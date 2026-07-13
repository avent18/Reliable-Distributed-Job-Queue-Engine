

export const getBackOffDelay = (attempt)=>{
  return Math.pow(2, attempt)*1000;
}