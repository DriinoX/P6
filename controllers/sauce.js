const Sauce = require('../models/sauce');


exports.getAllSauce = (req, res, next) => {
	Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

// Les valeurs de variable doivent etre contenu dans la variable sauce de la requete ?
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
 
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    // erreur sauce introuvable
    delete sauceObject._id;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
                console.log('Not authorized')
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                console.log('Sauce modifié!')
                .then(() => res.status(200).json({message : 'Sauce modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
            console.log("erreur")
        });
};

exports.destroySauce = (req, res, next) => {
    console.log("test")
	Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => { 
            console.log(req.body.like);        
            if (req.body.like == -1) {
                console.log("----------------")
                console.log(req.body.userId)
                console.log(sauce.usersDisliked)
                console.log("----------------")
                if (!sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        {
                            _id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.body.userId}, _id: req.params.id
                        })
                        .then(() => {res.status(201).json({message:"Sauce disliked"});})
                        .catch((error) => {res.status(400).json({error: error});});
                }
            }

            if (req.body.like == 0) {
                console.log(req.body.userId)
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        {
                            _id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}, _id: req.params.id
                        })
                        .then(() => {res.status(201).json({message:"Sauce not disliked"});})
                        .catch((error) => {res.status(400).json({error: error});});
                }

                if (sauce.usersLiked.includes(req.body.userId)) {
                    console.log(req.body.userId)
                    Sauce.updateOne(
                        {
                            _id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}, _id: req.params.id,
                        })
                        .then(() => {res.status(201).json({message:"Sauce not liked"});})
                        console.log("ok")
                        .catch((error) => {res.status(400).json({error: error});});
                        console.log("nok")
                }
            }


            if (req.body.like == 1) {
                if (!sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        {_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.body.userId}, _id: req.params.id})
                        .then(() => {res.status(201).json({message:"Sauce liked"});})
                        .catch((error) => {res.status(400).json({error: error});});
                }
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
            console.log("erreur")
        });
};








