export const InvoiceNumberGenerator = () => {
  let invoiceNumber = "";
  for (let i = 0; i < 12; i++) {
    let randomNumber = Math.floor(Math.random() * 9);
    invoiceNumber = invoiceNumber + randomNumber.toString();
  }

  return invoiceNumber;
};
