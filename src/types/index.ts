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

export interface SiteValue {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  mission: string;
  history: string;
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
  workingHours: string;
  socialLinks: SocialLinks;
  values: SiteValue[];
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
    faq: { question: string; answer: string }[];
  };
}
