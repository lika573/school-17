import { writeFileSync } from "fs";

const gallery = [
  {
    id: "1",
    title: "\u10e1\u10d9\u10dd\u10da\u10d8\u10e1 \u10e8\u10d4\u10dc\u10dd\u10d1\u10d0",
    category: "\u10e8\u10d4\u10dc\u10dd\u10d1\u10d0",
    image: "https://images.unsplash.com/photo-1580582932707-658abb7726b0?w=800&h=600&fit=crop",
    imageAlt: "\u10e1\u10d9\u10dd\u10da\u10d8\u10e1 \u10e8\u10d4\u10dc\u10dd\u10d1\u10d0 \u10e1\u10d9\u10dd\u10da \u10e1\u10d9\u10dd\u10da\u10d8\u10e1 \u10d4\u10d6\u10dd\u10d3\u10d0\u10dc",
  },
  {
    id: "2",
    title: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd \u10d3\u10d0\u10d7\u10da\u10d8\u10d0\u10dc\u10d8",
    category: "\u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da280a02?w=800&h=600&fit=crop",
    imageAlt: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd \u10d3\u10d0\u10d7\u10da\u10d8\u10d0\u10dc\u10d8 \u10e1\u10d9\u10dd\u10da\u10d8\u10e1 \u10d3\u10d0\u10d7\u10da\u10d8\u10e1\u10d7\u10d5\u10d8\u10e1",
  },
  {
    id: "3",
    title: "\u10e4\u10d8\u10d6\u10d8\u10d9\u10d8\u10e1 \u10da\u10d0\u10d1\u10dd\u10e0\u10d0\u10e2\u10dd\u10e0\u10d8\u10d0",
    category: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    imageAlt: "\u10e4\u10d8\u10d6\u10d8\u10d9\u10d8\u10e1 \u10da\u10d0\u10d1\u10dd\u10e0\u10d0\u10e2\u10dd\u10e0\u10d8\u10d0",
  },
  {
    id: "4",
    title: "\u10e1\u10de\u10dd\u10e0\u10e2\u10e3\u10da\u10d8 \u10e2\u10e3\u10e0\u10dc\u10d8\u10e0\u10d8",
    category: "\u10e1\u10de\u10dd\u10e0\u10e2\u10d8",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
    imageAlt: "\u10e1\u10de\u10dd\u10e0\u10e2\u10e3\u10da\u10d8 \u10e2\u10e3\u10e0\u10dc\u10d8\u10e0\u10d8 \u10e1\u10d9\u10dd\u10da\u10d8\u10e1 \u10d4\u10d6\u10dd\u10e8\u10d8",
  },
  {
    id: "5",
    title: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd \u10d9\u10dd\u10dc\u10ea\u10d4\u10e0\u10e2\u10d8",
    category: "\u10e6\u10dd\u10dc\u10d8\u10e1\u10eb\u10d8\u10d4\u10d1\u10d0",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    imageAlt: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd \u10d9\u10dd\u10dc\u10ea\u10d4\u10e0\u10e2\u10d8",
  },
  {
    id: "6",
    title: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd \u10d9\u10da\u10d0\u10e1\u10d8\u10e1 \u10d9\u10d0\u10d1\u10d8\u10dc\u10d4\u10e2\u10d8",
    category: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    imageAlt: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd \u10d9\u10da\u10d0\u10e1\u10d8\u10e1 \u10d9\u10d0\u10d1\u10d8\u10dc\u10d4\u10e2\u10d8",
  },
  {
    id: "7",
    title: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd \u10d4\u10e5\u10e1\u10d9\u10e3\u10e0\u10e1\u10d8\u10dd\u10dc\u10d8",
    category: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    imageAlt: "\u10e1\u10d0\u10db\u10e3\u10e1\u10d8\u10dc\u10dd \u10d4\u10e5\u10e1\u10d9\u10e3\u10e0\u10e1\u10d8\u10dd\u10dc\u10d8",
  },
  {
    id: "8",
    title: "\u10e1\u10d9\u10dd\u10da\u10d8\u10e1 \u10d1\u10d0\u10d2\u10d8",
    category: "\u10e8\u10d4\u10dc\u10dd\u10d1\u10d0",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
    imageAlt: "\u10e1\u10d9\u10dd\u10da\u10d8\u10e1 \u10d1\u10d0\u10d2\u10d8 \u2014 \u10db\u10dd\u10e1\u10ec\u10d0\u10d5\u10da\u10d4\u10d1\u10d8",
  },
  {
    id: "9",
    title: "\u10e1\u10de\u10dd\u10e0\u10e2\u10e3\u10da\u10d8 \u10e1\u10d0\u10e2\u10d4\u10db\u10d0\u10d7\u10d4\u10d1\u10d8",
    category: "\u10e1\u10de\u10dd\u10e0\u10e2\u10d8",
    image: "https://images.unsplash.com/photo-1461896836934- voices?w=800&h=600&fit=crop",
    imageAlt: "\u10e1\u10de\u10dd\u10e0\u10e2\u10e3\u10da\u10d8 \u10e1\u10d0\u10e2\u10d4\u10db\u10d0\u10d7\u10d4\u10d1\u10d8",
  },
];

gallery[8].image = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop";

writeFileSync("src/data/gallery.json", JSON.stringify(gallery, null, 2), "utf8");
console.log("done");
