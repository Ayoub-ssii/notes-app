<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

// El Controller hna howa el mokkh elli ysayyer f l'opérations mte3 el notes
class NoteController extends Controller
{
    /**
     * List all notes for the authenticated user (newest first).
     * El function hadi tjib el notes lkoll mte3 el user elli dakhel tawwa
     */
    public function index(Request $request): JsonResponse
    {
        // Njibou el notes mel base de données, m'rattbin mel jdid lel qdim
        $notes = $request->user()
            ->notes()
            ->orderBy('created_at', 'desc')
            ->get();

        // N'rajj3ou el notes f format JSON lel frontend
        return response()->json($notes);
    }

    /**
     * Create a new note.
     * El function hadi t'zid note jdida
     */
    public function store(Request $request): JsonResponse
    {
        // N'thabbto mel ma3loumet elli ba3athhom el frontend (Validation)
        $validated = $request->validate([
            'title'    => 'required|string|max:100', // El "title" lezem ykoun mawjoud w texte
            'content'  => 'nullable|string',          // El "content" ynajem ykoun feragh
            'priority' => 'required|in:low,medium,high', // El priority lezem tkoun wahed mel tlatha hadom
        ]);

        // Nesna3ou el note jdida w n'rabtouha bel user
        $note = $request->user()->notes()->create($validated);

        // N'rajj3ou el note elli tsan3et w status 201 (Created)
        return response()->json($note, 201);
    }

    /**
     * Update an existing note (only if owned by the user).
     * El function hadi t'baddel f note mawjouda
     */
    public function update(Request $request, Note $note): JsonResponse
    {
        // N'thabbto ken el note hadi mte3 el user bidou, mouch mte3 had akher
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden.'], 403); // Ken mouch mte3ou, n'qoulou "mouch msa7allek"
        }

        // N'thabbto f data el jdida (kima f store)
        $validated = $request->validate([
            'title'    => 'required|string|max:100',
            'content'  => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
        ]);

        // N'baddlou el note bel ma3loumet el jdid
        $note->update($validated);

        // N'rajj3ou el note ba3d ma t'badlet
        return response()->json($note);
    }

    /**
     * Delete a note (only if owned by the user).
     * El function hadi tfassekh note
     */
    public function destroy(Request $request, Note $note): JsonResponse
    {
        // Kif kif, lezem n'thabbto elli el note mte3 el user bidou
        if ($note->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        // Nfasskhou el note mel base de données
        $note->delete();

        // N'rajj3ou message l'frontend elli el note tfasskhet
        return response()->json(['message' => 'Note deleted successfully.']);
    }
}
