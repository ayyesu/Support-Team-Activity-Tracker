<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\ActivityUpdate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Activity::with(['user', 'updates.user']);

        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }

        $activities = $query->latest()->get();

        return Inertia::render('Reports/Index', [
            'activities' => $activities,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);
    }

    public function dailyActivities(Request $request)
    {
        $date = $request->input('date', now()->toDateString());

        $activities = Activity::with(['user', 'updates.user'])
            ->whereDate('created_at', $date)
            ->latest()
            ->get();

        return Inertia::render('Reports/Daily', [
            'activities' => $activities,
            'date' => $date,
        ]);
    }
}
