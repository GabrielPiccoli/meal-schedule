interface ICreateSeoDTO {
  id?: string;
  title: string;
  description: string;
  keywords: string;
  author: string;
  fbpixel_code?: string;
  ga_code?: string;
  schema_twitter?: string;
  schema_facebook?: string;
  schema_linkedin?: string;
  schema_instagram?: string;
  schema_street: string;
  schema_region: string;
  schema_cep: string;
  schema_country: string;
}

export { ICreateSeoDTO };
