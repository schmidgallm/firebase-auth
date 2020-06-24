const functions = require('firebase-functions');
const admin = require('firebase-admin');

// init admin app
admin.initializeApp();

// add admin role function
exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success. ${data.email} has been made an admin`,
      };
    })
    .catch((error) => {
      return error;
    });
});
