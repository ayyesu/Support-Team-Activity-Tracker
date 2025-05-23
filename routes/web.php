<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ActivityUpdateController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Health check route for Railway
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $activities = \App\Models\Activity::with('user')
            ->latest()
            ->take(5)
            ->get();

        $stats = [
            'total' => \App\Models\Activity::count(),
            'pending' => \App\Models\Activity::where('status', 'pending')->count(),
            'completed' => \App\Models\Activity::where('status', 'done')->count(),
        ];

        return Inertia::render('Dashboard', [
            'activities' => $activities,
            'stats' => $stats,
        ]);
    })->middleware(['auth', 'verified'])->name('dashboard');

    // Activities routes
    Route::resource('activities', ActivityController::class);
    Route::post('/activities/{activity}/update-status', [ActivityUpdateController::class, 'store'])->name('activity-updates.store');

    // Reports routes
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/daily', [ReportController::class, 'dailyActivities'])->name('reports.daily');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
