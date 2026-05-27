import fs from 'fs';

const categories = [
  { id: "boxen", label: "Fede Boxen", icon: "Package", color: "terracotta" },
  { id: "bubble", label: "Bubble Waffle", icon: "Layers", color: "peach" },
  { id: "crepes", label: "Crêpes", icon: "Cake", color: "beige" },
  { id: "kuchen", label: "Kuchen", icon: "Cake", color: "cream" },
  { id: "cookies", label: "Cookies", icon: "Cookie", color: "brown-light" },
  { id: "eisbecher", label: "Eisbecher 500ml", icon: "Coffee", color: "peach" },
  { id: "shakes", label: "Special Shakes", icon: "Coffee", color: "terracotta" },
  { id: "iced", label: "Iced Drinks", icon: "Droplets", color: "cream" },
  { id: "stullen", label: "Stullen", icon: "Sandwich", color: "beige" },
  { id: "getraenke", label: "Getränke", icon: "Droplets", color: "cream" },
];

const menu = {
  boxen: {
    items: [
      { name: "Fede & Friends", price: "25,00 €", tag: "Sharing Box", desc: "12 Pancakes · Bubble Waffle · 3 Fruchtsorten · 3 Mini-Croissants · 3 Mini-Schokobrötchen · 3 Mini-Windbeutel · 3 Schokosbällchen · 4 Soßen" },
      { name: "Pancake Picknick", price: "7,00 €", tag: "", desc: "12 Pancakes · 2 Fruchtsorten · Soße nach Wahl" },
      { name: "Mix Box", price: "15,00 €", tag: "Beliebt", desc: "12 Pancakes · Bubble Waffle · 3 Fruchtsorten · 2 Soßen" },
      { name: "Nutella Box", price: "15,00 €", tag: "", desc: "10 Pancakes · Bubble Waffle · 1 Fruchtsorte · 2× Nutella · 3 Mini-Croissants · 3 Schokosbällchen" },
    ],
  },
  bubble: {
    items: [
      { name: "Puderzucker", price: "3,80 €", desc: "Klassisch mit Puderzucker bestäubt" },
      { name: "Soße nach Wahl", price: "5,00 €", desc: "Mit deiner Lieblingssoße" },
      { name: "Eis + Sahne", price: "6,50 €", desc: "Mit Eiskugel & Sahne (oder 2 Eiskugeln statt Sahne)" },
      { name: "Deluxe", price: "8,80 €", tag: "Beliebt", desc: "Eis + Sahne + 3 Toppings + Soße · auch mit 2 Eiskugeln möglich" },
    ],
  },
  crepes: {
    items: [
      { name: "Puderzucker / Zimt", price: "3,50 €", desc: "Der Klassiker" },
      { name: "Nutella", price: "4,50 €", desc: "Mit reichlich Nutella" },
      { name: "Nutella + Topping", price: "5,50 €", desc: "Nutella + Topping deiner Wahl" },
      { name: "Fruit Fiesta", price: "5,00 €", tag: "Empfohlen", desc: "Verschiedene Früchte & eine Soße" },
    ],
  },
  kuchen: {
    items: [
      { name: "Kuchen des Tages", price: "Auf Anfrage", tag: "Täglich frisch", desc: "Täglich wechselnde Sorten in unserer Vitrine" },
      { name: "Tortenstück", price: "Auf Anfrage", desc: "Auswahl an Tortenspezialitäten" },
    ],
  },
  cookies: {
    items: [
      { name: "Cookies", price: "Auf Anfrage", tag: "Frisch", desc: "Täglich frisch gebacken in verschiedenen Sorten" },
    ],
  },
  eisbecher: {
    items: [
      { name: "Bananasplit", price: "7,50 €", desc: "500ml Eisbecher" },
      { name: "Walnuss", price: "8,00 €", desc: "500ml Eisbecher" },
      { name: "Schoko", price: "7,00 €", desc: "500ml Eisbecher" },
      { name: "Frucht", price: "7,50 €", desc: "500ml Eisbecher" },
      { name: "Spaghetti", price: "7,00 €", tag: "Klassiker", desc: "500ml Eisbecher" },
      { name: "Erdbeer", price: "7,50 €", desc: "500ml Eisbecher" },
    ],
  },
  shakes: {
    items: [
      { name: "Nutella Shake", price: "6,50 €", desc: "0,4l + Sahne" },
      { name: "Cheesecake Shake", price: "6,50 €", desc: "0,4l + Sahne" },
      { name: "Oreo Shake", price: "6,50 €", tag: "Beliebt", desc: "0,4l + Sahne" },
      { name: "Snickers Shake", price: "6,50 €", desc: "0,4l + Sahne" },
      { name: "Lotus Shake", price: "6,50 €", desc: "0,4l + Sahne" },
      { name: "Bueno Shake", price: "6,50 €", desc: "0,4l + Sahne" },
    ],
  },
  iced: {
    items: [
      { name: "Iced Matcha", price: "ab 4,50 €", tag: "Trend", desc: "Hochwertiger Matcha, kalt aufgegossen" },
      { name: "Iced Coffee", price: "ab 4,50 €", desc: "Cold Brew über Eis" },
      { name: "Iced Latte", price: "ab 4,50 €", desc: "Espresso, Milch & Eis" },
    ],
  },
  stullen: {
    items: [
      { name: "Stullen", price: "Auf Anfrage", desc: "Belegte Brote nach Verfügbarkeit" },
    ],
  },
  getraenke: {
    items: [
      { name: "Eisschokolade 0,2l", price: "4,50 €", desc: "" },
      { name: "Eisschokolade 0,4l", price: "6,50 €", desc: "" },
      { name: "Eiskaffee 0,3l", price: "4,50 €", desc: "" },
      { name: "Eiskaffee 0,5l", price: "6,50 €", desc: "" },
      { name: "Milchshake 0,3l", price: "4,50 €", desc: "" },
      { name: "Milchshake 0,5l", price: "5,50 €", desc: "" },
    ],
  },
};

const parsePrice = (priceStr) => {
  if (priceStr.includes('Auf Anfrage')) return 0;
  const match = priceStr.match(/(\d+),(\d+)/);
  if (match) {
    return parseFloat(`${match[1]}.${match[2]}`);
  }
  return 0;
};

const toKebab = (str) => {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const finalItems = [];

for (const [catId, catData] of Object.entries(menu)) {
  const categoryInfo = categories.find(c => c.id === catId);
  for (const item of catData.items) {
    const id = toKebab(item.name);
    finalItems.push({
      id: `${catId}-${id}`,
      name: item.name,
      price: parsePrice(item.price),
      desc: item.desc || "",
      category: catId,
      icon: categoryInfo.icon,
      color: categoryInfo.color,
      tag: item.tag || "",
      available: true
    });
  }
}

fs.writeFileSync('seed-data.json', JSON.stringify(finalItems, null, 2));
console.log(`Generated ${finalItems.length} items in seed-data.json`);
