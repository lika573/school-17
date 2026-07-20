import { writeFileSync } from "fs";

const teachers = [
  {
    id: "1",
    name: "\u10dc\u10d8\u10dc\u10dd \u10d1\u10d4\u10e0\u10d8\u10eb\u10d4",
    subject: "\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8 \u10d4\u10dc\u10d0",
    role: "\u10d3\u10d8\u10e0\u10d4\u10e5\u10e2\u10dd\u10e0\u10d8",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    imageAlt: "\u10dc\u10d8\u10dc\u10dd \u10d1\u10d4\u10e0\u10d8\u10eb\u10d4 \u2014 \u10d3\u10d8\u10e0\u10d4\u10e5\u10e2\u10dd\u10e0\u10d8",
  },
  {
    id: "2",
    name: "\u10d2\u10d8\u10dd\u10e0\u10d2\u10d8 \u10d9\u10d0\u10e4\u10d0\u10dc\u10d0\u10eb\u10d4",
    subject: "\u10db\u10d0\u10d7\u10d4\u10db\u10d0\u10e2\u10d8\u10d9\u10d0",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
    imageAlt: "\u10d2\u10d8\u10dd\u10e0\u10d2\u10d8 \u10d9\u10d0\u10e4\u10d0\u10dc\u10d0\u10eb\u10d4",
  },
  {
    id: "3",
    name: "\u10db\u10d0\u10e0\u10d8\u10d0\u10db \u10d2\u10d5\u10d0\u10e1\u10d0\u10da\u10d8\u10d0",
    subject: "\u10d8\u10dc\u10d2\u10da\u10d8\u10d6\u10e3\u10e0\u10d8 \u10d4\u10dc\u10d0",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
    imageAlt: "\u10db\u10d0\u10e0\u10d8\u10d0\u10db \u10d2\u10d5\u10d0\u10e1\u10d0\u10da\u10d8\u10d0",
  },
  {
    id: "4",
    name: "\u10d3\u10d0\u10d5\u10d8\u10d7 \u10dc\u10d8\u10d9\u10dd\u10da\u10d0\u10eb\u10d4",
    subject: "\u10e4\u10d8\u10d6\u10d8\u10d9\u10d0",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    imageAlt: "\u10d3\u10d0\u10d5\u10d8\u10d7 \u10dc\u10d8\u10d9\u10dd\u10da\u10d0\u10eb\u10d4",
  },
  {
    id: "5",
    name: "\u10d4\u10da\u10d4\u10dc\u10d4 \u10e9\u10ee\u10d0\u10d8\u10eb\u10d4",
    subject: "\u10d8\u10e1\u10e2\u10dd\u10e0\u10d8\u10d0",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop",
    imageAlt: "\u10d4\u10da\u10d4\u10dc\u10d4 \u10e9\u10ee\u10d0\u10d8\u10eb\u10d4",
  },
  {
    id: "6",
    name: "\u10d6\u10e3\u10e0\u10d0\u10d1 \u10db\u10ea\u10ed\u10d4\u10d3\u10da\u10d8\u10e8\u10d5\u10d8\u10da\u10d8",
    subject: "\u10ee\u10d8\u10db\u10d8\u10d0",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
    imageAlt: "\u10d6\u10e3\u10e0\u10d0\u10d1 \u10db\u10ea\u10ed\u10d4\u10d3\u10da\u10d8\u10e8\u10d5\u10d8\u10da\u10d8",
  },
  {
    id: "7",
    name: "\u10dc\u10d0\u10d7\u10d8\u10d0 \u10e9\u10d5\u10d0\u10e0\u10d0\u10ea\u10ee\u10d4\u10da\u10d8\u10d0",
    subject: "\u10d1\u10d8\u10dd\u10da\u10dd\u10d2\u10d8\u10d0",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop",
    imageAlt: "\u10dc\u10d0\u10d7\u10d8\u10d0 \u10e9\u10d5\u10d0\u10e0\u10d0\u10ea\u10ee\u10d4\u10da\u10d8\u10d0",
  },
  {
    id: "8",
    name: "\u10da\u10d4\u10d5\u10d0\u10dc \u10d2\u10dd\u10d2\u10dd\u10da\u10d0\u10eb\u10d4",
    subject: "\u10e1\u10de\u10dd\u10e0\u10e2\u10d8",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    imageAlt: "\u10da\u10d4\u10d5\u10d0\u10dc \u10d2\u10dd\u10d2\u10dd\u10da\u10d0\u10eb\u10d4",
  },
  {
    id: "9",
    name: "\u10d7\u10d0\u10db\u10d0\u10e0 \u10ef\u10d8\u10dc\u10e9\u10d0\u10e0\u10d0\u10eb\u10d4",
    subject: "\u10db\u10e3\u10d6\u10d8\u10d9\u10d0",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    imageAlt: "\u10d7\u10d0\u10db\u10d0\u10e0 \u10ef\u10d8\u10dc\u10e9\u10d0\u10e0\u10d0\u10eb\u10d4",
  },
  {
    id: "10",
    name: "\u10d8\u10e0\u10d0\u10d9\u10da\u10d8 \u10ea\u10e3\u10da\u10d0\u10eb\u10d4",
    subject: "\u10d8\u10dc\u10e4\u10dd\u10e0\u10db\u10d0\u10e2\u10d8\u10d9\u10d0",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    imageAlt: "\u10d8\u10e0\u10d0\u10d9\u10da\u10d8 \u10ea\u10e3\u10da\u10d0\u10eb\u10d4",
  },
  {
    id: "11",
    name: "\u10e9\u10d4\u10d7\u10d8 \u10db\u10d4\u10da\u10d0\u10eb\u10d4",
    subject: "\u10d2\u10d4\u10dd\u10d2\u10e0\u10d0\u10e4\u10d8\u10d0",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    imageAlt: "\u10e9\u10d4\u10d7\u10d8 \u10db\u10d4\u10da\u10d0\u10eb\u10d4",
  },
  {
    id: "12",
    name: "\u10d2\u10d8\u10d2\u10d0 \u10d0\u10d1\u10d0\u10e8\u10d8\u10eb\u10d4",
    subject: "\u10db\u10d0\u10d7\u10d4\u10db\u10d0\u10e2\u10d8\u10d9\u10d0",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    imageAlt: "\u10d2\u10d8\u10d2\u10d0 \u10d0\u10d1\u10d0\u10e8\u10d8\u10eb\u10d4",
  },
];

writeFileSync("src/data/teachers.json", JSON.stringify(teachers, null, 2), "utf8");
console.log("done");
