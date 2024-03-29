const express = require('express');
const mongoose = require('mongoose');
const Clinic = require('../../../models/Clinic');
const Provider = require('../../../models/Provider');

const router = express.Router();
console.log('Reached /api/clinic endpoint');

router.get('/', (req, res) => {
    // get all clinics
    Clinic.find()
        .then(clinics => {
            res.json(clinics);
        });
    // const clinics = [
    //     {
    //         _id: "12345",
    //         name: "Ashburn MAT",
    //     },
    //     {
    //         _id: "54321",
    //         name: "Charlottesville MAT"
    //     }
    // ];
    // res.json(clinics);

});

router.post('/providers', (req, res) => {
    console.log(req.body);
    const clinicId = req.body._id;
    var providers = []
    Clinic.findById({"_id" : mongoose.Types.ObjectId(clinicId)})
        .then((clinic) => {
            const providerIds = clinic.providers.map(providerId => mongoose.Types.ObjectId(providerId));
            console.log(providerIds);
            Provider.find({
                '_id': { $in: providerIds }
                })
                .then(providers => {
                    console.log(`Found all providers associated with clinic(id=${clinicId}) successfully.`);
                    res.json(providers);
                })
                .catch(error => {
                    console.log(`Error finding all providers associated with clinic: ${error}`);
                })
        })
        .catch(error => res.status(404).send("Not Found"));
});

router.post('/add/provider', (req, res) => {
    console.log("POST request to /add/provider");
    console.log(req.body);
    var clinicId = req.body.clinic_id;
    var providerId = req.body.provider_id;

    Provider.findById(providerId, (err, provider) => {
        if (err) return res.status(500).send(err);
        provider.medicalData.clinic = clinicId;
        provider.save()
            .then(provider => {
                console.log(`Clinic(id=${clinicId}) added to the medicalData of Provider(id=${providerId})`);
            });
    });

    Clinic.findById(clinicId, (err, clinic) => {
        if (err) return res.status(500).send(err);
        clinic.providers.push(providerId);
        clinic.save()
            .then(clinic => {
                console.log(`Provider(id=${providerId}) added to Clinic(id=${clinicId})`);
                res.send(clinic);
            });
    });

    
})

module.exports = router;