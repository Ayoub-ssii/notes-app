<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create test user
        $user = User::create([
            'name'     => 'Test User',
            'email'    => 'test@example.com',
            'password' => 'password',
        ]);

        // Create sample notes
        $notes = [
            [
                'title'    => 'Welcome to Notes App!',
                'content'  => 'This is your personal note-taking space. Create, edit, and organise your thoughts with priority levels.',
                'priority' => 'high',
            ],
            [
                'title'    => 'Shopping List',
                'content'  => "- Milk\n- Bread\n- Eggs\n- Coffee\n- Fruits",
                'priority' => 'medium',
            ],
            [
                'title'    => 'Project Ideas',
                'content'  => 'Build a habit tracker app, write a blog about web development, learn Docker.',
                'priority' => 'low',
            ],
            [
                'title'    => 'Meeting Notes – 2 May',
                'content'  => 'Discussed Q2 roadmap, decided to launch feature X by end of month. Follow up with design team.',
                'priority' => 'high',
            ],
            [
                'title'    => 'Book to Read',
                'content'  => 'Clean Code by Robert C. Martin\nThe Pragmatic Programmer\nDesign Patterns – GoF',
                'priority' => 'low',
            ],
        ];

        foreach ($notes as $note) {
            $user->notes()->create($note);
        }
    }
}
