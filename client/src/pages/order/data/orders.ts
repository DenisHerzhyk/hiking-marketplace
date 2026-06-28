export const mockOrders = [
  {
    id: 1,
    date: "April 20, 2026",
    status: "Delivered",
    address: "123 Main St, New York, NY 10001",
    items: [
      {
        title: "Men's Torrentshell Jacket",
        size: "M",
        color: "#4F5D3E",
        price: 179,
      },
      {
        title: "Men's Quandary Pants",
        size: "32",
        color: "#3E5441",
        price: 120,
      },
    ],
    subtotal: 299,
    shipping: 0,
    total: 299,
  },
  {
    id: 2,
    date: "April 24, 2026",
    status: "In Transit",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    items: [
      {
        title: "Men's Down Sweater Hoody",
        size: "L",
        color: "#C4522C",
        price: 349,
      },
    ],
    subtotal: 349,
    shipping: 0,
    total: 349,
  },
];
