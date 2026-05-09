<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Hna n'definiw el routes mte3 el API elli el frontend bech yesta3malhom.
*/

// Public routes - Ay wahed ynajem yesta3malhom blech login
Route::post('/register', [AuthController::class, 'register']); // Hna na3mlou compte jdid
Route::post('/login',    [AuthController::class, 'login']);    // Hna nodkhlou lel compte mte3na

// Protected routes - Lezem tkoun "logged in" bech todkhel hna (yesta3mel Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']); // Hna nokhraj mel compte
    Route::get('/user',    function (Request $request) {       // Hna njibou el ma3loumet mte3 el user elli dakhel tawwa
        return $request->user();
    });

    // Notes CRUD - El khidma mte3 el notes: njibou, n'zidou, n'badlou, walla n'fasskhou
    Route::get('/notes',         [NoteController::class, 'index']);   // Njibou el notes lkoll mte3 el user
    Route::post('/notes',        [NoteController::class, 'store']);   // N'zidou note jdida
    Route::put('/notes/{note}',  [NoteController::class, 'update']);  // N'badlou f note mawjouda
    Route::delete('/notes/{note}', [NoteController::class, 'destroy']); // N'fasskhou note
});
