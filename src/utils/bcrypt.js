// const bcrypt = require('bcrypt')

// // Confirms the input password is the same password that was masked when the user signed up
// const verifyPassword = async (adminPassword, hashedAdminPassword) => {
//     const check = await bcrypt.compare(adminPassword, hashedAdminPassword)
//     if (check) {
//         return true
//     }
//     else {
//         return false
//     }
// }

// const verifyUserPassword = async (userPassword, hashedUserPassword) => {
//     const check = await bcrypt.compare(userPassword, hashedUserPassword)
//     if (check) {
//         return true
//     }
//     else {
//         return false
//     }
// }

// module.exports = { verifyPassword, verifyUserPassword }