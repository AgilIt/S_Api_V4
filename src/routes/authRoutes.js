const express = require('express');
const authController = require('../controllers/authController');
const { validateSignup, validateSignin } = require('../middleware/validation');

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: |
 *       [EN] Create a new user account.
 *       [FR] Créer un nouveau compte utilisateur.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - phone
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: |
 *                   [EN] User's first name
 *                   [FR] Prénom de l'utilisateur
 *               lastname:
 *                 type: string
 *                 description: |
 *                   [EN] User's last name
 *                   [FR] Nom de famille de l'utilisateur
 *               phone:
 *                 type: string
 *                 description: |
 *                   [EN] User's phone number
 *                   [FR] Numéro de téléphone de l'utilisateur
 *               email:
 *                 type: string
 *                 format: email
 *                 description: |
 *                   [EN] User's email address
 *                   [FR] Adresse e-mail de l'utilisateur
 *               password:
 *                 type: string
 *                 format: password
 *                 description: |
 *                   [EN] User's password
 *                   [FR] Mot de passe de l'utilisateur
 *     responses:
 *       201:
 *         description: |
 *           [EN] User successfully registered
 *           [FR] Utilisateur enregistré avec succès
 *       400:
 *         description: |
 *           [EN] Invalid input
 *           [FR] Entrée invalide
 */
router.post('/signup', validateSignup, authController.signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     description: |
 *       [EN] Authenticate a user and return a token.
 *       [FR] Authentifier un utilisateur et renvoyer un jeton.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: |
 *                   [EN] User's email address
 *                   [FR] Adresse e-mail de l'utilisateur
 *               password:
 *                 type: string
 *                 format: password
 *                 description: |
 *                   [EN] User's password
 *                   [FR] Mot de passe de l'utilisateur
 *     responses:
 *       200:
 *         description: |
 *           [EN] User successfully authenticated
 *           [FR] Utilisateur authentifié avec succès
 *       401:
 *         description: |
 *           [EN] Authentication failed
 *           [FR] Échec de l'authentification
 */
router.post('/signin', validateSignin, authController.signin);

module.exports = router;