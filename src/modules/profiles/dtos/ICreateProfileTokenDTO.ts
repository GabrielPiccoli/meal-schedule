interface ICreateProfileTokenDTO {
  profile_id: string;
  expires_date: Date;
  refresh_token: string;
}

export { ICreateProfileTokenDTO };
