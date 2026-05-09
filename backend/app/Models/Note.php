<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// El Model hada howa el format mte3 el Note f l'base de données
class Note extends Model
{
    use HasFactory;

    // Hadom el fields elli najmou n'3ammrouhom f l'base
    protected $fillable = [
        'title',
        'content',
        'priority',
        'user_id',
    ];

    /**
     * The note belongs to a user.
     * Koul note lezem tkoun taba3 user (Relation: BelongsTo)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
