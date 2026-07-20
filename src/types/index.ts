export type NewsCategory = "განცხადება" | "ღონისძიება" | "მიღწევა";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  date: string;
  image: string;
  imageAlt: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  role?: string;
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  mission: string;
  stats: {
    students: number;
    teachers: number;
    years: number;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    mapEmbed: string;
  };
  studentOfMonth: {
    name: string;
    grade: string;
    quote: string;
    image: string;
    imageAlt: string;
  };
  admission: {
    year: string;
    deadlines: { label: string; date: string }[];
    documents: string[];
  };
}
