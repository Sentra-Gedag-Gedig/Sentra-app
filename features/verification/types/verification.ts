export type VerificationNumberRequest = {
  phone_number: string | undefined;
};

export type VerificationNumberResponse = {
  code: string;
};

export type VerifyUserRequest = {
  phone_number: string | undefined;
  code: string | undefined;
  personal_identification_number: string | undefined;
};

export type VerifyUserResponse = {

}