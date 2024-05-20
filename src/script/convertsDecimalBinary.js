export const toBinary = (num) => {

  while (num < -127 || num > 127) {
    if (num < -127) {
      num += 127
    } else {
      num -= 127
    }
  }

  const isNegative = num < 0;
  
  if (isNegative) {
    const binaryUnsigned = Number(Math.abs(num)).toString(2).padStart(8, "0");
    
    const complement = binaryUnsigned
    .split("")
    .map((bit) => (bit === "0" ? "1" : "0"))
    .join("");
    num = parseInt(complement, 2) + 1;
  }
  
  return Number(num).toString(2).padStart(8, "0");
}

export const toDecimal = (num) => {

  const decimal = parseInt(num, 2);
  
  if (num.charAt(0) === "1") {
    return decimal - 256;
  }

  return decimal;
}
