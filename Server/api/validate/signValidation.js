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
) => {


};
    
    export const signUpValidation = (email, password, repeitpassword) => {
        if(!email || !password || !repeitpassword){
            return { error: "Både email och lösenord måste fyllas i." };
        } 

    }