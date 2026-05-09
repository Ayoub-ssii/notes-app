<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;

// El Model hada howa el format mte3 el User
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Hadom el ma3loumet elli n'sajlouhom lel user
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    // Hadom el ma3loumet elli n'khabiwhom (ma n'rajj3ouhomch f l'API)
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // N'qoulou l Laravel kifech y'traiti el data (kima el password lezem dima ykoun hashed)
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    /**
     * A user has many notes.
     * Ay user ynajem ykoun 3andou barcha notes (Relation: HasMany)
     */
    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}
