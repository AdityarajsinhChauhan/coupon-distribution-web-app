import bcrypt from "bcrypt";

// I used this script to hash password then stored it manually in database 

const password = "CouponAdmin@123";

const hasedPassword = bcrypt.hashSync(password, 10);


console.log(hasedPassword);

console.log(Date.now());

