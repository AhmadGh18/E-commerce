<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function register(Request $request)
    {


        $formFields = $request->validate([
            'first_name' => ['required', 'min:3'],
            'last_name' => ['required', 'min:3'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'password' => 'required|confirmed|min:6',

        ]);

        $formFields['name'] = $formFields['first_name'] . ' ' . $formFields['last_name'];
        $formFields['type']='user';
        // Hash the password
        $formFields['password'] = bcrypt($formFields['password']);

        $user = User::create($formFields);
        $token = $user->createToken('main', ['expires_in' => 86400])->plainTextToken;


        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,
            'user' => $user
        ]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'error' => 'User not found',
            ], 404);
        }

        if (Hash::check($password, $user->password)) {


        $token = $user->createToken('main', ['expires_in' => 86400])->plainTextToken;

            return response()->json([
                'token' => $token,
                'type' => 'user',
                'user' => [
                    'full_name' => $user->full_name,
                    'email' => $user->email,
                ],
            ]);
        } else {
            return response()->json([
                'error' => 'Incorrect password for user',
            ], 401);
        }
    }
    public function updateInfo(Request $req)
{
    if ($req->user()->type !== 'admin') {
        return response()->json([
            'message' => 'Unauthorized: Only admins can update this information.'
        ], 403); // 403 Forbidden status code
    }

    // Validate the request data
    $validatedData = $req->validate([
        "password" => "required|confirmed|min:8", // Validate password and check confirmation
    ]);

    // Update user information
    $user = $req->user();
    $user->password = bcrypt($validatedData['password']); // Hash the new password
    $user->save();

    // Return a success response
    return response()->json([
        'message' => 'User information updated successfully',
        'user' => $user,
    ], 200);
}


}