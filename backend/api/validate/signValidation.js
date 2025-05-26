import validator from "validator";

export const signUserValidation = (
  email,
  password,
  tokenHash,
  firstname,
  lastname,
  phone,
  birthday,
  address,
  postal
) => {};

export const signUpValidation = (email, password, repeitpassword) => {
  if (!email || !password || !repeitpassword) {
    return { error: "Både email och lösenord måste fyllas i." };
  }
};

export const userDataValidations = (
  email,
  firstname,
  lastname,
  birthday,
  phone,
  address,
  postal_code
) => {
  if (firstname === "" || firstname === null || firstname === undefined) {
    return { error: "Förnamn är obligatoriskt" };
  }
  if (lastname === "" || lastname === null || lastname === undefined) {
    return { error: "Efternamn är obligatoriskt" };
  }
  if (!validator.isEmail(email)) {
    return {
      error:
        "Ogiltigt e-postformat eller saknad e-postadress. Kontrollera inmatningen.",
    };
  }
  if (!validator.isDate(birthday, new Date())) {
    return {
      error:
        "Ogiltigt datumformat eller saknat personnummer. Kontrollera inmatningen.",
    };
  }
  if (phone === "" || phone === null || phone === undefined) {
    return {
      error:
        "Ogiltigt telefonnummer eller saknad telefonnummer. Kontrollera inmatningen.",
    };
  }
  if (
    address === "" ||
    address === null ||
    address === undefined ||
    typeof address !== "string"
  ) {
    return { error: "Ogiltig eller saknad adress. Kontrollera inmatningen." };
  }
  if (!validator.isPostalCode(postal_code, "SE")) {
    return {
      error:
        "Ogiltig postnummer eller saknad postnummer. Kontrollera inmatningen.",
    };
  }
  return null;
};
