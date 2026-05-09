<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

// El Controller hada mte3 el Authentification (Inscription w Connexion)
class AuthController extends Controller
{
    /**
     * Register a new user.
     * El function hadi t'inscrit user jdid
     */
    public function register(Request $request): JsonResponse
    {
        // N'thabbto mel ma3loumet (Name, Email, Password)
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users', // Email lezem ykoun unique
            'password' => 'required|string|min:8|confirmed',             // Password lezem ykoun m'3awed marrtin
        ]);

        // Nesna3ou el User jdid f l'base de données
        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => $validated['password'], // Laravel ya3mal hash lel password automatique
        ]);

        // Nesna3ou token bech el user ynajem yesta3mel el API
        $token = $user->createToken('auth_token')->plainTextToken;

        // N'rajj3ou el user w el token lel frontend
        return response()->json([
            'message' => 'Registration successful.',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    /**
     * Log in an existing user.
     * El function hadi t'connecti el user
     */
    public function login(Request $request): JsonResponse
    {
        // N'thabbto f email w password
        $validated = $request->validate([
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        // N'jarbou n'connectiw el user
        if (!Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
            // Ken el ma3loumet ghalta, n'rajj3ou erreur
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Ken mriguel, njibou el user w na3tiweh token jdid
        $user  = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    /**
     * Log out (revoke current token).
     * El function hadi t'khayyej el user
     */
    public function logout(Request $request): JsonResponse
    {
        // Nfasskhou el token elli yesta3mel fih tawwa
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
