const express = require ("express")
const mongoose = require ("mongoose")
const passport = require ("passport")
const {Strategy} = require ("passport-local")
const bCrypt = require("bcrypt")
const usuarioModel = require("../models/usuario.models")
const { sendEmail } = require("./mailConfig")


const localStrategy = Strategy;




passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true },
      async (req, username, password, done) => {
        console.log("User Registred has", username + " " + password);
        try {
            usuarioModel.create(
              {
                username,
                    password: createHash(password),
                    name: req.body.name,
                    email: req.body.email,
                    address: req.body.address,
                    age: req.body.age,
                    avatar: req.body.avatar,
              },
              (err, userWithId) => {
                if (err) {
                  console.log(`User already exist: ${err}`);
                  return done(err, null);
                }
                return done(null, userWithId);
              }
            );
            await sendEmail(req.body.email, req.body.name);
          } catch (error) {
            console.warning({ error: "Usuario ya existe" });
            return done(error, null);
          }
        }
      )
    );

    passport.use(
        "login",
        new localStrategy(
          {
            passReqToCallback: true,
            usernameField: "username",
            passwordField: "password",
          },
          (req, username, password, done) => {
            try {
                usuarioModel.findOne({ username }, (err, user) => {
                  if (err) {
                    return done(err, null);
                  }
                  if (!user) {
                    return Node(null, false);
                  }
                  if (!isValidPassword(user, password)) {
                    return done(null, false);
                  }
                  return done(null, user);
                });
              } catch (error) {
                console.log({ error: "No se pudo validar usuario" });
                return done(error, null);
              }
            }
          )
        );
        
        passport.serializeUser((usuario, done) => {
          console.log(usuario);
          done(null, usuario._id);
        });
        
        passport.deserializeUser((id, done) => {
          UserModel.findById(id, done);
        });
        
        function createHash(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        }
        
        function isValidPassword(user, password) {
          return bCrypt.compareSync(password, user.password);
        }
        
        module.exports = passport;