<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityUpdateController extends Controller
{
    public function store(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,done',
            'remarks' => 'nullable|string',
        ]);

        // Update the activity status
        $activity->update([
            'status' => $validated['status'],
            'remarks' => $validated['remarks'],
            'user_id' => Auth::id(),
        ]);

        // Create activity update record
        ActivityUpdate::create([
            'activity_id' => $activity->id,
            'user_id' => Auth::id(),
            'status' => $validated['status'],
            'remarks' => $validated['remarks'],
        ]);

        return redirect()->back()
            ->with('message', 'Activity status updated successfully.');
    }
}
