<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::with(['user', 'updates.user'])->latest()->get();

        return Inertia::render('Activities/Index', [
            'activities' => $activities
        ]);
    }

    public function create()
    {
        return Inertia::render('Activities/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,done',
            'remarks' => 'nullable|string',
        ]);

        $validated['user_id'] = Auth::id();

        $activity = Activity::create($validated);

        // Create initial activity update
        ActivityUpdate::create([
            'activity_id' => $activity->id,
            'user_id' => Auth::id(),
            'status' => $validated['status'],
            'remarks' => $validated['remarks'],
        ]);

        return redirect()->route('activities.index')
            ->with('message', 'Activity created successfully.');
    }

    public function show(Activity $activity)
    {
        $activity->load(['user', 'updates.user']);

        return Inertia::render('Activities/Show', [
            'activity' => $activity
        ]);
    }

    public function edit(Activity $activity)
    {
        return Inertia::render('Activities/Edit', [
            'activity' => $activity
        ]);
    }

    public function update(Request $request, Activity $activity)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,done',
            'remarks' => 'nullable|string',
        ]);

        $activity->update($validated);

        // Create activity update record
        ActivityUpdate::create([
            'activity_id' => $activity->id,
            'user_id' => Auth::id(),
            'status' => $validated['status'],
            'remarks' => $validated['remarks'],
        ]);

        return redirect()->route('activities.index')
            ->with('message', 'Activity updated successfully.');
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();

        return redirect()->route('activities.index')
            ->with('message', 'Activity deleted successfully.');
    }
}
