<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NoteController extends Controller
{
    /**
     * List all notes for the authenticated user (newest first).
     */
    public function index(Request $request): JsonResponse
    {
        $notes = $request->user()
            ->notes()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notes);
    }

    /**
     * Create a new note.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:100',
            'content'  => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
        ]);

        $note = $request->user()->notes()->create($validated);

        return response()->json($note, 201);
    }

    /**
     * Update an existing note (only if owned by the user).
     */
    public function update(Request $request, Note $note): JsonResponse
    {
        // Authorization: ensure the note belongs to the authenticated user
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $validated = $request->validate([
            'title'    => 'required|string|max:100',
            'content'  => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
        ]);

        $note->update($validated);

        return response()->json($note);
    }

    /**
     * Delete a note (only if owned by the user).
     */
    public function destroy(Request $request, Note $note): JsonResponse
    {
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $note->delete();

        return response()->json(['message' => 'Note deleted successfully.']);
    }
}
