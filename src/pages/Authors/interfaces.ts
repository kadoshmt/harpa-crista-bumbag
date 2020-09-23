export interface IParamTypes {
  id?: string;
}

export interface IFormDataError {
  name?: string;
  initials?: string;
}

export interface IAuthors {
  id: number;
  name: string;
  initials: string;
  slug: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}
