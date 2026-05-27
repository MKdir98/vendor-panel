const ProductImportCSV =
  "data:text/csv;charset=utf-8," +
  `Product Handle;Product Title;Product Description;Product Status;Product Weight;Product Length;Product Width;Product Height;Variant Title;Variant SKU;Price IRR;Option 1 Name;Option 1 Value
sample-shirt;پیراهن نمونه;یک پیراهن ساده و راحت.;published;200;30;25;5;پیش‌فرض;SHIRT-001;850000;سایز;یک‌سایز
sample-hoodie;هودی نمونه;هودی گرم برای همه فصول.;published;500;40;35;8;S;HOODIE-S;1500000;سایز;S
sample-hoodie;هودی نمونه;هودی گرم برای همه فصول.;published;500;40;35;8;M;HOODIE-M;1500000;سایز;M
`

export const getProductImportCsvTemplate = () => {
  return encodeURI(ProductImportCSV)
}
