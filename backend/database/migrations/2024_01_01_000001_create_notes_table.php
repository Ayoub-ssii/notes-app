<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Hna l'migration elli t'isna3 l'table "notes" f l'base de données
return new class extends Migration
{
    // Function "up" hiya elli t'isna3 el table
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id(); // El ID mte3 el note
            // "user_id" bech na3rfou el note taba3 ama user. Ken el user tfassekh, el notes mte3ou ytfasskhou (cascade)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title', 100); // El title mte3 el note (max 100 char)
            $table->longText('content')->nullable(); // El content mte3 el note (ynajem ykoun feragh)
            // Priority: low, medium, walla high. Dima yabdou "medium"
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->timestamps(); // "created_at" w "updated_at" automatique
        });
    }

    // Function "down" hiya elli tfassekh el table ken n'7abbou n'arja3ou l'tali
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
