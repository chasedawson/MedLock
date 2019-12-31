const express = require('express'); 
const patient = require('./api/patient/patient'); 
const pdisurvey = require('./api/patient/pdisurvey'); 
const dispense = require('./api/patient/dispense'); 
const chatAuth = require('./api/chatAuth'); 
const email = require('./api/email'); 
const provider = require('./api/provider/provider'); 
const providerPatients = require('./api/provider/patients'); 
const adminProvider = require('./api/administration/provider'); 
const adminPatient = require('./api/administration/patient');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const path = require('path');

const router = express.Router();

// Authentication middleware. When used, the 
// Access Token must exist and be verified against 
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://medlock-dev.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'http://localhost:5000',
    issuer: `https://medlock-dev.auth0.com/`,
    algorithms: ['RS256']
});

// Define Patient Scope 
router.use('/api/pdisurvey', checkJwt, pdisurvey); 
router.use('/api/patient/patient', checkJwt, patient); 
router.use('/api/dispense', dispense); 

// Define Provider Scope 
router.use('/api/provider/patients', checkJwt, providerPatients); 
router.use('/api/provider', checkJwt, provider); 

// Define Administration Scope 
// Create Administration Accounts --> Check JSON Web Tokens 
router.use('/api/admin/provider', adminProvider); 
router.use('/api/admin/patient', adminPatient);

// How will chatAuth authenticate with Auth0 ??? 
// Cannot use checkJwt because the ChatKit server will also make a request to this endpoint without Auth0. 
router.use('/api/chatAuth', chatAuth); 
router.use('/api/email', email); 

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;