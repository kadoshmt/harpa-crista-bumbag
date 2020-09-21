export interface IParamTypes {
  id?: string;
}

export interface IFormDataError {
  title?: string;
}

export interface ICategory {
  id: number;
  title: string;
  slug: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}
