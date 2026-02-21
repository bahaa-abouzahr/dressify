export const PRODUCTS_IMAGE_BASE =
  "https://ounyoarjnuaqqyrtwkuh.supabase.co/storage/v1/object/public/products/";

  

export const PAGE_SIZE = 12;

export const SIZE_ORDER_MAP = {
  xs: 150,
  s: 151,
  m: 152,
  l: 153,
  xl: 154,
  xxl: 155,
  "one": 100,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "11": 11,
  "12": 12,
  35: 35,
  36: 36,
  37: 37,
  38: 38,
  39: 39,
  40: 40,
  41: 41,
  42: 42,
  43: 43,
  44: 44,
  45: 45,
  "28w x 30l": 2830,
  "28w x 32l": 2832,

  "29w x 30l": 2930,
  "29w x 32l": 2932,

  "30w x 30l": 3030,
  "30w x 32l": 3032,
  "30w x 34l": 3034,

  "31w x 30l": 3130,
  "31w x 32l": 3132,
  "31w x 34l": 3134,

  "32w x 30l": 3230,
  "32w x 32l": 3232,
  "32w x 34l": 3234,

  "33w x 30l": 3330,
  "33w x 32l": 3332,
  "33w x 34l": 3334,

  "34w x 30l": 3430,
  "34w x 32l": 3432,
  "34w x 34l": 3434,

  "35w x 30l": 3530,
  "35w x 32l": 3532,
  "35w x 34l": 3534,

  "36w x 30l": 3630,
  "36w x 32l": 3632,
  "36w x 34l": 3634,

  "37w x 32l": 3732,
  "37w x 34l": 3734,

  "38w x 32l": 3832,
  "38w x 34l": 3834,
};

export const SIZE_OPTIONS = [
  // Kids Options
  { label: "7 Years", value: "7y" },
  { label: "8 Years", value: "8y" },
  { label: "9 Years", value: "9y" },
  { label: "10 Years", value: "10y" },
  { label: "11 Years", value: "11y" },

  // One Size Only
  { label: "One Size", value: "one" },

  // Pants Options
  { label: "28W x 30L", value: "28W30L" },
  { label: "28W x 32L", value: "28W32L" },

  { label: "29W x 30L", value: "29W30L" },
  { label: "29W x 32L", value: "29W32L" },

  { label: "30W x 30L", value: "30W30L" },
  { label: "30W x 32L", value: "30W32L" },
  { label: "30W x 34L", value: "30W34L" },

  { label: "31W x 30L", value: "31W30L" },
  { label: "31W x 32L", value: "31W32L" },
  { label: "31W x 34L", value: "31W34L" },

  { label: "32W x 30L", value: "32W30L" },
  { label: "32W x 32L", value: "32W32L" },
  { label: "32W x 34L", value: "32W34L" },

  { label: "33W x 30L", value: "33W30L" },
  { label: "33W x 32L", value: "33W32L" },
  { label: "33W x 34L", value: "33W34L" },

  { label: "34W x 30L", value: "34W30L" },
  { label: "34W x 32L", value: "34W32L" },
  { label: "34W x 34L", value: "34W34L" },

  { label: "35W x 30L", value: "35W30L" },
  { label: "35W x 32L", value: "35W32L" },
  { label: "35W x 34L", value: "35W34L" },

  { label: "36W x 30L", value: "36W30L" },
  { label: "36W x 32L", value: "36W32L" },
  { label: "36W x 34L", value: "36W34L" },

  { label: "37W x 32L", value: "37W32L" },
  { label: "37W x 34L", value: "37W34L" },

  { label: "38W x 32L", value: "38W32L" },
  { label: "38W x 34L", value: "38W34L" },
];

export const SIZE_LABEL_BY_VALUE = Object.fromEntries(
  SIZE_OPTIONS.map(o => [o.value, o.label])
);