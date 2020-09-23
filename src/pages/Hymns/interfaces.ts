export interface IParamTypes {
  id: string;
}

export interface IFormDataError {
  title: string;
  number: number;
  body: string;
}

interface IAuthor {
  authors: {
    id: number;
    name: string;
    initials: string;
  };
}

interface ICategory {
  category: {
    id: number;
    title: string;
  };
}

export interface IHymn {
  id: number;
  num_hymn: number;
  title: string;
  slug: string;
  body: string;
  verses?: string;
  choruses?: string[];
  num_choruses?: number;
  views?: number;
  shares?: number;
  created_at?: string;
  updated_at?: string;
  hymn_authors?: IAuthor[];
  hymn_categories?: ICategory[];
}

export interface ISwitchType {
  value: string;
  label: string;
}

export interface ISelectMenuType {
  key: string;
  label: string;
  value: string;
}

export interface IAuthorSelectMenu {
  id: number;
  name: string;
  initials: string;
}

export interface ICategorySwitch {
  id: number;
  title: string;
}
